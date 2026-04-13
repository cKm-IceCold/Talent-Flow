# Technical Documentation - Talent Flow LMS Backend

This document outlines the API endpoints for the Courses & Enrollment modules (Engineer B responsibilities).

## Base URL
`http://localhost:5000/api`

## Authentication
Protected routes require `Authorization: Bearer <jwt_token>` header (to be implemented by Engineer A). Currently, auth is placeholder.

## Courses Endpoints

### GET /api/courses
- **Description**: Retrieve all courses.
- **Access**: Public
- **Response**: Array of course objects with populated mentor and modules.
- **Example Response**:
  ```json
  [
    {
      "_id": "courseId",
      "title": "Course Title",
      "description": "Course Description",
      "mentor": { "name": "Mentor Name", "email": "mentor@example.com" },
      "modules": [],
      "createdAt": "2026-04-08T00:00:00.000Z"
    }
  ]
  ```

### GET /api/courses/:id
- **Description**: Retrieve a single course by ID.
- **Access**: Public
- **Parameters**: `id` (course ID)
- **Response**: Course object or 404 if not found.

### POST /api/courses
- **Description**: Create a new course.
- **Access**: Private (Mentor/Admin)
- **Body**:
  ```json
  {
    "title": "string",
    "description": "string",
    "mentor": "userId",
    "modules": ["moduleId"] // optional
  }
  ```
- **Response**: Created course object.

### PUT /api/courses/:id
- **Description**: Update an existing course.
- **Access**: Private (Mentor/Admin)
- **Parameters**: `id` (course ID)
- **Body**: Partial course data (e.g., `{ "title": "New Title" }`)
- **Response**: Updated course object.

### DELETE /api/courses/:id
- **Description**: Delete a course.
- **Access**: Private (Admin)
- **Parameters**: `id` (course ID)
- **Response**: `{ "message": "Course removed" }`

## Enrollment Endpoints

### GET /api/enrollments
- **Description**: Retrieve all enrollments.
- **Access**: Private (Admin)
- **Response**: Array of enrollment objects with populated user and course.

### POST /api/enrollments
- **Description**: Enroll a user in a course.
- **Access**: Private
- **Body**:
  ```json
  {
    "userId": "string",
    "courseId": "string"
  }
  ```
- **Response**: Created enrollment object.
- **Notes**: Prevents duplicate enrollments.

### GET /api/enrollments/:userId
- **Description**: Retrieve enrollments for a specific user.
- **Access**: Private
- **Parameters**: `userId` (user ID)
- **Response**: Array of user's enrollments with populated course data.

### PUT /api/enrollments/status/:id
- **Description**: Update enrollment status.
- **Access**: Private
- **Parameters**: `id` (enrollment ID)
- **Body**:
  ```json
  {
    "status": "enrolled|completed|dropped"
  }
  ```
- **Response**: Updated enrollment object.

## Testing with Postman
1. Start the server: `npm run dev`
2. Set base URL to `http://localhost:5000/api`
3. For POST/PUT, set `Content-Type: application/json`
4. Add `Authorization: Bearer <token>` for protected routes (placeholder for now)
5. Update `.env` with real MongoDB URI to enable database operations

## Models
- **Course**: title, description, mentor (User ref), modules (Module ref array), createdAt
- **Enrollment**: user (User ref), course (Course ref), enrolledAt, status (enrolled/completed/dropped)

## Current Implementation Status
- Courses module is implemented with full CRUD support.
- Enrollment module is implemented with create, list, and status update flows.
- Auth middleware is currently a placeholder and must be replaced by Engineer A with JWT verification and role checks.
- `User` and `Module` schemas are referenced but should be added to complete the relational data model.

## Testing with Postman
1. Start the server from `Backend/`: `npm run dev`
2. Set base URL to `http://localhost:5000/api`
3. Use `Content-Type: application/json` for POST and PUT requests.
4. For protected routes, add `Authorization: Bearer <token>` once auth is implemented.
5. Example POST body for course creation:
   ```json
   {
     "title": "React Fundamentals",
     "description": "Introductory course for React development.",
     "mentor": "<mentorUserId>",
     "modules": []
   }
   ```
6. Example POST body for enrollment:
   ```json
   {
     "userId": "<internUserId>",
     "courseId": "<courseId>"
   }
   ```

## Notes
- Auth middleware is placeholder; integrate with Engineer A's implementation.
- Add `User` and `Module` models to complete all schema references.
- Error responses follow standard HTTP codes (400, 404, 500).
- Use the `/` health check route to confirm server startup: `http://localhost:5000/`.