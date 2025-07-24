import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../..');

dotenv.config({ path: join(rootDir, '.env') });

// create a sql connection using DATABASE_URL
export const sql = neon(process.env.DATABASE_URL);

// this sql function we export is used as a tagged template literal
// so we can write our sql queries like this:
// const result = await sql`SELECT * FROM products`
// and it will return an object with the results

export default sql;