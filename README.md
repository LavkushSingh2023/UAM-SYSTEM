User Access Management System

A full-stack application for handling user registrations, software listings, access requests, and approvals. Built with Node.js, Express, TypeORM, PostgreSQL on the backend, and React + Tailwind CSS on the frontend.

Prerequisites
Node.js (v16+)

npm

PostgreSQL (v12+)

Setup
1. Clone the repo
bash
Copy
Edit
git clone <your-repo-url>
cd uam-system
2. Backend
Navigate to the backend folder:

bash
Copy
Edit
cd backend
Install dependencies:

bash
Copy
Edit
npm install
Copy .env.example to .env and fill in your values:

ini
Copy
Edit
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_db_password
DB_NAME=access_management_db
JWT_SECRET=someVerySecretKey
PORT=3000
Create the database in PostgreSQL (matching DB_NAME).

Run migrations to set up tables:

bash
Copy
Edit
npx typeorm migration:run -d data-source.js
Start the backend server:

bash
Copy
Edit
npm run dev
Server listens on http://localhost:3000 by default.

3. Frontend
Open a new terminal, go to the frontend folder:

bash
Copy
Edit
cd ../frontend
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file in frontend/ with:

ini
Copy
Edit
VITE_API_BASE_URL=http://localhost:3000
Start the dev server:

bash
Copy
Edit
npm run dev
Frontend runs at http://localhost:5173 by default.

🔌 API Endpoints
All routes are prefixed with /api.

Auth
POST /api/auth/signup
Register a new user (default role: Employee).
Body

json
Copy
Edit
{ "username": "alice", "password": "secret123" }
Success → 201 Created

json
Copy
Edit
{ "message": "User registered successfully" }
POST /api/auth/login
Obtain JWT and role.
Body

json
Copy
Edit
{ "username": "alice", "password": "secret123" }
Success → 200 OK

json
Copy
Edit
{ "token": "<jwt>", "role": "Employee" }
Software (Admin only)
POST /api/software
Create a new software entry.
Headers
Authorization: Bearer <jwt>
Body

json
Copy
Edit
{
  "name": "Photoshop",
  "description": "Image editing tool",
  "accessLevels": ["Read","Write","Admin"]
}
Success → 201 Created with software object.

Requests
POST /api/requests
Submit an access request (Employee only).
Headers
Authorization: Bearer <jwt>
Body

json
Copy
Edit
{
  "softwareId": 1,
  "accessType": "Read",
  "reason": "Need to view files"
}
Success → 201 Created with request object.

PATCH /api/requests/:id
Approve or reject a request (Manager only).
Headers
Authorization: Bearer <jwt>
Body

json
Copy
Edit
{ "status": "Approved" }
Success → 200 OK with updated request.

Role Permissions
Employee: signup, login, view software list, submit requests.

Manager: login, view pending requests, approve/reject.

Admin: login, create/edit software, full system access.

Notes
All protected routes require a valid JWT in the Authorization header.

Passwords are hashed with bcrypt; tokens expire in 1 hour.

Tailwind CSS is used for styling the frontend.
