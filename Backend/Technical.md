# Technical Documentation - Talent Flow LMS Backend

## Base URL
`http://localhost:5000/api`

## Authentication
All protected routes require:
```
Authorization: Bearer <jwt_token>
```
Obtain a token via `POST /auth/login`. JWT expires in 24 hours.

## Roles & Permissions
| Role   | Permissions |
|--------|-------------|
| Intern | Enroll in courses, submit assignments, view own progress |
| Mentor | Create/update courses, create/update/grade assignments |
| Admin  | Full access including delete and user management |

---

## Auth Endpoints

### POST /api/auth/register
- **Access**: Public
- **Body**: `{ "name", "email", "password", "roleName" }` — `roleName` is `Intern`, `Mentor`, or `Admin`
- **Response**: `201` user object

### POST /api/auth/login
- **Access**: Public
- **Body**: `{ "email", "password" }`
- **Response**: `200` `{ token, user: { id, name, email, role } }`

---

## User Endpoints

### GET /api/users/profile
- **Access**: Private (any authenticated user)
- **Response**: Own user profile (no password)

### GET /api/users
- **Access**: Private (Admin only)
- **Response**: All users with populated roles

---

## Course Endpoints

### GET /api/courses
- **Access**: Public
- **Response**: All courses with populated mentor (name, email)

### GET /api/courses/:id
- **Access**: Public
- **Response**: Single course or `404`

### POST /api/courses
- **Access**: Private (Mentor, Admin)
- **Body**: `{ "title", "description", "modules": [] }`
- **Note**: `mentor` is set automatically from the authenticated user's token
- **Response**: `201` created course

### PUT /api/courses/:id
- **Access**: Private (Mentor, Admin)
- **Body**: Any partial course fields
- **Response**: Updated course

### DELETE /api/courses/:id
- **Access**: Private (Admin)
- **Response**: `{ "message": "Course removed" }`

---

## Enrollment Endpoints

### POST /api/enrollments
- **Access**: Private (any authenticated user)
- **Body**: `{ "userId", "courseId" }`
- **Response**: `201` enrollment object. Prevents duplicates.

### GET /api/enrollments/:userId
- **Access**: Private
- **Response**: User's enrollments with populated course data

### GET /api/enrollments
- **Access**: Private (Admin)
- **Response**: All enrollments with populated user and course

### PUT /api/enrollments/status/:id
- **Access**: Private
- **Body**: `{ "status": "enrolled" | "completed" | "dropped" }`
- **Response**: Updated enrollment

---

## Assignment Endpoints

### POST /api/assignments
- **Access**: Private (Mentor, Admin)
- **Body**: `{ "title", "description", "course", "dueDate", "maxScore" }`
- **Response**: `201` created assignment

### GET /api/assignments/course/:courseId
- **Access**: Private (any authenticated user)
- **Response**: All assignments for a course

### GET /api/assignments/:id
- **Access**: Private (any authenticated user)
- **Response**: Single assignment with populated course

### PUT /api/assignments/:id
- **Access**: Private (Mentor, Admin)
- **Body**: Any partial assignment fields
- **Response**: Updated assignment

### DELETE /api/assignments/:id
- **Access**: Private (Admin)
- **Response**: `{ "message": "Assignment deleted" }`

### POST /api/assignments/:id/submit
- **Access**: Private (Intern)
- **Description**: Intern submits an assignment. Creates or updates a Progress record with status `submitted`.
- **Response**: `201` progress record

### POST /api/assignments/:id/grade
- **Access**: Private (Mentor, Admin)
- **Body**: `{ "studentId", "score", "feedback" }`
- **Description**: Grades a submission. Updates Progress record with status `graded`.
- **Response**: Updated progress record

---

## Progress Endpoints

### GET /api/progress/student/:studentId
- **Access**: Private
- **Response**: All progress records for a student with populated assignment data

### GET /api/progress/assignment/:assignmentId
- **Access**: Private
- **Response**: All progress records for an assignment with populated student data

### GET /api/progress/student/:studentId/assignment/:assignmentId
- **Access**: Private
- **Response**: Single progress record or `404`

### POST /api/progress
- **Access**: Private
- **Body**: `{ "student", "assignment", "status", "score", "feedback", "completionPercentage", "timeSpent" }`
- **Response**: `201` created/updated progress record (upsert)

### PUT /api/progress/:id
- **Access**: Private
- **Body**: Any partial progress fields
- **Response**: Updated progress record

### DELETE /api/progress/:id
- **Access**: Private
- **Response**: `{ "message": "Progress record deleted successfully" }`

---

## Running with Docker

```bash
docker compose up --build
```

| Service  | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| API via proxy | http://localhost:3000/api |
| Swagger docs | http://localhost:5000/api-docs |
| MongoDB | mongodb://localhost:27017/talentflow |

---

## Models Summary
| Model | Key Fields |
|-------|-----------|
| User | name, email, password (hashed), role (Role ref) |
| Role | name (Intern/Mentor/Admin), permissions |
| Course | title, description, mentor (User ref), modules (Module ref[]), status |
| Module | title, course (Course ref) |
| Enrollment | user, course, status (enrolled/completed/dropped), enrolledAt |
| Assignment | title, description, course, dueDate, maxScore, status |
| Progress | student, assignment, status, score, maxScore, feedback, submissionDate, gradedDate |

---

## Error Responses
| Code | Meaning |
|------|---------|
| 400 | Bad request / validation error |
| 401 | Invalid or missing token |
| 403 | Forbidden — insufficient role |
| 404 | Resource not found |
| 500 | Server error |
