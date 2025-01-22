"use client";

import platform from "platform";

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

export const Analytics = {
  instantiate: () => {
    const entity = {};
    if (globalThis.localStorage.getItem("userData")) {
      Object.assign(entity, JSON.parse(localStorage.getItem("userData")));
    } else {
      entity.userId = crypto.randomUUID();
      entity.userPlatform = platform.description;
      entity.entityCreated = Date.now();
      entity.sessions = [];
    }

    globalThis.localStorage.setItem("userData", JSON.stringify(entity));
    console.log('instantiated analytics')
    return {
      getStorageEntity: () => entity,
      startSession: () => {
        if(globalThis.sessionStorage.getItem("currentSessionId")){
            return globalThis.sessionStorage.getItem("currentSessionId")
        } else {
          const object =  {
            sessionId: crypto.randomUUID(),
            startTime: Date.now(),
            endTime: "Not yet",
            sessionEvents: []
          };
  
          entity.sessions.push(object);
          globalThis.localStorage.setItem("userData", JSON.stringify(entity));
          globalThis.sessionStorage.setItem("currentSessionId", object.sessionId);
          return object.sessionId;
        }
        
      },
      endSession: (sessionId) => {
        const updatedSessions = entity.sessions.map(session => {
          if (session.sessionId == sessionId) {
            session.endTime = Date.now();
            return session;
          }
          return session;
        });
        entity.sessions = updatedSessions;
        globalThis.localStorage.setItem("userData", JSON.stringify(entity));
      },
      startPageView: (state) => {
        const sessionId = globalThis.sessionStorage.getItem('currentSessionId');
        
        const pageEvent =  {
          eventId: crypto.randomUUID(),
          eventName: "pageView",
          eventStart: Date.now(),
          eventEnd: "not yet",
          initialState: state,
          path: globalThis.location.pathname
        }

        const updatedSessions = entity.sessions.map(session => {
          if(session.sessionId == sessionId) {
            session.sessionEvents.push(pageEvent);
            return session;
          }

          return session;
        })

        entity.sessions = updatedSessions;
        globalThis.localStorage.setItem("userData", JSON.stringify(entity));

        return pageEvent.eventId;
      },
      endPageView: (eventId) => {

        const sessionId = globalThis.sessionStorage.getItem('currentSessionId');

        const updatedSessions = entity.sessions.map(session => {
          if(session.sessionId == sessionId) {
            const updatedEvents = session.sessionEvents.map(event => {
              if (event.eventId == eventId){
                event.eventEnd = Date.now();
                return event;
              }
              return event;
            })

            session.sessionEvents = updatedEvents;

            return session;
          }

          return session;
        })

        entity.sessions = updatedSessions;
        globalThis.localStorage.setItem("userData", JSON.stringify(entity));
      },
      captureClick: () => {
        // const sessionId = globalThis.sessionStorage.getItem('currentSessionId');
        // const pressEvent = {
        //   eventId: crypto.randomUUID(),
        //   eventName: "buttonPress",
        //   eventTime: Date.now(),
        //   stateAfterEvent: state,
        //   event
        // }
      }
    };
  }
};