# dictionary

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.3.14. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

---

Dictionary/
│
├── src/
│ │
│ ├── config/
│ │ ├── db.ts # MongoDB connection
│ │ ├── redis.ts # Redis client
│ │ ├── redisRateLimiter.ts # Rate limiter config
│ │
│ ├── modules/
│ │ │
│ │ ├── auth/
│ │ │ ├── auth.controller.ts
│ │ │ ├── auth.service.ts
│ │ │ ├── auth.routes.ts
│ │ │ └── auth.types.ts
│ │ │
│ │ ├── word/
│ │ │ ├── word.controller.ts
│ │ │ ├── word.service.ts
│ │ │ ├── word.routes.ts
│ │ │ ├── word.model.ts
│ │ │ └── word.types.ts
│ │ │
│ │ └── user/
│ │ ├── user.model.ts
│ │ ├── user.service.ts
│ │ └── user.types.ts
│ │
│ ├── middlewares/
│ │ ├── auth.middleware.ts
│ │ ├── rateLimiter.middleware.ts
│ │ ├── error.middleware.ts
│ │ ├── asyncHandler.ts
│ │ └── validate.middleware.ts
│ │
│ ├── utils/
│ │ ├── jwt.ts
│ │ ├── password.ts
│ │ ├── getClientKey.ts
│ │ └── response.ts
│ │
│ ├── validators/
│ │ ├── auth.validator.ts
│ │ ├── word.validator.ts
│ │
│ ├── app.ts # Express app setup
│ ├── server.ts # Entry point
│ │
│ └── types/
│ └── express.d.ts # Extend Request (req.user etc.)
│
├── dist/ # compiled JS (auto-generated)
├── node_modules/
│
├── package.json
├── tsconfig.json
├── nodemon.json
├── .env
├── .gitignore
└── README.md

---

📘 Dictionary API (Node.js + Express + MongoDB + Redis)

A scalable backend system for a dictionary application built with Node.js, Express, TypeScript, MongoDB, and Redis.
It supports authentication, rate limiting, caching, and modular architecture designed for production use.

⚡ Features
🔐 JWT Authentication (Access + Refresh Tokens)
🚪 Secure Logout (Redis-based token revocation)
⚡ Redis Rate Limiting (anti-abuse protection)
🧠 Caching layer (Redis ready)
📚 Dictionary CRUD API (words, definitions, examples)
🔍 Search-ready architecture (scalable for autocomplete / fuzzy search)
🧱 Modular architecture (feature-based design)
🛡 Type-safe backend (TypeScript strict mode)
🏗 System Architecture
🔷 High-Level Design
Client (Frontend / Mobile)
↓
Express API (Node.js)
↓
Middleware Layer
├── Auth Middleware (JWT verification)
├── Rate Limiter (Redis)
├── Validation Layer
↓
Controller Layer
↓
Service Layer (Business Logic)
↓
Data Layer
├── MongoDB (Primary DB)
├── Redis (Cache + Sessions + Rate limiting)
🧠 Core Design Principles

1. Separation of Concerns

Each layer has a single responsibility:

Layer Responsibility
Controller Handle HTTP requests/responses
Service Business logic
Model Database schema
Middleware Security + validation
Utils Reusable helpers 2. Stateless Authentication
Access Token → short-lived (15 min)
Refresh Token → long-lived (7 days)
Refresh tokens stored in Redis for revocation 3. Redis Usage

Redis is used for:

⚡ Rate limiting (IP-based throttling)
🔐 Refresh token storage (logout support)
🚀 Caching frequently accessed words (future extension) 4. Scalable Dictionary Model

A word can contain:

multiple definitions
multiple examples per definition
metadata (language, frequency, tags)

Designed for:

multilingual expansion
NLP features
search optimization
📦 Project Structure
src/
│
├── config/
│ ├── db.ts
│ ├── redis.ts
│ ├── redisRateLimiter.ts
│
├── modules/
│ ├── auth/
│ ├── word/
│ ├── user/
│
├── middlewares/
│ ├── auth.middleware.ts
│ ├── rateLimiter.middleware.ts
│ ├── error.middleware.ts
│
├── utils/
│ ├── jwt.ts
│ ├── getClientKey.ts
│ ├── response.ts
│
├── validators/
│
├── app.ts
├── server.ts
🔐 Authentication System
Flow
Register/Login
↓
Generate Access Token (15m)
Generate Refresh Token (7d)
↓
Store Refresh Token in Redis
↓
Client uses Access Token for requests
Refresh Flow
Access Token expires
↓
Client sends Refresh Token
↓
Server verifies Redis + JWT
↓
New Access Token issued
Logout Flow
User logs out
↓
Refresh token removed from Redis
↓
Session becomes invalid
⚡ Rate Limiting System

Implemented using Redis + rate-limiter-flexible.

Behavior:
Limits requests per IP
Prevents API abuse
Works across multiple server instances
IP → Redis counter → Allow / Block (429)
📚 Dictionary Data Model (Conceptual)

A word structure:

Word {
word: string,
normalizedWord: string,
language: string,

definitions: [
{
meaning: string,
partOfSpeech: string,
examples: string[]
}
],

tags: string[],
createdAt,
updatedAt
}
🔍 Search Design (Future Ready)

System is designed to support:

prefix search (autocomplete)
fuzzy search
full-text search (MongoDB Atlas Search)
caching frequently searched words (Redis)
🧩 Middleware System
Auth Middleware
verifies JWT
attaches req.user
Rate Limiter
prevents spam & abuse
Error Handler
centralized error response
🚀 API Flow Example
Create Word
POST /api/words

Flow:

Request
↓
Auth Middleware (JWT check)
↓
Validation Middleware
↓
Controller
↓
Service
↓
MongoDB
↓
Response
🧠 Tech Stack
Node.js
Express.js
TypeScript
MongoDB + Mongoose
Redis
JWT
bcryptjs
📈 Scalability Considerations

This architecture supports:

horizontal scaling (stateless API)
distributed rate limiting (Redis)
caching layer (Redis)
microservice migration (future-ready modules)
🛠 Setup

1. Install dependencies
   npm install
2. Start Redis
   redis-server
3. Start MongoDB
   mongod
4. Run development server
   npm run dev
   🔐 Environment Variables
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/dictionary
   JWT_SECRET=your_secret
   REFRESH_SECRET=your_refresh_secret
   REDIS_URL=redis://localhost:6379
   📌 Future Improvements
   🔍 Elasticsearch / Atlas Search integration
   👤 User favorites system
   📖 Word history tracking
   🌐 Multilingual support
   📱 GraphQL API layer
   🐳 Docker deployment
   📜 License

MIT

🚀 Summary

This backend is designed as a:

⚡ Scalable, modular, production-ready dictionary API with authentication, caching, and rate limiting.
