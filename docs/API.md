# API Documentation

Base URL: `http://localhost:8080/api`

For interactive documentation, see [Swagger UI](http://localhost:8080/swagger-ui.html) when the application is running.

## Persons

### Create Person
```
POST /api/persons
```

**Request Body:**
```json
{
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

**Supported countries:** `CZECHIA`, `SLOVAKIA`

**Response:** `200 OK` with created Person object

### List All Persons
```
GET /api/persons
```

**Response:** `200 OK` with array of Person objects

### Get Person Detail
```
GET /api/persons/{id}
```

**Response:** `200 OK` with Person object or `404 Not Found`

### Update Person
```
PUT /api/persons/{id}
```

Creates a new version of the person and hides the original (preserves invoice history).

**Request Body:** Same as Create Person

**Response:** `200 OK` with updated Person object

### Delete Person
```
DELETE /api/persons/{id}
```

Soft delete - hides the person but preserves invoice history.

**Response:** `200 OK`

---

## Invoices

### Create Invoice
```
POST /api/invoices
```

**Request Body:**
```json
{
  "invoiceNumber": 2024001,
  "seller": { "_id": 1 },
  "buyer": { "_id": 2 },
  "issued": "2024-01-15",
  "dueDate": "2024-02-15",
  "product": "Consulting Services",
  "price": 15000.00,
  "vat": 21,
  "note": "Payment terms: 30 days"
}
```

**Date format:** `YYYY-MM-DD` (ISO 8601)

**Response:** `201 Created` with created Invoice object

### List All Invoices
```
GET /api/invoices
```

**Query Parameters (filtering):**

| Parameter | Type | Description |
|-----------|------|-------------|
| `buyerID` | Long | Filter by buyer ID |
| `sellerID` | Long | Filter by seller ID |
| `product` | String | Filter by product name |
| `minPrice` | BigDecimal | Minimum price |
| `maxPrice` | BigDecimal | Maximum price |
| `limit` | Integer | Limit number of results |

**Example:** `GET /api/invoices?sellerID=1&minPrice=1000&limit=10`

**Response:** `200 OK` with array of Invoice objects

### Get Invoice Detail
```
GET /api/invoices/{id}
```

**Response:** `200 OK` with Invoice object or `404 Not Found`

### Update Invoice
```
PUT /api/invoices/{id}
```

**Request Body:** Same as Create Invoice

**Response:** `200 OK` with updated Invoice object

### Delete Invoice
```
DELETE /api/invoices/{id}
```

**Response:** `204 No Content`

---

## Sales & Purchases

### Get Sales by Person
```
GET /api/identification/{identificationNumber}/sales
```

Returns all invoices where the person is the seller.

**Response:** `200 OK` with array of Invoice objects

### Get Purchases by Person
```
GET /api/identification/{identificationNumber}/purchases
```

Returns all invoices where the person is the buyer.

**Response:** `200 OK` with array of Invoice objects

---

## Statistics

### Invoice Statistics
```
GET /api/invoices/statistics
```

**Response:**
```json
{
  "currentYearSum": 150000.00,
  "allTimeSum": 500000.00,
  "invoicesCount": 42
}
```

### Person Statistics
```
GET /api/persons/statistics
```

**Response:**
```json
[
  {
    "personId": 1,
    "personName": "Company Name Ltd.",
    "revenue": 250000.00
  }
]
```

---

## Error Responses

| Status Code | Description |
|-------------|-------------|
| `200 OK` | Successful request |
| `201 Created` | Resource created |
| `204 No Content` | Successful deletion |
| `400 Bad Request` | Invalid request data |
| `404 Not Found` | Resource not found |