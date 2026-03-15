# Invoice Manager — Backend

Spring Boot REST API for managing invoices and persons (clients/vendors).

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
  url: jdbc:mysql://localhost/InvoiceDatabase?createDatabaseIfNotExist=true
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