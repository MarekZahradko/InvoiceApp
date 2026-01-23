# Invoice Management System - Backend

A RESTful API backend for managing invoices and persons (clients/vendors) built with Spring Boot.

## Overview

This application provides a complete backend solution for invoice management, allowing users to:
- Create, read, update, and delete invoices
- Manage persons (buyers and sellers) with version history
- Filter invoices by multiple criteria
- View sales and purchase statistics
- Track revenue by company

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 18 | Programming language |
| Spring Boot | 3.0.2 | Application framework |
| Spring Data JPA | 3.0.x | Database access layer |
| MySQL | 8.0 | Relational database |
| MapStruct | 1.5.3 | Object mapping (Entity ↔ DTO) |
| Lombok | 1.18.26 | Boilerplate code reduction |
| SpringDoc OpenAPI | 2.0.2 | API documentation |
| Hibernate | 6.1.6 | ORM framework |

## Prerequisites

- **Java 18** or higher
- **Maven** 3.6+
- **MySQL Server** 8.0+

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/MarekZahradko/InvoiceApp.git
cd InvoiceApp
```

### 2. Configure the database

The application uses MySQL. Default configuration:

| Property | Default Value |
|----------|---------------|
| Database | `InvoiceDatabase` |
| Username | `root` |
| Password | *(empty)* |
| Port | `3306` |

The database is created automatically if it doesn't exist.

To modify settings, edit `src/main/resources/application.yaml`:

```yaml
spring.datasource:
  url: jdbc:mysql://localhost/InvoiceDatabase?createDatabaseIfNotExist=true
  username: your_username
  password: your_password
```

### 3. Build and run

```bash
# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The server starts at **http://localhost:8080**

## API Documentation

Interactive documentation available at:
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/api-docs

## API Endpoints

### Persons

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/persons` | Create a new person |
| `GET` | `/api/persons` | List all persons |
| `GET` | `/api/persons/{id}` | Get person details |
| `PUT` | `/api/persons/{id}` | Update person (creates new version, hides original) |
| `DELETE` | `/api/persons/{id}` | Hide person (soft delete, preserves invoice history) |

### Invoices

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/invoices` | Create a new invoice |
| `GET` | `/api/invoices` | List all invoices (supports filtering) |
| `GET` | `/api/invoices/{id}` | Get invoice details |
| `PUT` | `/api/invoices/{id}` | Update an invoice |
| `DELETE` | `/api/invoices/{id}` | Delete an invoice |

#### Invoice Filtering Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `buyerID` | Long | Filter by buyer ID |
| `sellerID` | Long | Filter by seller ID |
| `product` | String | Filter by product name |
| `minPrice` | BigDecimal | Minimum price |
| `maxPrice` | BigDecimal | Maximum price |
| `limit` | Integer | Limit number of results |

**Example**: `GET /api/invoices?sellerID=1&minPrice=1000&maxPrice=50000&limit=10`

### Sales & Purchases

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/identification/{identificationNumber}/sales` | Get invoices issued by person |
| `GET` | `/api/identification/{identificationNumber}/purchases` | Get invoices received by person |

### Statistics

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/invoices/statistics` | Invoice statistics (current year sum, all-time sum, count) |
| `GET` | `/api/persons/statistics` | Person statistics (revenue by company) |

## Data Models

### Person

```json
{
  "_id": 1,
  "name": "Company Name Ltd.",
  "identificationNumber": "12345678",
  "taxNumber": "CZ12345678",
  "accountNumber": "1234567890",
  "bankCode": "0100",
  "iban": "CZ1234567890123456789012",
  "telephone": "+420123456789",
  "mail": "contact@company.com",
  "street": "Main Street 123",
  "zip": "12345",
  "city": "Prague",
  "country": "CZECHIA",
  "note": "Optional note"
}
```

**Supported countries**: `CZECHIA`, `SLOVAKIA`

### Invoice

```json
{
  "_id": 1,
  "invoiceNumber": 2024001,
  "seller": {
    "_id": 1,
    "name": "Seller Company Ltd.",
    "identificationNumber": "12345678"
  },
  "buyer": {
    "_id": 2,
    "name": "Buyer Company Ltd.",
    "identificationNumber": "87654321"
  },
  "issued": "2024-01-15",
  "dueDate": "2024-02-15",
  "product": "Consulting Services",
  "price": 15000.00,
  "vat": 21,
  "note": "Payment terms: 30 days"
}
```

**Note**: `seller` and `buyer` contain full Person objects. Date format: `YYYY-MM-DD` (ISO 8601).

### Invoice Statistics Response

```json
{
  "currentYearSum": 150000.00,
  "allTimeSum": 500000.00,
  "invoicesCount": 42
}
```

### Person Statistics Response

```json
[
  {
    "personId": 1,
    "personName": "Company Name Ltd.",
    "revenue": 250000.00
  }
]
```

## Project Structure

```
src/main/java/cz/itnetwork/
├── ApplicationMain.java
├── configuration/
│   └── WebConfiguration.java
├── constant/
│   └── Countries.java
├── controller/
│   ├── InvoiceController.java
│   ├── PersonController.java
│   └── advice/
│       └── EntityNotFoundExceptionAdvice.java
├── dto/
│   ├── InvoiceDTO.java
│   ├── PersonDTO.java
│   └── mapper/
│       ├── InvoiceMapper.java
│       └── PersonMapper.java
├── entity/
│   ├── InvoiceEntity.java
│   ├── PersonEntity.java
│   └── repository/
│       ├── InvoiceRepository.java
│       └── PersonRepository.java
└── service/
    ├── InvoiceService.java
    ├── InvoiceServiceImpl.java
    ├── PersonService.java
    └── PersonServiceImpl.java
```

## Error Handling

The API returns appropriate HTTP status codes:

| Status Code | Description |
|-------------|-------------|
| `200 OK` | Successful request |
| `201 Created` | Resource created successfully |
| `204 No Content` | Successful deletion |
| `404 Not Found` | Resource not found |
| `400 Bad Request` | Invalid request data |

## Development

### Building

```bash
mvn clean package
```

### Running tests

```bash
mvn test
```

## License

This project is for educational purposes.