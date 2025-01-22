"use server";

import postgres from "postgres";

const sql = postgres({
  host: process.env.HOST,
  port: process.env.DBPORT,
  database: process.env.DB,
  username: process.env.USER,
  password: process.env.PASSWORD,
});

export default sql;
