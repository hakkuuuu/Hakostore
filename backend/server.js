import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { sql } from './config/db.js';
import productRoutes from "./routes/productRoutes.js";
import { aj } from './lib/arcjet.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json()); 
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
})); 
app.use(morgan('dev'));

// apply arcjet middleware rate limiting to all routes
app.use(async (req, res, next) => {
    try {
        const decision = await aj.protect(req, {
            requested: 1 // specifies that each request counts as 1 requested token
        })

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).send({ error: "Rate limit exceeded" });
            } else if (decision.reason.isBot()) {
                return res.status(403).send({ error: "Bot detected" });
            } else {
                return res.status(403).send({ error: "Access denied" });
            }
        }

        // check for spoofed bots
        if (decision.results.some(result => result.reason.isBot() && result.reason.isSpoofed())) {
            return res.status(403).json({ error: "Spoofed bot detected" });
        }

        next();
    } catch (error) {
        console.log("Arcjet error:", error);
        next(error);
    }
});

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === 'production') {
    // serve static files from the React app
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

app.get('/', (req, res) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    res.send('Hello World!');
});


// this initDB function will create the products table if it doesn't exist
async function initDB() {
    try {
        await sql`SELECT 1`; // Test DB connection
        console.log("Connected to the database.");
        await sql`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price NUMERIC(10, 2) NOT NULL,
                category VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                description TEXT
            );
        `;


        console.log("Database initialized successfully.");
    }
    catch (error) {
        console.error('Error initializing the database:', error);
    }
}

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Error initializing the database:', error);
});