/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *                                _
 *              ___ ___ ___ _____|_|_ _ _____
 *             | . |  _| -_|     | | | |     |  LICENCE
 *             |  _|_| |___|_|_|_|_|___|_|_|_|
 *             |_|
 *
 *   PROGRAMOVÁNÍ  <>  DESIGN  <>  PRÁCE/PODNIKÁNÍ  <>  HW A SW
 *
 * Tento zdrojový kód je součástí výukových seriálů na
 * IT sociální síti WWW.ITNETWORK.CZ
 *
 * Kód spadá pod licenci prémiového obsahu a vznikl díky podpoře
 * našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
 * Více informací na http://www.itnetwork.cz/licence
 */

import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import PersonIndex from "./persons/PersonIndex";
import PersonDetail from "./persons/PersonDetail";
import PersonForm from "./persons/PersonForm";

import InvoiceIndex from "./invoices/InvoiceIndex";
import InvoiceDetail from "./invoices/InvoiceDetail";
import InvoiceForm from "./invoices/InvoiceForm";

import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";
import { AuthProvider, AuthContext } from "./utils/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";

// main application component - defines routing and layout
export function App() {
  // return application with routing and protected pages
  return (
    <AuthProvider>
      <Router>
        <div className="container">
          {/* navigation bar */}
          <nav className="navbar navbar-expand-lg navbar-light bg-light rounded 6">
            <ul className="navbar-nav mr-auto">
              {/* link to dashboard */}
              <li className="nav-item">
                <Link to={"/dashboard"} className="nav-link">
                  Statistiky
                </Link>
              </li>
              {/* link to persons list */}
              <li className="nav-item">
                <Link to={"/persons"} className="nav-link">
                  Osoby
                </Link>
              </li>
              {/* link to invoices list */}
              <li className="nav-item">
                <Link to={"/invoices"} className="nav-link">
                  Faktury
                </Link>
              </li>
            </ul>
            {/* logout button */}
            <AuthLogout />
          </nav>

          {/* define routes */}
          <Routes>
            {/* public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* redirect from root to dashboard */}
            <Route
              index
              element={
                <ProtectedRoute>
                  <Navigate to={"/dashboard"} />
                </ProtectedRoute>
              }
            />
            {/* dashboard with statistics */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            {/* routes for persons */}
            <Route
              path="/persons"
              element={
                <ProtectedRoute>
                  <PersonIndex />
                </ProtectedRoute>
              }
            />
            <Route
              path="/persons/show/:id"
              element={
                <ProtectedRoute>
                  <PersonDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/persons/create"
              element={
                <ProtectedRoute>
                  <PersonForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/persons/edit/:id"
              element={
                <ProtectedRoute>
                  <PersonForm />
                </ProtectedRoute>
              }
            />
            {/* routes for invoices */}
            <Route
              path="/invoices"
              element={
                <ProtectedRoute>
                  <InvoiceIndex />
                </ProtectedRoute>
              }
            />
            <Route
              path="/invoices/show/:id"
              element={
                <ProtectedRoute>
                  <InvoiceDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/invoices/create"
              element={
                <ProtectedRoute>
                  <InvoiceForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/invoices/edit/:id"
              element={
                <ProtectedRoute>
                  <InvoiceForm />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

// component for user logout
function AuthLogout() {
  // get authentication state from context
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  // render logout button if user is logged in
  return (
    <div className="ms-auto d-flex align-items-center">
      {isAuthenticated && user ? (
        <>
          {/* display user email */}
          <span className="me-3 text-muted">{user.email}</span>
          {/* logout button */}
          <button
            className="btn btn-sm btn-outline-danger me-2"
            onClick={() => {
              logout();
              window.location.href = "/login";
            }}
          >
            Odhlásit
          </button>
        </>
      ) : (
        <span className="me-3 text-muted">Přihlášen</span>
      )}
    </div>
  );
}

// export main application component
export default App;
