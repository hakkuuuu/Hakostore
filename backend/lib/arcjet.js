import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";

import "dotenv/config";

// init arcjet

export const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
        // shield protects against brute force attacks e.g SQLi, XSS, CSRF
        shield({ mode: "LIVE" }),
        detectBot({
            mode: "LIVE",
            // block all bots except search engines
            allow: ["CATEGORY:SEARCH_ENGINE"]
        }),
        // rate limiting
        tokenBucket({
            mode: "LIVE",
            capacity: 20,
            refillRate: 30,
            interval: 5,
        })
    ]
});
