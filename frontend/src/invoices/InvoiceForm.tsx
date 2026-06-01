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
import {Invoice, Person} from "../types";

import InputField from "../components/InputField";
import InputSelect from "../components/InputSelect";
import FlashMessage from "../components/FlashMessage";

interface InvoiceFormState {
    invoiceNumber: string;
    seller: string;
    buyer: string;
    issued: string;
    dueDate: string;
    product: string;
    price: string;
    vat: string;
    note: string;
}

// form for creating and editing invoice
const InvoiceForm = () => {
    // hook for navigation between pages
    const navigate = useNavigate();
    // invoice ID from URL parameters
    const {id} = useParams();
    // list of persons to select seller and buyer
    const [persons, setPersons] = useState<Person[]>([]);
    // invoice data
    const [invoice, setInvoice] = useState<InvoiceFormState>({
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
    const [errorState, setError] = useState<string | null>(null);

    // load list of persons on initialization
    useEffect(() => {
        apiGet("/api/persons").then((data) => setPersons(data as Person[]));
    }, []);

    // load invoice from API if editing
    useEffect(() => {
        if (id) {
            apiGet("/api/invoices/" + id).then((data) => {
                const d = data as Invoice;
                setInvoice({
                    invoiceNumber: d.invoiceNumber,
                    product: d.product,
                    note: d.note,
                    issued: dateStringFormatter(d.issued),
                    dueDate: dateStringFormatter(d.dueDate),
                    seller: String((d.seller as Person)?._id ?? ""),
                    buyer: String((d.buyer as Person)?._id ?? ""),
                    price: String(d.price),
                    vat: String(d.vat),
                });
            });
        }
    }, [id]);

    // handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
            .then(() => {
                setSent(true);
                setSuccess(true);
                navigate("/invoices");
            })
            .catch((error: Error) => {
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
                    prompt=""
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
                    prompt=""
                    value={invoice.dueDate}
                    handleChange={(e) => {
                        setInvoice({...invoice, dueDate: e.target.value});
                    }}
                />

                <InputField
                    type="text"
                    name="note"
                    label="Poznámka"
                    prompt=""
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
