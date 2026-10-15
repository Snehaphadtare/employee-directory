# Employee Directory

A full-stack Employee Directory application that allows users to manage employee records through a clean and responsive interface.

## Features

- **Add Employees:** Create employee records with name, email, and job role.
- **View Employees:** Display all employees in a table.
- **Edit Employees:** Update existing employee information.
- **Delete Employees:** Remove employee records.
- **Search Employees:** Filter the directory by employee name.
- **Persistent Storage:** Store records in a PostgreSQL database.

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, TypeScript, Vite, CSS |
| API Communication | Axios |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| Version Control | Git and GitHub |

## Project Structure

```text
employee-directory/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env.example
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Prerequisites

Install the following before running the application:

- Node.js and npm
- PostgreSQL
- Git
- A code editor such as Visual Studio Code

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Snehaphadtare/employee-directory.git
cd employee-directory
```

### 2. Set up PostgreSQL

Create a database named `employee_directory` using pgAdmin or the PostgreSQL command line.

Connect to that database and execute:

```sql
CREATE TABLE employees (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    role VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Configure and start the backend

Open a terminal in the project root and run:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory using `.env.example` as a template.

Configure your local PostgreSQL connection:

```dotenv
DB_HOST=localhost
DB_PORT=5433
DB_NAME=employee_directory
DB_USER=postgres
DB_PASSWORD=YOUR_POSTGRES_PASSWORD
PORT=5000
```

Replace the password placeholder with your PostgreSQL password. Adjust the port to match your local PostgreSQL configuration.

Start the backend:

```bash
node server.js
```

The API runs at `http://localhost:5000`.

### 4. Configure and start the frontend

Open a second terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

Open the URL displayed by Vite, usually `http://localhost:5173`.

Keep both the frontend and backend servers running while using the application.

## REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/employees` | Retrieve all employees |
| POST | `/employees` | Add a new employee |
| PUT | `/employees/:id` | Update an employee |
| DELETE | `/employees/:id` | Delete an employee |

### Example employee object

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "role": "Software Engineer"
}
```

## Database Schema

| Column | Type | Description |
|---|---|---|
| `id` | INTEGER | Primary key, auto-generated |
| `name` | VARCHAR(100) | Employee name |
| `email` | VARCHAR(150) | Employee email |
| `role` | VARCHAR(100) | Employee job role |
| `created_at` | TIMESTAMP | Record creation time |

## Security

- Database credentials are configured through environment variables.
- The local `.env` file must not be committed to GitHub.
- The `.env.example` file provides a configuration template without real credentials.

## Author

Developed as a full-stack Employee Directory project demonstrating CRUD operations, REST API integration, relational database management, and frontend development.
