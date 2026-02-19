# Invoice Management System

Full-stack application for managing invoices and persons (clients/vendors).

## Tech Stack

- **Backend**: Java 17 · Spring Boot 3.0 · Spring Security · JWT · MySQL · MapStruct
- **Frontend**: React 18 · Vite · React Router · Bootstrap 5

## Quick Start

### Prerequisites

- Java 17+, Maven 3.6+, MySQL 8.0+
- Node.js 18+, npm 9+

### Backend

```bash
cd backend
mvn spring-boot:run
```

Server starts at **http://localhost:8080**

Default database config (auto-creates `InvoiceDatabase`):
- Username: `root` / Password: *(empty)*
- Edit `backend/src/main/resources/application.yaml` to change.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Dev server starts at **http://localhost:5173**

## Authentication

The API uses JWT-based authentication with role-based access control.

| Endpoint | Description |
|----------|-------------|
| `POST /api/auth/register` | Register (returns JWT) |
| `POST /api/auth/login` | Login (returns JWT) |

Include the token in requests: `Authorization: Bearer <token>`

### Roles

- **USER** — read-only access (default on registration)
- **ADMIN** — full access (set manually in DB)

## API Documentation

- **Swagger UI**: http://localhost:8080/swagger-ui.html (requires running backend)
- **Static docs**: [backend/docs/API.md](backend/docs/API.md)

## License

MIT
