# Invoice Manager — Backend

Spring Boot REST API for managing invoices and persons (clients/vendors).

## Architecture

The backend follows a standard layered architecture:

```
Controller → Service → Repository → Database
```

### Package structure

```
cz.itnetwork/
├── controller/       # REST endpoints — receive requests, delegate to services
│   └── advice/       # Global exception handler (@ControllerAdvice)
├── service/          # Business logic — interfaces + implementations
├── entity/           # JPA entities mapped to database tables
│   ├── repository/   # Spring Data JPA repositories
│   └── filter/       # Invoice filtering via JPA Specification
├── dto/              # Data Transfer Objects — what the API accepts/returns
│   ├── mapper/       # MapStruct mappers (Entity ↔ DTO conversion)
│   └── ares/         # DTOs for the ARES external API response
├── security/         # JWT filter, token utility, Spring Security config
└── constant/         # Enums — Countries, Role
```

### Key design decisions

**DTO pattern** — entities are never exposed directly. MapStruct generates the conversion code at compile time, keeping controllers and clients decoupled from the database schema.

**Soft delete for persons** — deleting a person sets `hidden = true` instead of removing the row. This preserves invoice history (invoices still reference the original person record).

**Person versioning on edit** — updating a person creates a new row and hides the original. Existing invoices continue to reference the old version, so historical data stays consistent.

**JPA Specification for invoice filtering** — `InvoiceSpecification` builds a dynamic query from `InvoiceFilter` parameters (buyerID, sellerID, product, price range, limit) without multiple repository methods.

**JWT authentication flow:**
1. Client sends credentials to `POST /api/auth/login`
2. Server validates, signs a JWT with a secret key, returns `{ "token": "..." }`
3. Client includes the token in every request: `Authorization: Bearer <token>`
4. `JwtFilter` validates the token on each request and sets the `SecurityContext`
5. Role-based rules in `SecurityConfig` enforce ADMIN-only write access

---

## Prerequisites

- Java 17+
- Maven 3.6+
- MySQL 8.0+

## Installation & Running

```bash
mvn spring-boot:run
```

Runs at **http://localhost:8080**.

## Database Configuration

Configure your MySQL connection in `src/main/resources/application.yaml`:

```yaml
spring.datasource:
  url: jdbc:mysql://localhost/InvoiceDatabase?createDatabaseIfNotExist=true&serverTimezone=Europe/Prague
  username: root
  password: your_password
```

The database is created automatically if it doesn't exist. The schema is updated on each run (`ddl-auto: update`).

## First-Time Setup — Admin Role

After registration, all users have the **USER** role (read-only).
To grant admin access, update the role directly in the database:

```sql
UPDATE user SET role = 'ADMIN' WHERE email = 'your@email.com';
```

## Export Features

### PDF Export

Each invoice can be exported as a PDF document:

```
GET /api/invoices/{id}/pdf
```

Returns the invoice rendered as a PDF file (inline, opens in browser).
Generated from a Thymeleaf HTML template using the openhtmltopdf library.

### Excel Export

Person revenue statistics can be exported as an Excel file:

```
GET /api/statistics/export/excel
```

Returns a `.xlsx` file containing identification number, name, and total revenue for each person.
Generated using Apache POI.

Both endpoints require authentication (USER or ADMIN role).

## ARES Integration

The backend integrates with the [ARES](https://ares.gov.cz) Czech business registry.
Given a valid IČO (8-digit company ID), the API fetches and returns pre-filled company data.

```
GET /api/ares/{ico}
```

**Example:**
```
GET /api/ares/27082440
```

Returns a `PersonDTO` with `name`, `identificationNumber`, `taxNumber`, `street`, `zip`, and `city` pre-filled from ARES.
This endpoint is **public** (no authentication required) so it can be called from the person creation form.

Returns `404` if the IČO does not exist in the ARES registry.

## Health & Monitoring

The app exposes two public [Spring Actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html) endpoints for basic health checking:

| Endpoint | Description |
|----------|-------------|
| `GET /actuator/health` | Server and database status |
| `GET /actuator/info` | Application info |

Useful for verifying the server is running and the database connection is healthy.

## Documentation

- [API Reference](docs/API.md)
- [Swagger UI](http://localhost:8080/swagger-ui.html) (requires running backend)