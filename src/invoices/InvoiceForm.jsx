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
import {dateStringFormatter} from "../utils/dateStringFormatter";

import InputField from "../components/InputField";
import InputSelect from "../components/InputSelect";
import FlashMessage from "../components/FlashMessage";

// form for creating and editing invoice
const InvoiceForm = () => {
    // hook for navigation between pages
    const navigate = useNavigate();
    // invoice ID from URL parameters
    const {id} = useParams();
    // list of persons to select seller and buyer
    const [persons, setPersons] = useState([]);
    // invoice data
    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        seller: "",
        buyer: "",
        issued: "",
        dueDate: "",
        product: "",
        price: "",
        vat: "21",
        note: ""
    });
    // state of form submission
    const [sentState, setSent] = useState(false);
    // state of submission success
    const [successState, setSuccess] = useState(false);
    // error message
    const [errorState, setError] = useState(null);

    // load list of persons on initialization
    useEffect(() => {
        apiGet("/api/persons").then((data) => setPersons(data));
    }, []);

    // load invoice from API if editing
    useEffect(() => {
        if (id) {
            apiGet("/api/invoices/" + id).then((data) => {
                setInvoice({
                    ...data,
                    issued: dateStringFormatter(data.issued),
                    dueDate: dateStringFormatter(data.dueDate),
                    seller: data.seller?._id,
                    buyer: data.buyer?._id
                });
            });
        }
    }, [id]);

    // handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // prepare data for submission - transform objects and numbers
        const invoiceData = {
            ...invoice,
            seller: {_id: invoice.seller},
            buyer: {_id: invoice.buyer},
            price: parseFloat(invoice.price),
            vat: parseFloat(invoice.vat)
        };

        // send to API
        (id ? apiPut("/api/invoices/" + id, invoiceData) : apiPost("/api/invoices", invoiceData))
            .then((data) => {
                setSent(true);
                setSuccess(true);
                navigate("/invoices");
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
            <h1>{id ? "Upravit" : "Vytvořit"} fakturu</h1>
            <hr/>
            {errorState ? (
                <div className="alert alert-danger">{errorState}</div>
            ) : null}
            {sent && (
                <FlashMessage
                    theme={success ? "success" : ""}
                    text={success ? "Uložení faktury proběhlo úspěšně." : ""}
                />
            )}
            <form onSubmit={handleSubmit}>
                <InputField
                    required={true}
                    type="text"
                    name="invoiceNumber"
                    label="Číslo faktury"
                    prompt="Zadejte číslo faktury"
                    value={invoice.invoiceNumber}
                    handleChange={(e) => {
                        setInvoice({...invoice, invoiceNumber: e.target.value});
                    }}
                />

                <InputSelect
                    required={true}
                    name="seller"
                    label="Prodávající"
                    prompt="Vyberte prodávajícího"
                    value={invoice.seller}
                    items={persons}
                    handleChange={(e) => {
                        setInvoice({...invoice, seller: e.target.value});
                    }}
                />

                <InputSelect
                    required={true}
                    name="buyer"
                    label="Kupující"
                    prompt="Vyberte kupujícího"
                    value={invoice.buyer}
                    items={persons}
                    handleChange={(e) => {
                        setInvoice({...invoice, buyer: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="product"
                    label="Popis produktu"
                    prompt="Zadejte popis"
                    value={invoice.product}
                    handleChange={(e) => {
                        setInvoice({...invoice, product: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="number"
                    name="price"
                    label="Cena"
                    prompt="Zadejte cenu"
                    value={invoice.price}
                    handleChange={(e) => {
                        setInvoice({...invoice, price: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="number"
                    name="vat"
                    label="DPH (%)"
                    prompt="Zadejte DPH"
                    value={invoice.vat}
                    handleChange={(e) => {
                        setInvoice({...invoice, vat: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="date"
                    name="issued"
                    label="Vystaveno"
                    value={invoice.issued}
                    handleChange={(e) => {
                        setInvoice({...invoice, issued: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="date"
                    name="dueDate"
                    label="Splatnost"
                    value={invoice.dueDate}
                    handleChange={(e) => {
                        setInvoice({...invoice, dueDate: e.target.value});
                    }}
                />

                <InputField
                    type="text"
                    name="note"
                    label="Poznámka"
                    value={invoice.note}
                    handleChange={(e) => {
                        setInvoice({...invoice, note: e.target.value});
                    }}
                />

                <input type="submit" className="btn btn-primary" value="Uložit"/>
            </form>
        </div>
    );
};

// export InvoiceForm component
export default InvoiceForm;
