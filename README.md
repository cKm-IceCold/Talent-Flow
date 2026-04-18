# Talent Flow LMS

A centralized Learning Management System (LMS) for interns, mentors, and administrators at TrueMinds Innovation.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT + bcrypt
- **Containerization**: Docker, Docker Compose
- **Frontend**: React (served via Nginx)

## User Roles

| Role | Capabilities |
|------|-------------|
| Intern | Enroll in courses, submit assignments, track progress |
| Mentor | Create courses, create/grade assignments |
| Admin | Full access — manage users, delete resources |

## Running the Project

```bash
docker compose up --build
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| Swagger Docs | http://localhost:5000/api-docs |
| MongoDB | mongodb://localhost:27017/talentflow |

## Project Structure

```
Talent-Flow/
├── Backend/
│   ├── src/
│   │   ├── controllers/     # auth, user, course, enrollment
│   │   ├── middleware/      # auth.middleware.js (verifyToken, verifyRole)
│   │   ├── models/          # User, Role, Course, Module, Enrollment, Assignment, Progress
│   │   ├── routes/          # auth, users, courses, enrollments, assignments, progress
│   │   ├── utils/           # swagger
│   │   └── server.js
│   └── Technical.md         # Full API documentation
├── Frontend/                # React app
├── Dockerfile.backend
├── Dockerfile.frontend
├── nginx.conf
└── docker-compose.yml
```

## API Overview

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET | /api/users/profile | Authenticated |
| GET | /api/users | Admin |
| GET | /api/courses | Public |
| POST | /api/courses | Mentor, Admin |
| PUT | /api/courses/:id | Mentor, Admin |
| DELETE | /api/courses/:id | Admin |
| POST | /api/enrollments | Authenticated |
| GET | /api/enrollments/:userId | Authenticated |
| GET | /api/enrollments | Admin |
| POST | /api/assignments | Mentor, Admin |
| GET | /api/assignments/course/:courseId | Authenticated |
| POST | /api/assignments/:id/submit | Intern |
| POST | /api/assignments/:id/grade | Mentor, Admin |
| GET | /api/progress/student/:studentId | Authenticated |

Full API docs: [`Backend/Technical.md`](Backend/Technical.md)

## Environment Variables

Create `Backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/talentflow
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

## MVP Status

- [x] Authentication (register, login, JWT, RBAC)
- [x] Course management (CRUD)
- [x] Enrollment system
- [x] Assignment creation, submission & grading
- [x] Progress tracking
- [x] Dockerized (backend + frontend + MongoDB)
