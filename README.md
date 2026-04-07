# Talent Flow

Talent Flow is a modern Learning Management System (LMS) scaffolded for the MERN stack with Docker support. It is designed to help organizations and educators manage courses, users, and learning content using a React frontend, Express.js backend, MongoDB database, and Node.js runtime.

## 🚀 Project Overview

Talent Flow is intended to be a scalable LMS platform with features such as:
- User registration and authentication
- Role-based access (students, instructors, admins)
- Course creation and management
- Enrollment and progress tracking
- Assignment management and submission
- Content delivery and learning resources
- Responsive UI for web access

## 🧱 Tech Stack

- Frontend: React
- Backend: Node.js + Express
- Database: MongoDB
- Containerization: Docker & Docker Compose
- Authentication: JWT or session-based auth
- Styling: CSS / Tailwind / UI library (optional)

## 📁 Project Structure

- `Backend/` - API server, business logic, database models, authentication, and routes
- `Frontend/` - React application for the LMS user interface
- `docker-compose.yml` - Docker orchestration file
- `Dockerfile.backend` - Backend container configuration
- `Dockerfile.frontend` - Frontend container configuration

## 🐳 Docker Setup (Recommended)

### Prerequisites
- Docker installed on your system
- Docker Compose installed

### Quick Start with Docker

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd Talent-Flow
   ```

2. Create environment files:
   ```bash
   cp Backend/.env.example Backend/.env
   cp Frontend/.env.example Frontend/.env
   ```

3. Start all services with Docker Compose:
   ```bash
   docker-compose up -d
   ```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

5. Stop the services:
   ```bash
   docker-compose down
   ```

## ⚙️ Manual Setup (Without Docker)

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed locally
- npm or yarn

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

3. Install frontend dependencies:
   ```bash
   cd ../Frontend
   npm install
   ```

4. Create environment files
   - `Backend/.env`
   - `Frontend/.env`

   Example backend variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/talentflow
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

   Example frontend variables:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_ENV=development
   ```

5. Start MongoDB (if not running):
   ```bash
   mongod
   ```

6. Start the backend server:
   ```bash
   cd Backend
   npm run dev
   ```

7. Start the frontend app:
   ```bash
   cd ../Frontend
   npm start
   ```

## 🧩 Core Features

- **Authentication and Authorization** - User registration, login, and role-based access
- **Course Management** - Create, edit, and organize courses with lessons
- **Assignment System** - Create assignments, link to courses, manage submissions
- **User Roles** - Students, instructors, and administrators with different permissions
- **Student Dashboard** - Track progress, view enrolled courses and assignments
- **Instructor Tools** - Course creation, assignment management, student tracking
- **Admin Panel** - User management, system configuration
- **Search and Filtering** - Find courses and content easily

## � Docker Services

The Docker setup includes:
- **Frontend Container** - React app served with Nginx
- **Backend Container** - Node.js/Express API server
- **MongoDB Container** - Database with persistent volumes
- **Redis Container** - Session storage and caching (optional)

## 🔧 Development Workflow

### Using Docker (Recommended)
```bash
# Start development environment
docker-compose up -d

# View logs
docker-compose logs -f

# Access containers
docker-compose exec backend bash
docker-compose exec frontend bash

# Rebuild after changes
docker-compose up --build
```

### Environment Configuration
- `Backend/.env.example` - Backend environment template
- `Frontend/.env.example` - Frontend environment template
- `docker-compose.yml` - Service orchestration

## 💡 Important Notes

- **Docker is recommended** for consistent development environment
- Environment files should be created from `.env.example` templates
- MongoDB data persists in Docker volumes
- Frontend runs on port 3000, Backend on port 5000
- Hot reload is enabled for development

## 📌 Assignment Implementation Focus

For the assignment model implementation:
1. Create Assignment schema in Backend/models/
2. Implement CRUD endpoints in Backend/routes/
3. Link assignments to courses via ObjectId references
4. Add validation for assignment data
5. Test endpoints using Docker environment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker setup
5. Submit a pull request

This README provides a complete guide for setting up and developing the Talent Flow LMS with Docker support.
