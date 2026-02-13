# Invoice Management System - Backend

RESTful API for managing invoices and persons (clients/vendors).

## Tech Stack

Java 17 | Spring Boot 3.0 | MySQL | MapStruct | Lombok

## Quick Start

### Prerequisites

- Java 17+
- Maven 3.6+
- MySQL 8.0+

### Run

```bash
git clone https://github.com/MarekZahradko/InvoiceApp.git
cd InvoiceApp
mvn spring-boot:run
```

Server starts at **http://localhost:8080**

### Database

Default config (auto-creates database):
- Database: `InvoiceDatabase`
- Username: `root`
- Password: *(empty)*

Edit `src/main/resources/application.yaml` to change.

## API Documentation

- **Swagger UI**: http://localhost:8080/swagger-ui.html (interactive, requires running app)
- **Static docs**: [docs/API.md](docs/API.md)

## Implementation Progress

### Persons API
| Endpoint | Status |
|----------|--------|
| `POST /api/persons` | Done |
| `GET /api/persons` | Done |
| `GET /api/persons/{id}` | Done |
| `PUT /api/persons/{id}` | Done |
| `DELETE /api/persons/{id}` | Done |

### Invoices API
| Endpoint | Status |
|----------|--------|
| `POST /api/invoices` | Done |
| `GET /api/invoices` | Done |
| `GET /api/invoices/{id}` | Done |
| `PUT /api/invoices/{id}` | Done |
| `DELETE /api/invoices/{id}` | Done |
| `GET /api/invoices?buyerID=&sellerID=&product=&minPrice=&maxPrice=&limit=` | Done |

### Sales & Purchases API
| Endpoint | Status |
|----------|--------|
| `GET /api/identification/{id}/sales` | Done |
| `GET /api/identification/{id}/purchases` | Done |

### Statistics API
| Endpoint | Status |
|----------|--------|
| `GET /api/invoices/statistics` | Done |
| `GET /api/persons/statistics` | Done |

## License

Educational purposes.