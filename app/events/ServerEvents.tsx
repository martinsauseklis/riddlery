"use server";

import sql from "../db/db";

interface Entity {
  id: string;
  platform: string;
  created: number;
}

interface Session {
  id: string;
  startTime: number;
  endTime: number | null;
  userId: string;
}

interface PageEvent {
  id: string;
  sessionId: string;
  eventStart: number;
  eventEnd: number | null;
  initialState: object;
  path: string;
}

export async function insert(key: string, value: Entity | Session | PageEvent) {
//   if (key === "userId") {
//     return await sql`
//         insert into users
//         (id, user_platform, entity_created)
//         values
//         (${value.id}, ${value.platform}, ${value.created})
//     `;
//   }
//   if (key === "sessionId") {
//     return await sql`
//         insert into sessions
//         (id, start_time, end_time, user_id)
//         values
//         (${value.id}, ${value.startTime}, NULL, ${value.userId})
//     `;
//   }
//   if (key === "pageViewId") {
//     return await sql`
//         insert into page_views
//         (id, session_id, event_start, event_end, path)
//         values
//         (${value.id}, ${value.sessionId}, ${value.eventStart}, NULL, ${value.path})
//     `;
//   }
//   if (key === "eventId") {
//     return await sql`
//         insert into events
//         (id, page_view_id, event_time, type, source, content)
//         values
//         (${value.id}, ${value.pageViewId}, ${value.eventTime}, ${value.type}, ${value.source}, ${value.content})
//     `;
//   }
// }

// export async function update(key: string, id: string, updateValue: object) {
//   if (key === "sessionId") {
//     return await sql`
//             UPDATE sessions
//             SET ${sql(updateValue.key)} =  ${updateValue.value}
//             WHERE id = ${id}
//         `;
//   }
//   if (key === "pageViewId") {
//     return await sql`
//             UPDATE page_views
//             SET ${sql(updateValue.key)} = ${updateValue.value}
//             WHERE id = ${id}
//         `;
//   }
}
