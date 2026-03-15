# Invoice Manager — Frontend

React SPA for managing invoices and persons (clients/vendors).
Communicates with the [Spring Boot backend](../invoice-server-starter/backend) via REST API.

## Prerequisites

- Node.js 18+
- Running backend at `http://localhost:8080`

## Installation & Running

```bash
npm install
npm run dev
```

Runs at **http://localhost:5173**.

## Configuration

The API base URL is defined in `src/utils/api.js`:

```js
const API_URL = "http://localhost:8080";
```

Change this value if your backend runs on a different address.

## Pages

| Route | Description | Access |
|-------|-------------|--------|
| `/login` | Login form | Public |
| `/register` | Registration form | Public |
| `/dashboard` | Invoice & person statistics | USER, ADMIN |
| `/persons` | List of persons | USER, ADMIN |
| `/persons/create` | Create new person | ADMIN |
| `/persons/edit/:id` | Edit person | ADMIN |
| `/persons/show/:id` | Person detail | USER, ADMIN |
| `/invoices` | List of invoices with filters | USER, ADMIN |
| `/invoices/create` | Create new invoice | ADMIN |
| `/invoices/edit/:id` | Edit invoice | ADMIN |
| `/invoices/show/:id` | Invoice detail with PDF export | USER, ADMIN |

All routes except `/login` and `/register` require authentication.
Unauthenticated users are redirected to `/login`.

## ARES Auto-fill

When creating or editing a person, entering an 8-digit IČO and leaving the field
automatically fetches company data from the [ARES](https://ares.gov.cz) Czech business registry.

The following fields are pre-filled if the IČO is found:
- Company name
- DIČ (tax number)
- Street, ZIP code, city

If the IČO is not found in ARES, the fields remain empty and can be filled in manually.

## Export Features

### PDF Export

Available on the invoice detail page (`/invoices/show/:id`).
Clicking **"Zobrazit PDF"** fetches the invoice as a PDF from the backend and opens it in a new browser tab.

### Excel Export

Available on the dashboard (`/dashboard`) in the person statistics section.
Clicking **"Export to Excel"** downloads a `.xlsx` file with identification number, name, and revenue for each person.

## Project Structure

```
src/
├── invoices/        # Invoice pages and components
├── persons/         # Person pages and components
├── components/      # Shared reusable components (inputs, flash messages)
├── utils/
│   ├── api.js               # HTTP helpers (GET, POST, PUT, DELETE, PDF, Excel)
│   ├── AuthContext.jsx      # Global authentication state (JWT + user)
│   ├── ProtectedRoute.jsx   # Route guard for authenticated pages
│   └── dateStringFormatter.js
├── App.jsx          # Root component — routing and navigation
└── main.jsx         # Application entry point
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |