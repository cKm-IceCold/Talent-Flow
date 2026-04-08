# Talent Flow LMS

Talent Flow is a centralized Learning Management System (LMS) designed to support structured learning, collaboration, and performance tracking for interns, mentors, and administrators within TrueMinds Innovation. The platform enables seamless collaboration across 50+ interns, structured course delivery, progress and performance tracking, and project-based learning workflows.

## 🚀 Project Overview

Talent Flow aims to provide a scalable digital learning environment with the following core objectives:
- Centralized digital learning environment
- Collaboration between interns, mentors, and teams
- Track learner progress and performance
- Support real-world project-based learning
- Ensure scalability and maintainability

## 👥 User Roles

- **Intern**: Enroll in courses, access materials, submit assignments, track progress
- **Mentor**: Create courses, upload materials, review submissions
- **Admin**: Manage users, assign roles, monitor platform

## 🧱 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **File Storage**: Cloudinary or AWS S3
- **Real-time Features**: Socket.io (optional for collaboration)

## 📁 Project Structure

- `Backend/` - API server with authentication, user management, course management, enrollment, progress tracking, assignments, collaboration, file management, and analytics
- `Frontend/` - React application for the LMS user interface (to be developed)

## 🗄️ Database Collections

- Users
- Roles
- Courses
- Modules
- Lessons
- Enrollments
- Assignments
- Submissions
- Progress
- Messages

## 🔗 API Structure (Sample Endpoints)

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /users` - Retrieve users (admin/mentor)
- `POST /courses` - Create course (mentor)
- `GET /courses/:id` - Get course details
- `POST /enrollments` - Enroll in course
- `GET /progress/:userId` - Get user progress

## ⚙️ Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd Talent-Flow
   ```

2. Install backend dependencies:
   ```bash
   cd Backend
   npm install
   ```

3. Set up environment variables in `Backend/.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/talentflow
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_URL=your_cloudinary_url  # or AWS S3 config
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

5. (Future) Install and start frontend:
   ```bash
   cd ../Frontend
   npm install
   npm start
   ```

## 📋 Sprint Plan

- **Engineer A**: Authentication & Users
- **Engineer B**: Courses & Enrollment
- **Engineer C**: Assignments & Progress

### Sprint 1: Setup & Core APIs (2 weeks)
- Project setup, database models, basic API structure

### Sprint 2: RBAC, Enrollment, Progress (2 weeks)
- Role-based access control, enrollment system, progress tracking

### Sprint 3: File Upload, Collaboration (2 weeks)
- File management, collaboration features

### Sprint 4: Optimization & Analytics (2 weeks)
- Performance optimization, analytics dashboard

### Sprint 5: Testing & Documentation (2 weeks)
- Comprehensive testing, API documentation

## 🎯 MVP Deliverables

- Authentication system
- Course creation and management
- Assignment submission and review
- Progress tracking

## 💡 Notes

- As Engineer B, focus on Courses & Enrollment modules.
- Ensure APIs are RESTful and secure with JWT.
- Integrate file uploads for course materials.
- Prepare for real-time collaboration if Socket.io is added.

## 📌 Contribution

This README reflects the PRD for Talent Flow LMS. Collaborate with team members on respective modules and follow the sprint plan for development.
