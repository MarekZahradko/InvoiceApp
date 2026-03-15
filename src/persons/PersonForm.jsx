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

import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {apiGet, apiPost, apiPut} from "../utils/api";

import InputField from "../components/InputField";
import InputCheck from "../components/InputCheck";
import FlashMessage from "../components/FlashMessage";

import Country from "./Country";

// form for creating and editing person
const PersonForm = () => {
    // hook for navigation between pages
    const navigate = useNavigate();
    // person ID from URL parameters
    const {id} = useParams();
    // person data
    const [person, setPerson] = useState({
        name: "",
        identificationNumber: "",
        taxNumber: "",
        accountNumber: "",
        bankCode: "",
        iban: "",
        telephone: "",
        mail: "",
        street: "",
        zip: "",
        city: "",
        country: Country.CZECHIA,
        note: ""
    });
    // state of form submission
    const [sentState, setSent] = useState(false);
    // state of submission success
    const [successState, setSuccess] = useState(false);
    // error message
    const [errorState, setError] = useState(null);

    // load person from API if editing
    useEffect(() => {
        if (id) {
            apiGet("/api/persons/" + id).then((data) => setPerson(data));
        }
    }, [id]);

    // Triggered when the user leaves the IČO field (onBlur event).
    // If the IČO is exactly 8 digits, calls the ARES API to fetch company data
    // and pre-fills the form fields with the returned values.
    // Already filled fields are kept if ARES returns nothing for that field.
    const handleIcoBlur = () => {
        const ico = person.identificationNumber;
        // ARES requires exactly 8 digits – skip the lookup if the input is incomplete
        if (!ico || ico.length !== 8) return;

        apiGet("/api/ares/" + ico).then((data) => {
            if (data) {
                // merge ARES data into the current person state,
                // keeping existing values as fallback if ARES field is empty
                setPerson((prev) => ({
                    ...prev,
                    name: data.name || prev.name,
                    taxNumber: data.taxNumber || prev.taxNumber,
                    street: data.street || prev.street,
                    zip: data.zip || prev.zip,
                    city: data.city || prev.city,
                }));
            }
        }).catch(() => {
            // IČO not found in ARES – silently ignore, user can fill in manually
        });
    };

    // handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // send to API
        (id ? apiPut("/api/persons/" + id, person) : apiPost("/api/persons", person))
            .then((data) => {
                setSent(true);
                setSuccess(true);
                navigate("/persons");
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
                setSent(true);
                setSuccess(false);
            });
    };

    // shorten state names for JSX
    const sent = sentState;
    const success = successState;

    // render form
    return (
        <div>
            <h1>{id ? "Upravit" : "Vytvořit"} osobnost</h1>
            <hr/>
            {errorState ? (
                <div className="alert alert-danger">{errorState}</div>
            ) : null}
            {sent && (
                <FlashMessage
                    theme={success ? "success" : ""}
                    text={success ? "Uložení osobnosti proběhlo úspěšně." : ""}
                />
            )}
            <form onSubmit={handleSubmit}>
                <InputField
                    required={true}
                    type="text"
                    name="personName"
                    min="3"
                    label="Jméno"
                    prompt="Zadejte celé jméno"
                    value={person.name}
                    handleChange={(e) => {
                        setPerson({...person, name: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="identificationNumber"
                    min="3"
                    label="IČO"
                    prompt="Zadejte IČO"
                    value={person.identificationNumber}
                    handleChange={(e) => {
                        setPerson({...person, identificationNumber: e.target.value});
                    }}
                    onBlur={handleIcoBlur} // trigger ARES lookup when user leaves the field
                />

                <InputField
                    required={true}
                    type="text"
                    name="taxNumber"
                    min="3"
                    label="DIČ"
                    prompt="Zadejte DIČ"
                    value={person.taxNumber}
                    handleChange={(e) => {
                        setPerson({...person, taxNumber: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="accountNumber"
                    min="3"
                    label="Číslo bankovního účtu"
                    prompt="Zadejte číslo bankovního účtu"
                    value={person.accountNumber}
                    handleChange={(e) => {
                        setPerson({...person, accountNumber: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="bankCode"
                    min="3"
                    label="Kód banky"
                    prompt="Zadejte kód banky"
                    value={person.bankCode}
                    handleChange={(e) => {
                        setPerson({...person, bankCode: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="IBAN"
                    min="3"
                    label="IBAN"
                    prompt="Zadejte IBAN"
                    value={person.iban}
                    handleChange={(e) => {
                        setPerson({...person, iban: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="telephone"
                    min="3"
                    label="Telefon"
                    prompt="Zadejte Telefon"
                    value={person.telephone}
                    handleChange={(e) => {
                        setPerson({...person, telephone: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="mail"
                    min="3"
                    label="Mail"
                    prompt="Zadejte mail"
                    value={person.mail}
                    handleChange={(e) => {
                        setPerson({...person, mail: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="street"
                    min="3"
                    label="Ulice"
                    prompt="Zadejte ulici"
                    value={person.street}
                    handleChange={(e) => {
                        setPerson({...person, street: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="ZIP"
                    min="3"
                    label="PSČ"
                    prompt="Zadejte PSČ"
                    value={person.zip}
                    handleChange={(e) => {
                        setPerson({...person, zip: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="city"
                    min="3"
                    label="Město"
                    prompt="Zadejte město"
                    value={person.city}
                    handleChange={(e) => {
                        setPerson({...person, city: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="note"
                    label="Poznámka"
                    value={person.note}
                    handleChange={(e) => {
                        setPerson({...person, note: e.target.value});
                    }}
                />

                <h6>Země:</h6>

                <InputCheck
                    type="radio"
                    name="country"
                    label="Česká republika"
                    value={Country.CZECHIA}
                    handleChange={(e) => {
                        setPerson({...person, country: e.target.value});
                    }}
                    checked={Country.CZECHIA === person.country}
                />

                <InputCheck
                    type="radio"
                    name="country"
                    label="Slovensko"
                    value={Country.SLOVAKIA}
                    handleChange={(e) => {
                        setPerson({...person, country: e.target.value});
                    }}
                    checked={Country.SLOVAKIA === person.country}
                />

                <input type="submit" className="btn btn-primary" value="Uložit"/>
              
            </form>
        </div>
    );
};

export default PersonForm;
