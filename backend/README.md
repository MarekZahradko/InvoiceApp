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

Configure your MySQL connection in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/invoice_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

The schema is created automatically on first run (`spring.jpa.hibernate.ddl-auto=update`).

## First-Time Setup — Admin Role

After registration, all users have the **USER** role (read-only).
To grant admin access, update the role directly in the database:

```sql
UPDATE user SET role = 'ADMIN' WHERE email = 'your@email.com';
```

## Documentation

- [API Reference](docs/API.md)
- [Swagger UI](http://localhost:8080/swagger-ui.html) (requires running backend)