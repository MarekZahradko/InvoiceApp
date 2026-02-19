# Invoice Management System

Full-stack application for managing invoices and persons (clients/vendors).

## Tech Stack

- **Backend**: Java 17 · Spring Boot 3.0 · Spring Security · JWT · MySQL · MapStruct
- **Frontend**: React 18 · Vite · React Router · Bootstrap 5

## Quick Start

### Backend

```bash
cd backend
mvn spring-boot:run
```

Runs at **http://localhost:8080** — requires Java 17+, Maven 3.6+, MySQL 8.0+.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at **http://localhost:5173** — requires Node.js 18+.

## Documentation

- [API & Authentication](backend/docs/API.md)
- [Swagger UI](http://localhost:8080/swagger-ui.html) (requires running backend)

## Credits

Based on a starter project from [ITnetwork.cz](https://www.itnetwork.cz/), extended with additional features.
