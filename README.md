# Restaurant API

Node.js + Express + PostgreSQL REST API for restaurant booking and menu management.

## Features
- JWT Authentication
- PostgreSQL schema migrations
- Signup/Login APIs
- Protected routes
- Raw SQL using pg
- Input validation using express-validator

## Setup

```bash
npm install
```

Copy environment variables:

```bash
cp .env.example .env
```

## Run Migrations

```bash
npm run migrate
```

## Start Server

```bash
npm run dev
```

## Auth APIs

### Signup
POST `/api/auth/signup`

### Login
POST `/api/auth/login`

### Current User
GET `/api/users/me`
