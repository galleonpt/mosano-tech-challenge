# Mosano - Visitor & Country Management Platform

## Overview

This project implements a backend API designed to handle:

- Real-time visitor and country data management
- Multi-endpoint data collection and validation
- Role-based access control with authentication
- Data validation and schema enforcement
- RESTful APIs for visitor operations

The implemented solution follows a modular architecture with dedicated controllers for visitors and countries management.

**To use this project with its full potential you should follow the steps below:**

1. Register a country
2. Create a visitor
3. Update visitor information
4. Query and manage visitor data

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5
- **Database**: MongoDB with Mongoose ODM v9
- **Language**: TypeScript
- **Validation**: Zod v4
- **Containerization**: Docker

## Project Structure

```
src/
├── middlewares/               # Middleware layers
│   └── auth.middleware.ts     # Authentication middleware
├── modules/                   # Feature modules
│   ├── visitors/              # Visitor management
│   │   └── visitors.controller.ts
│   └── countries/             # Country management
│       └── countries.controller.ts
├── schemas/                   # Validation schemas
│   ├── visitor.schema.ts      
│   └── country.schema.ts      
├── app.ts                     # Application entry point
└── router.ts                  # API routes
```

## Key Features

### Data Validation & Persistence

- **Schema Validation**: Validates incoming data against Zod schemas
- **MongoDB Integration**: Persists data using Mongoose ODM
- **Authentication**: Protected endpoints with authentication middleware
- **CORS Support**: Enables cross-origin requests

## Setup & Installation

### Prerequisites

- Node.js >= 16
- Docker & Docker Compose

### Local Development

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Start the app inside docker containers
docker compose down && docker compose up --build
```

The API will be available at `http://localhost:3333`

## Testing

```bash
# Run all tests
npm test
```

The project includes comprehensive test coverage for middleware, services, and API endpoints.

## API Documentation

All endpoints follow RESTful conventions.

### Countries Management

#### List all countries

**GET** `/countries`

Response: `200 OK`

```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Portugal"
  },
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Spain"
  }
]
```

#### Create a new country

**POST** `/countries`

Request body:

```json
{
  "name": "Portugal"
}
```

Response: `201 Created`

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Portugal"
}
```

Validation errors:

- `422 Unprocessable Entity` - Missing or invalid `name` field

#### Update country

**PUT** `/countries/:country_id`

Request body:

```json
{
  "name": "Country updated"
}
```

Response: `201 Created`

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Country updated"
}
```

Error responses:

- `404 Not Found` - Country not found
- `400 Bad Request` - Invalid country identifier
- `422 Unprocessable Entity` - Invalid or missing data

#### Delete country

**DELETE** `/countries/:country_id`

Response: `204 No Content`

Error responses:

- `400 Bad Request` - Invalid country identifier

### Visitors Management

#### List all visitors

**GET** `/visitors`

Response: `200 OK`

```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "John",
    "surname": "Doe",
    "country": {
      "name": "Portugal"
    },
    "birthday": "1990-05-15T00:00:00.000Z",
    "created_at": "2024-08-26T10:30:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439013",
    "name": "Jane",
    "surname": "Smith",
    "country": {
      "name": "Spain"
    },
    "birthday": "1992-03-22T00:00:00.000Z",
    "created_at": "2024-08-26T11:00:00.000Z"
  }
]
```

#### Create a new visitor

**POST** `/visitors`

Request body:

```json
{
  "name": "John",
  "surname": "Doe",
  "country_id": "507f1f77bcf86cd799439011",
  "birthday": "1990-05-15"
}
```

Response: `201 Created`

```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "John",
  "surname": "Doe",
  "country": {
    "name": "Portugal"
  },
  "birthday": "1990-05-15T00:00:00.000Z",
  "created_at": "2024-08-26T10:30:00.000Z"
}
```

Validation errors:

- `422 Unprocessable Entity` - Missing or invalid fields (name, surname, country_id, birthday)
- `404 Not Found` - Country not found
- `422 Unprocessable Entity` - Birthday cannot be in the future
