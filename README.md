# Multi-Provider OAuth 2.0 Authentication Service with JWT and RBAC

## Overview

This project implements a **secure RESTful authentication service** supporting:

* Local authentication (email & password)
* OAuth 2.0 login with **Google** and **GitHub**
* **JWT access and refresh tokens**
* **Role-Based Access Control (RBAC)**
* **Rate limiting for authentication endpoints**
* **Docker containerization**

The service uses **PostgreSQL** for persistent storage and **Redis** for caching.

---

# Tech Stack

* Node.js
* Express.js
* PostgreSQL
* Redis
* JWT (JSON Web Tokens)
* OAuth 2.0
* Passport.js
* Docker & Docker Compose

---

# Dependencies

Main dependencies used in this project:

```
express
jsonwebtoken
bcrypt
passport
passport-google-oauth20
passport-github2
pg
redis
dotenv
express-rate-limit
```

Development dependencies:

```
jest
supertest
```

---

# Project Structure

```
auth-service
│
├── src
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── services
│   ├── app.js
│   └── server.js
│
├── seeds
│   └── init.sql
│
├── tests
│   └── api.test.js
│
├── docker-compose.yml
├── Dockerfile
├── .env.example
├── submission.json
└── README.md
```

---

# Environment Variables

Create a `.env` file using `.env.example`.

Example `.env`:

```
API_PORT=8080

DATABASE_URL=postgresql://user:password@db:5432/auth_service

REDIS_URL=redis://cache:6379

JWT_SECRET=your-super-secret-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

---
# OAuth Configuration

This project supports authentication using **Google OAuth** and **GitHub OAuth**.

To enable OAuth login, create OAuth applications in the respective developer consoles and add the credentials to the `.env` file.

## Google OAuth Setup

1. Go to Google Cloud Console  
   https://console.cloud.google.com/

2. Create a new OAuth Client ID.

3. Set the authorized redirect URI:

   http://localhost:8080/api/auth/google/callback

4. Add the credentials to `.env`:

```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## GitHub OAuth Setup

1. Go to GitHub Developer Settings  
   https://github.com/settings/developers

2. Create a new OAuth App.

3. Set the authorization callback URL:

   http://localhost:8080/api/auth/github/callback

4. Add the credentials to `.env`:

```
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

---
```
After configuring the credentials, you can test OAuth login using:
```
http://localhost:8080/api/auth/google

http://localhost:8080/api/auth/github




# Running the Application

Start the project using Docker:

```
docker compose up --build
```

This will start three services:

| Service | Description         |
| ------- | ------------------- |
| app     | Node.js API server  |
| db      | PostgreSQL database |
| cache   | Redis cache         |

The API will run at:

```
http://localhost:8080
```

## Health Check

Verify the API server is running:

http://localhost:8080/health

Expected response:
```
{
 "status": "OK"
}
```
---

# Database Setup

The project automatically creates database tables and seed users using:

```
seeds/init.sql
```

When Docker starts, PostgreSQL automatically runs the SQL scripts located in:

```
/docker-entrypoint-initdb.d
```

Seed users created automatically:

Admin user:

```
Email: admin@example.com
Password: AdminPassword123!
Role: admin
```

Regular user:

```
Email: john@example.com
Password: password123
Role: user
```

---

# API Endpoints

## Authentication

### Register

```
POST /api/auth/register
```

Example request:

```
{
 "name": "Test User",
 "email": "test@example.com",
 "password": "password123"
}
```

---

### Login

```
POST /api/auth/login
```

Example request:

```
{
 "email": "admin@example.com",
 "password": "AdminPassword123!"
}
```

Example response:

```
{
 "accessToken": "...",
 "refreshToken": "..."
}
```

---

### Refresh Token

```
POST /api/auth/refresh
```

Example request:

```
{
 "refreshToken": "..."
}
```

Response:

```
{
 "accessToken": "NEW_ACCESS_TOKEN"
}
```

---

# OAuth Authentication

### Google Login

```
GET /api/auth/google
```

Redirects user to Google authentication.

Callback:

```
/api/auth/google/callback
```

---

### GitHub Login

```
GET /api/auth/github
```

Redirects user to GitHub authentication.

Callback:

```
/api/auth/github/callback
```

---

# User APIs

### Get Current User

```
GET /api/users/me
```

Header:

```
Authorization: Bearer ACCESS_TOKEN
```

---

### Update Profile

```
PATCH /api/users/me
```

Example request:

```
{
 "name": "Updated Name"
}
```

---

### Admin Endpoint

```
GET /api/users
```

Access restricted to **admin role only**.

If accessed by a normal user:

```
403 Forbidden
```

---

# Rate Limiting

Authentication endpoints are protected against brute-force attacks.

If more than **10 failed login attempts occur within 1 minute**, the API returns:

```
429 Too Many Requests
```

---

# Testing

Basic API tests are located in:

```
tests/
```

Run tests using:

```
npm test
```

Example output:

```
PASS tests/api.test.js
```

---

# Security Features

* Password hashing using **bcrypt**
* **JWT authentication**
* **OAuth 2.0 integration using Passport.js**
* **Role-Based Access Control (RBAC)**
* **Rate limiting**
* Secure environment configuration

---

# Docker Commands

Start services:

```
docker compose up --build
```

Stop services:

```
docker compose down
```

View running containers:

```
docker ps
```

---

# Test Credentials

These credentials are also defined in `submission.json`.

Admin:

```
email: admin@example.com
password: AdminPassword123!
```

Regular user:

```
email: john@example.com
password: password123
```

---


