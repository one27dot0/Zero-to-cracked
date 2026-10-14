# Expense Tracker API

A REST API for tracking personal expenses, built with Node.js and Express.
This is my main learning project — being built in public over a 14-week roadmap, starting with an in-memory version and growing into a fully tested, authenticated, deployed API backed by PostgreSQL.

## Status

🚧 **Phase 1: Foundations — in progress**

Currently using an in-memory array in place of a real database. Full CRUD is working, with input validation and proper HTTP status codes. PostgreSQL, authentication, and testing are coming in later phases.

## Features

- Create, read, update, and delete expenses
- Input validation on create and update (rejects missing or invalid fields)
- Each expense gets a unique ID (UUID) and a creation timestamp
- Consistent JSON error responses for bad input and missing resources
- Health check endpoints

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Data storage:** in-memory array (Phase 1 only — PostgreSQL arrives in Phase 2)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version)
- [Postman](https://www.postman.com/) or similar, for testing endpoints

### Installation

```bash
git clone <repo-url>
cd expense-tracker-API
npm install
```

### Running the server

```bash
node app.js
```

The server starts on `http://localhost:3500`.

## API Endpoints

| Method | Endpoint        | Description                   |
| ------ | --------------- | ----------------------------- |
| GET    | `/health`       | Basic liveness check          |
| GET    | `/status`       | Returns server status as JSON |
| GET    | `/expenses`     | List all expenses             |
| POST   | `/expenses`     | Create a new expense          |
| GET    | `/expenses/:id` | Get a single expense by ID    |
| PUT    | `/expenses/:id` | Update an existing expense    |
| DELETE | `/expenses/:id` | Delete an expense             |

### Expense object shape

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "fullName": "Lunch",
  "amount": 12.5,
  "category": "Food",
  "createdAt": "2026-10-15T10:32:00.000Z"
}
```

### Example: creating an expense

**Request**

```
POST /expenses
Content-Type: application/json

{
  "fullName": "Lunch",
  "amount": 12.5,
  "category": "Food"
}
```

**Response — 201 Created**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "fullName": "Lunch",
  "amount": 12.5,
  "category": "Food",
  "createdAt": "2026-10-15T10:32:00.000Z"
}
```

### Example: validation error

**Request**

```
POST /expenses
Content-Type: application/json

{
  "amount": -5
}
```

**Response — 400 Bad Request**

```json
{
  "error": "Bad Request",
  "message": "Field \"fullName\" is required and must be a non-empty string"
}
```

## Project Structure

```
expense-tracker-API/
  app.js              entry point, mounts routes and middleware
  data.js             in-memory expense array
  hand-valid.js        input validation for expense data
  routes/
    router.js          all route definitions
```

## Roadmap

- [x] In-memory CRUD for expenses
- [x] Manual input validation
- [ ] Centralized error-handling middleware
- [ ] PostgreSQL + Prisma
- [ ] Authentication (JWT)
- [ ] Automated tests
- [ ] Docker + CI/CD
- [ ] Deployment

## Author

Built by Muhammad Oniye as part of a self-directed backend development learning plan.
