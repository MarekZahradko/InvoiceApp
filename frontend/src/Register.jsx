/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __| |_ \ V  V / (_) | |  |   < | (__ / /
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

import React, {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "./utils/AuthContext";

import InputField from "./components/InputField";
import FlashMessage from "./components/FlashMessage";

const Register = () => {
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        passwordConfirm: ""
    });
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (credentials.password !== credentials.passwordConfirm) {
            setError("Hesla se neshodují");
            setSent(true);
            setSuccess(false);
            return;
        }

        fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Registrace se nezdařila");
                }
                return response.json();
            })
            .then((data) => {
                setSent(true);
                setSuccess(true);
                login(data.token, {email: data.email});
                setTimeout(() => navigate("/dashboard"), 1500);
            })
            .catch((error) => {
                setSent(true);
                setSuccess(false);
                setError(error.message || "Chyba při registraci");
            });
    };

    const sent = sentState;
    const success = successState;

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3>Registrace</h3>
                        </div>
                        <div className="card-body">
                            {errorState && (
                                <div className="alert alert-danger">{errorState}</div>
                            )}
                            {sent && (
                                <FlashMessage
                                    theme={success ? "success" : ""}
                                    text={success ? "Registrace byla úspěšná!" : ""}
                                />
                            )}
                            <form onSubmit={handleSubmit}>
                                <InputField
                                    required={true}
                                    type="text"
                                    name="email"
                                    label="Email"
                                    prompt="Zadejte email"
                                    value={credentials.email}
                                    handleChange={(e) => setCredentials({...credentials, email: e.target.value})}
                                />

                                <InputField
                                    required={true}
                                    type="password"
                                    name="password"
                                    label="Heslo"
                                    prompt="Zadejte heslo"
                                    value={credentials.password}
                                    handleChange={(e) => setCredentials({...credentials, password: e.target.value})}
                                />

                                <InputField
                                    required={true}
                                    type="password"
                                    name="passwordConfirm"
                                    label="Potvrzení hesla"
                                    prompt="Potvrzení hesla"
                                    value={credentials.passwordConfirm}
                                    handleChange={(e) => setCredentials({...credentials, passwordConfirm: e.target.value})}
                                />

                                <button type="submit" className="btn btn-primary w-100">
                                    Registrovat se
                                </button>
                            </form>
                            <hr/>
                            <p className="text-center">
                                Již máte účet? <a href="/login">Přihlaste se zde</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
