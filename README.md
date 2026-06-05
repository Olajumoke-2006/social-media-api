# Social Media API

A RESTful social media API built using Node.js, Express.js, and MongoDB.

---

# Features

- User Authentication
- JWT Authorization
- Create Posts
- Draft & Published Posts
- Follow & Unfollow Users
- Like & Unlike Posts
- Pagination
- Search & Sorting
- RESTful API
- Unit Testing

---

# Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Jest
- Supertest

---

# Installation

## Clone Repository

```bash
git clone <repo-url>
```

---

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file.

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/social-api
JWT_SECRET=supersecretkey
```

---

# Run Application

## Development

```bash
npm run dev
```

## Production

```bash
npm start
```

---

# API Routes

## Auth Routes

| Method | Endpoint |
|---|---|
| POST | /api/auth/signup |
| POST | /api/auth/login |

---

## Post Routes

| Method | Endpoint |
|---|---|
| POST | /api/posts |
| GET | /api/posts |
| GET | /api/posts/:id |
| PATCH | /api/posts/:id |
| DELETE | /api/posts/:id |

---

## Follow Routes

| Method | Endpoint |
|---|---|
| POST | /api/users/:id/follow |
| DELETE | /api/users/:id/unfollow |
| GET | /api/users/:id/followers |
| GET | /api/users/:id/following |

---

## Like Routes

| Method | Endpoint |
|---|---|
| POST | /api/posts/:id/like |
| DELETE | /api/posts/:id/unlike |

---

# Run Tests

```bash
npm test
```

---

# Author
Kolawole Moyosore Olajumoke