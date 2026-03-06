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

import {apiDelete, apiGet} from "../utils/api";
import InputField from "../components/InputField";

import InvoiceTable from "./InvoiceTable";

// list with filter and display all invoices
const InvoiceIndex = () => {
    // list of invoices
    const [invoices, setInvoices] = useState([]);
    // filter for search
    const [filter, setFilter] = useState({
        product: "",
        minPrice: "",
        maxPrice: "",
        limit: ""
    });

    // function to delete invoice
    const deleteInvoice = async (id) => {
        try {
            await apiDelete("/api/invoices/" + id);
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
        // remove invoice from list
        setInvoices(invoices.filter((item) => item._id !== id));
    };

    // function to load invoices with filter
    const loadInvoices = () => {
        apiGet("/api/invoices", filter).then((data) => setInvoices(data));
    };

    // load invoices on initialization
    useEffect(() => {
        loadInvoices();
    }, []);

    // update filter value
    const handleFilter = (e) => {
        const {name, value} = e.target;
        setFilter({...filter, [name]: value});
    };

    // submit filter
    const handleFilterSubmit = (e) => {
        e.preventDefault();
        loadInvoices();
    };

    // render list
    return (
        <div>
            <h1>Seznam faktur</h1>
            <hr/>
            <h5>Filtrování:</h5>
            <form onSubmit={handleFilterSubmit} className="mb-3">
                <div className="row">
                    <div className="col-md-3">
                        <InputField
                            type="text"
                            name="product"
                            label="Produkt"
                            prompt="Filtr"
                            value={filter.product}
                            handleChange={handleFilter}
                        />
                    </div>
                    <div className="col-md-2">
                        <InputField
                            type="number"
                            name="minPrice"
                            label="Cena od"
                            prompt="Od"
                            value={filter.minPrice}
                            handleChange={handleFilter}
                        />
                    </div>
                    <div className="col-md-2">
                        <InputField
                            type="number"
                            name="maxPrice"
                            label="Cena do"
                            prompt="Do"
                            value={filter.maxPrice}
                            handleChange={handleFilter}
                        />
                    </div>
                    <div className="col-md-2">
                        <InputField
                            type="number"
                            name="limit"
                            label="Limit"
                            prompt="Počet"
                            value={filter.limit}
                            handleChange={handleFilter}
                        />
                    </div>
                    <div className="col-md-3" style={{paddingTop: "32px"}}>
                        <button type="submit" className="btn btn-primary">Filtrovat</button>
                        <button type="button" className="btn btn-secondary ms-2" onClick={() => {
                            setFilter({product: "", minPrice: "", maxPrice: "", limit: ""});
                            setInvoices([]);
                        }}>Vyčistit</button>
                    </div>
                </div>
            </form>
            <hr/>
            <InvoiceTable
                deleteInvoice={deleteInvoice}
                items={invoices}
                label="Počet faktur:"
            />
        </div>
    );
};
// export InvoiceIndex component
export default InvoiceIndex;
