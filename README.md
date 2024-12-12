# Project Name: **Referral-Based User Management System**

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [User Endpoints](#user-endpoints)
  - [Purchase Endpoints](#purchase-endpoints)
  - [Real-Time Server](#real-time-server)
- [Database Models](#database-models)
  - [User Model](#user-model)
  - [Purchase Model](#purchase-model)
  - [Earnings Model](#earnings-model)
- [Technologies Used](#technologies-used)

---

## Overview
This project implements a referral-based user management system with the following features:
- User registration and login with JWT authentication.
- Purchase management and referral-based earnings system.
- Real-time server setup with Socket.io for messaging.
- APIs for fetching and visualizing user earnings and purchases.

---

## Features
- **User Management**: Register, login, and fetch user profiles.
- **Purchase System**: Record user purchases, manage referral earnings, and generate reports.
- **Referral Earnings**: Support for multi-level referral earnings (direct and indirect).
- **Visualization**: APIs for earnings distribution and visualization data.
- **Real-Time Support**: Message handling using WebSocket.

---

## Prerequisites
**Ensure you have the following installed:**
- Node.js
- MongoDB
- A `.env` file with:
  ```env
  MONGO_URI=<your-mongo-db-connection-string>
  JWT_SECRET=<your-jwt-secret>
  PORT=<port-number>

---

# Installation

- Clone the repository:

```bash
git clone <repository-url>
cd <repository-name>
```

## Install dependencies:

```bash
npm install
```

Start the server:
```bash
npm start
```
---

## Usage

**User Endpoints**

*Register a New User*
- Endpoint: POST /users/register
- Description: Registers a new user.
Request Body:
```bash
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

*Login User*
- Endpoint: POST /users/login
- Description: Authenticates a user and returns a JWT token.
Request Body:
```bash
{
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

*Get User Profile*
- Endpoint: GET /users/:id
- Description: Fetches a user's profile by ID.

**Purchase Endpoints**

*Create a Purchase*
- Endpoint: POST /purchases/create
- Request Body:
```bash
{
  "userId": "user-id",
  "amount": 1500,
  "items": ["item1", "item2"]
}
```

*Get Purchases for a User*
- Endpoint: GET /purchases/user/:userId

**Earnings Report**
- Endpoint: GET /purchases/earnings/report/:userId

- Real-Time Server : The server uses Socket.io for real-time messaging. Clients can connect and exchange messages:

- Message Event: Send and receive messages between clients and the server.

---

## Database Models

**User Model Fields:**
- name: String, required.
- email: String, unique, required.
- password: String, hashed.
- referrals: Array of ObjectIds.
- earnings: Object containing direct and indirect earnings.

**Purchase Model Fields:**
- userId: ObjectId, required.
- amount: Number, required.
- items: Array of Strings.

**Earnings Model Fields:**
- userId: ObjectId, required.
- source: String, default: "Unknown source".
- amount: Number, required.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Real-Time Communication**: Socket.io

---

Feel free to contribute or open issues for improvement! 😊

