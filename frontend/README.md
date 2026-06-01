# Invoice Manager — Frontend

React + TypeScript SPA for managing invoices and persons (clients/vendors).
Communicates with the [Spring Boot backend](../backend) via REST API.

## Prerequisites

- Node.js 18+
- TypeScript (included via `npm install`)
- Running backend at `http://localhost:8080`

## Installation & Running

```bash
npm install
npm run dev
```

Runs at **http://localhost:5173**.

## Configuration

The API base URL is defined in `src/utils/api.ts`:

```ts
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

Unauthenticated users can only access `/login` and `/register` — all other routes redirect to `/login`.

All registered users start with the **USER** role (read-only). Admin access must be granted manually in the database.

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
Clicking **"Export do Excelu"** downloads a `.xlsx` file with identification number, name, and revenue for each person.

## Architecture

### Authentication flow

1. User submits credentials on `/login` → `POST /api/auth/login`
2. Backend returns `{ "token": "eyJ..." }`
3. Token is stored in `localStorage` and saved into `AuthContext` state
4. Every API request includes `Authorization: Bearer <token>` (added in `api.ts`)
5. `ProtectedRoute` checks `AuthContext` on each route — unauthenticated users are redirected to `/login`

### Key files

**`utils/AuthContext.tsx`** — global authentication state. Provides `isAuthenticated`, `user`, `login()`, and `logout()` to the entire app via React Context. Restores session from `localStorage` on page reload.

**`utils/ProtectedRoute.tsx`** — wraps any route that requires login. Redirects to `/login` if the user is not authenticated.

**`utils/api.ts`** — HTTP helper functions (`apiGet`, `apiPost`, `apiPut`, `apiDelete`, `apiGetPdf`, `apiGetExcel`). All requests automatically attach the JWT token from `localStorage`.

**`types.ts`** — shared TypeScript types: `Person`, `Invoice`, `User`, `PersonStatisticsData`, `InvoiceStatisticsData`. Used across all pages and components.

**`components/`** — shared reusable form components: `InputField`, `InputCheck`, `InputSelect`, `FlashMessage`. Accept typed props and are used by both person and invoice forms.

## Project Structure

```
src/
├── invoices/        # Invoice pages and components
├── persons/         # Person pages and components
├── components/      # Shared reusable components (inputs, flash messages)
├── utils/
│   ├── api.ts               # HTTP helpers (GET, POST, PUT, DELETE, PDF, Excel)
│   ├── AuthContext.tsx      # Global authentication state (JWT + user)
│   ├── ProtectedRoute.tsx   # Route guard for authenticated pages
│   └── dateStringFormatter.ts
├── types.ts         # Shared TypeScript types (Person, Invoice, User, ...)
├── App.tsx          # Root component — routing and navigation
└── main.tsx         # Application entry point
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |