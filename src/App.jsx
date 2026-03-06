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

export function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/dashboard"} className="nav-link">
                  Statistics
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/persons"} className="nav-link">
                  Persons
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/invoices"} className="nav-link">
                  Invoices
                </Link>
              </li>
            </ul>
            <AuthLogout />
          </nav>

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Navigate to={"/dashboard"} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
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

function AuthLogout() {
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  return (
    <div className="ms-auto d-flex align-items-center">
      {isAuthenticated && user ? (
        <>
          <span className="me-3 text-muted">{user.email}</span>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => {
              logout();
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <span className="me-3 text-muted">Logged in</span>
      )}
    </div>
  );
}

export default App;
