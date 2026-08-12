# Enfos Reporting Portal

A full-stack reporting portal built for the Enfos coding take-home assessment. Users can browse available reports (Users, Departments, Projects) and view their data in interactive, paginated tables with search, loading, and error states.

**Stack:** React + TypeScript + Vite + Material UI (frontend) · Java 21 + Spring Boot 4.1.0 (backend)

## Prerequisites

- **Docker Desktop** (recommended path — no other installs needed)
- OR, for running without Docker:
    - Java 21 (JDK)
    - Node.js 22+ and npm
    - Maven (or use the included `mvnw` wrapper)

## Running with Docker (recommended)

From the project root:

```bash
docker compose up --build
```

This builds and starts both the backend and frontend in one command. Once running:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080
- **Swagger UI (API docs):** http://localhost:8080/swagger-ui.html

To stop: `Ctrl+C`, or run `docker compose down` from another terminal.

## Running without Docker (manual setup)

**Backend:**

macOS/Linux:
```bash
cd backend
./mvnw spring-boot:run
```

Windows:
```bash
cd backend
.\mvnw.cmd spring-boot:run
```

Backend runs on http://localhost:8080.

**Frontend** (in a separate terminal):

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on http://localhost:5173.

> Note: if running the frontend manually against a manually-run backend, both use their default local ports (5173 and 8080) and are already configured to work together via CORS.

## Project Structure

```
enfos-reporting/
├── backend/          # Spring Boot API (Java 21, Maven)
│   └── src/main/java/com/malini/enfos/backend/
│       ├── dto/          # API response shapes
│       ├── model/        # Internal data models
│       ├── enums/        # Shared enums (UserRole, UserStatus, ProjectStatus)
│       ├── repository/   # Data access interfaces + in-memory implementations
│       ├── service/      # Business logic, including foreign-key resolution
│       ├── controller/   # REST endpoints
│       ├── exception/    # Global exception handling
│       └── config/       # CORS configuration
├── frontend/         # React + TypeScript + Vite
│   └── src/
│       ├── types/        # TypeScript interfaces matching backend DTOs
│       ├── services/     # API client functions
│       └── components/   # UI components
├── docker-compose.yml
├── README.md
└── ASSUMPTIONS.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reports` | List of available reports (metadata) |
| GET | `/api/reports/users` | Users report data |
| GET | `/api/reports/departments` | Departments report data |
| GET | `/api/reports/projects` | Projects report data |

Full interactive documentation is available via Swagger UI once the backend is running, at `http://localhost:8080/swagger-ui.html`.

## Features

- Landing page with all available reports, live search/filter by name, and record counts
- Dedicated table view per report with the required columns for Users, Departments, and Projects
- Status and Role filters on the Users report, Status filter on the Projects report, with a Clear Filters option
- Foreign key relationships (Department Manager, Project Owner/Department) resolved server-side to display names
- Loading, empty, and error states across all views
- Pagination on report tables
- Responsive layout, verified at mobile widths
- Single-command build and run via Docker Compose

## Notes on Assumptions & Tradeoffs

Please see [ASSUMPTIONS.md](./ASSUMPTIONS.md) for detailed design decisions and tradeoffs.