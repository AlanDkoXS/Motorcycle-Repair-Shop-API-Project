I'll help you create an English description of this Node.js motorcycle repair shop project using TypeScript.



# Motorcycle Repair Shop API Project

## Project Overview
We're developing a backend API for a motorcycle repair shop where customers can schedule appointments for their motorcycles and staff can update the repair status. The system will help manage the workflow between customers and employees.

## Technical Stack
- Node.js with Express
- TypeScript
- PostgreSQL with Sequelize ORM
- RESTful API architecture

## Core Features
1. User Management System
   - Support for two user roles: client and employee
   - User account status tracking (available/disabled)
   - Basic user operations (CRUD)

2. Repair Appointment System
   - Appointment scheduling
   - Status tracking (pending/completed/cancelled)
   - Repair status updates by employees

## API Endpoints

### Users (`/api/v1/users`)
- Get all users
- Get user by ID
- Create new user (with name, email, password, and role)
- Update user information (name and email)
- Disable user account

### Repairs (`/api/v1/repairs`)
- Get all pending repairs
- Get specific repair by ID
- Create new repair appointment
- Update repair status to completed
- Cancel repair appointment

## Additional Requirements
- Data validation for user existence
- Status validation for repair operations
- Default status values:
  - Users: "available"
  - Repairs: "pending"

## Optional Challenges
- Implement user verification to check for existing users by ID and email
- Add validation to prevent cancellation of completed repairs

Would you like me to provide more specific technical details about any part of this project?
