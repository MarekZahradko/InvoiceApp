# Invoice Management System

Full-stack application for managing invoices and persons (clients/vendors).

## Tech Stack

- **Backend**: Java 17 · Spring Boot 3.0 · Spring Security · JWT · MySQL · MapStruct
- **Frontend**: React 18 · Vite · React Router · Bootstrap 5

## Features

- Invoice and person (client/vendor) management
- Role-based access control (ADMIN / USER)
- PDF export for invoices
- Excel export for person revenue statistics
- **ARES integration** — auto-fill company data from the Czech business registry by IČO
- Health monitoring via Spring Actuator (`/actuator/health`, `/actuator/info`)

## Getting Started

- [Backend setup](backend/README.md) — Spring Boot REST API
- [Frontend setup](frontend/README.md) — React SPA

## Credits

Based on a starter project from [ITnetwork.cz](https://www.itnetwork.cz/), extended with additional features.
