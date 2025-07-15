import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const { DATABASE_URL } = process.env;

export const sql = neon(DATABASE_URL);

// this sql function we export is used as a tagged template literal
// so we can write our sql queries like this:
// const result = await sql`SELECT * FROM products`
// and it will return an object with the results

export default sql;