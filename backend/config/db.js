import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const { PGHOST, PG_DATABASE, PG_USER, PG_PASSWORD } = process.env;

// create a sql connection using our env variables
export const sql = neon(
    `postgres://${PG_USER}:${PG_PASSWORD}@${PGHOST}/${PG_DATABASE}?sslmode=require`
)

// this sql function we export is used as a tagged template literal
// so we can write our sql queries like this:
// const result = await sql`SELECT * FROM products`
// and it will return an object with the results

export default sql;