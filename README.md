# Motorcycle Repair Shop API

```
[ESP 🇲🇽] Nota: hay un archivo README.es.md para español
```

## Overview
REST API developed to manage a motorcycle repair shop. It allows customers to schedule repair appointments and staff to manage their status.

## Technology Stack
- Node.js
- TypeScript
- Express.js
- PostgreSQL
- TypeORM
- JWT for authentication
- BCrypt for encryption
- Express Validator

## Project Structure
```
src/
├── app.ts                 # Application entry point
├── config/               # Global configurations
├── data/                # Data layer and models
├── domain/              # Domain logic and DTOs
└── presentation/        # Controllers and routes
```

## Data Models

### User
```typescript
{
  id: string (UUID)
  name: string
  email: string
  password: string (encrypted)
  role: enum ['employee', 'client']
  status: enum ['available', 'disabled']
}
```

### Repair
```typescript
{
  id: string (UUID)
  date: Date
  motorsNumber: string
  description: string
  status: enum ['pending', 'completed', 'canceled']
  userId: string (UUID)
}
```

## Endpoints

### Authentication
- **POST /api/v1/auth/login**
  - User authentication
  - Body: `{ email: string, password: string }`
  - Response: `{ user: UserData, token: string }`

### Users
- **GET /api/v1/users**
  - Get list of users
  - Requires: Authentication token

- **GET /api/v1/users/:id**
  - Get user by ID
  - Requires: Authentication token

- **POST /api/v1/users**
  - Create new user
  - Body: `{ name, email, password, role }`
  - Validations:
    - Name: 3-80 characters
    - Email: Valid format and unique
    - Password: 10-16 characters, uppercase, lowercase, and special characters

- **PATCH /api/v1/users/:id**
  - Update user
  - Body: `{ name?, email? }`
  - Requires: Authentication token

- **DELETE /api/v1/users/:id**
  - Disable user
  - Requires: Authentication token

### Repairs
- **GET /api/v1/repairs**
  - List pending repairs
  - Requires: Authentication token (role: employee)

- **GET /api/v1/repairs/:id**
  - Get specific repair
  - Requires: Authentication token (role: employee)

- **POST /api/v1/repairs**
  - Create new repair
  - Body: `{ date, motorsNumber, description, userId }`
  - Requires: Authentication token (role: client)
  - Validations:
    - Date: ISO 8601 format
    - Motor number: Non-empty string
    - Description: Minimum 10 characters
    - UserId: Valid UUID

- **PATCH /api/v1/repairs/:id**
  - Mark repair as completed
  - Requires: Authentication token (role: employee)

- **DELETE /api/v1/repairs/:id**
  - Cancel repair
  - Requires: Authentication token
  - Validation: Cannot cancel if completed

## Security

### Authentication
- JWT (JSON Web Tokens) implementation
- Configurable token expiration
- Password encryption with BCrypt

### Authorization
- Role system (client/employee)
- Role validation middleware
- Protected sensitive routes

### Validations
- Input validation with Express Validator
- Data sanitization
- UUID validation
- SQL injection prevention through TypeORM

## Environment Variables
```env
PORT=3100
USERNAME_DATABASE=
PASSWORD_DATABASE=
DATABASE=
PORT_DATABASE=
HOST_DATABASE=
JWT_SEED=
JWT_EXPIRE_IN=3h
```

## Project Setup

### Installation
```bash
npm install
```

### Development Execution
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Production Execution
```bash
npm start
```

## Additional Features

### Error Handling
- Centralized error handling system
- Custom errors with appropriate HTTP codes
- Error logging for debugging

### Validation and Sanitization
- Robust input data validation
- Input sanitization to prevent XSS
- Type validation with TypeScript

### Database
- Automatic migrations with TypeORM
- Entity relationships
- Optimized indexes

## Implemented Best Practices
1. Layered architecture
2. SOLID principles
3. Secure password handling
4. Complete data validation
5. Role-based access control
6. Logging and monitoring
7. Clean Code and TypeScript standards

## Additional Notes

### Error Codes
The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found# Motorcycle Repair Shop API
