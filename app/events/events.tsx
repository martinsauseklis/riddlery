"use client";

import platform from "platform";
import { insert, update } from "./ServerEvents";

export interface PageView {
  eventId: string;
  eventStart: number;
  eventEnd: number | null;
  userId: string;
  userPlatform: string;
  currentPath: string;
  previousURL: string | null;
  nextURL: string | null;
  childEvents: string[];
}

// interface Entity {
//   id: string;
//   userPlatform: string;
//   entityCreated: number;
//   sessions: Array<Session>;
// }

// interface Session {
//   sessionId: string;
//   startTime: number;
//   endTime: number | null;
//   sessionEvents: Array<PageEvent>;
// }

// interface PageEvent {
//   eventId: string;
//   eventStart: number;
//   eventEnd: number | null;
//   initialState: object;
//   path: string;
// }

export const Analytics = {
  instantiate: () => {
    const batchInput = {
      id: "",
      pageViewId: "",
      eventTime: 0,
      type: "",
      source: "",
      content: [],
    };

    const sendBatchInput = () => {
      if (batchInput.id) {
        batchInput.content = JSON.stringify(batchInput.content);
        const batchDTO = { ...batchInput };

        batchInput.id = "";
        batchInput.pageViewId = "";
        batchInput.eventTime = 0;
        batchInput.type = "";
        batchInput.source = "";
        batchInput.content = [];

        insert("eventId", batchDTO);
      }
    };

    const processInput = (event, sourceData) => {
      console.log(event, sourceData)
      if (!batchInput.id) batchInput.id = crypto.randomUUID();
      if (!batchInput.pageViewId)
        batchInput.pageViewId = globalThis.sessionStorage.getItem("pageViewId");
      if (!batchInput.eventTime) batchInput.eventTime = Date.now();

      if (!batchInput.type) batchInput.type = event?.type ? event.type : sourceData?.type;
      if (!batchInput.source) batchInput.source = event?.target?.nodeName ? event.target.nodeName : sourceData?.source;

      if (batchInput.content.length !== 9) {
        batchInput.content.push(event?.target?.value ? event.target.value : event);
      } else {
        batchInput.content.push(event?.target?.value ? event.target.value : event);
        sendBatchInput();
      }
    };

    const storeAndInsert = (key, value, isLocalStorage) => {
      if (isLocalStorage) {
        globalThis.localStorage.setItem(key, value.id);
      } else {
        globalThis.sessionStorage.setItem(key, value.id);
      }
      insert(key, value);
    };

    const createPageView = () => {
      const pageViewId = crypto.randomUUID();
      storeAndInsert(
        "pageViewId",
        {
          id: pageViewId,
          sessionId,
          eventStart: Date.now(),
          path: globalThis.location.pathname,
        },
        false
      );
    };

    let userId = globalThis.localStorage?.getItem("userId");
    let sessionId = globalThis.sessionStorage?.getItem("sessionId");
    const pageViewId = globalThis.sessionStorage?.getItem("pageViewId");

    if (!userId) {
      userId = crypto.randomUUID();
      storeAndInsert(
        "userId",
        { id: userId, platform: platform.description, created: Date.now() },
        true
      );
    }

    if (!sessionId) {
      sessionId = crypto.randomUUID();
      storeAndInsert(
        "sessionId",
        { id: sessionId, startTime: Date.now(), userId },
        false
      );
    }

    if (!pageViewId) {
      createPageView();
    }

    return {
      startPageView: () => {
        if (!globalThis.sessionStorage?.getItem("pageViewId")) {
          createPageView();
        }
      },
      endPageView: () => {
        const currentPageViewId =
          globalThis.sessionStorage.getItem("pageViewId");
        update("pageViewId", currentPageViewId, {
          key: "event_end",
          value: Date.now(),
        });
        globalThis.sessionStorage.removeItem("pageViewId");
      },
      endSession: () => {
        const currentSessionId = globalThis.sessionStorage.getItem("sessionId");
        update("sessionId", currentSessionId, {
          key: "end_time",
          value: Date.now(),
        });
      },
      buttonPress: (event) => {
        const eventId = crypto.randomUUID();
        const currentPageViewId =
          globalThis.sessionStorage.getItem("pageViewId");
        insert("eventId", {
          id: eventId,
          pageViewId: currentPageViewId,
          eventTime: Date.now(),
          type: event.type,
          source: event.target.nodeName,
          content: event.target.textContent
        });
      },
      inputChange: (event, sourceData = null) => {
        processInput(event, sourceData);
      },
      sendInput: () => {
        sendBatchInput();
      },
      modalOpen: (event) => {
        const modalOpenEventId = crypto.randomUUID();
        const currentPageViewId =
          globalThis.sessionStorage.getItem("pageViewId");
        insert("eventId", {
          id: modalOpenEventId,
          pageViewId: currentPageViewId,
          eventTime: Date.now(),
          type: "modal_open",
          source: event.target.nodeName,
          content: event.target.textContent,
        });
      },
      modalClose: (event) => {
        const modalCloseEventId = crypto.randomUUID();
        const currentPageViewId =
          globalThis.sessionStorage.getItem("pageViewId");
        insert("eventId", {
          id: modalCloseEventId,
          pageViewId: currentPageViewId,
          eventTime: Date.now(),
          type: "modal_close",
          source: event.target.nodeName,
          content: event.target.textContent,
        });
      },
      setSelected: (event) => {
        const eventId = crypto.randomUUID();
        const currentPageViewId =
          globalThis.sessionStorage.getItem("pageViewId");
        insert("eventId", {
          id: eventId,
          pageViewId: currentPageViewId,
          eventTime: Date.now(),
          type: "product_select",
          source: "RADIO",
          content: event
        });
      }
    };
  },
};
