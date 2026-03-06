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
import {useParams, Link} from "react-router-dom";

import {apiGet} from "../utils/api";
import {dateStringFormatter} from "../utils/dateStringFormatter";

// invoice detail with VAT price calculation
const InvoiceDetail = () => {
    // invoice ID from URL
    const {id} = useParams();
    // invoice data
    const [invoice, setInvoice] = useState({});

    // load invoice from API
    useEffect(() => {
        apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
    }, [id]);

    // calculate price with VAT
    const totalPrice = invoice.price ? invoice.price + (invoice.price * invoice.vat) / 100 : 0;

    // render invoice detail
    return (
        <div>
            <h1>Detail faktury</h1>
            <hr/>
            <h3>Faktura č. {invoice.invoiceNumber}</h3>
            <p>
                <strong>Prodávající:</strong>
                <br/>
                {invoice.seller?._id ? (
                    <Link to={"/persons/show/" + invoice.seller._id}>
                        {invoice.seller.name}
                    </Link>
                ) : (
                    invoice.seller?.name
                )}
            </p>
            <p>
                <strong>Kupující:</strong>
                <br/>
                {invoice.buyer?._id ? (
                    <Link to={"/persons/show/" + invoice.buyer._id}>
                        {invoice.buyer.name}
                    </Link>
                ) : (
                    invoice.buyer?.name
                )}
            </p>
            <p>
                <strong>Popis:</strong>
                <br/>
                {invoice.product}
            </p>
            <p>
                <strong>Základní cena:</strong>
                <br/>
                {invoice.price} Kč
            </p>
            <p>
                <strong>DPH:</strong>
                <br/>
                {invoice.vat} %
            </p>
            <p>
                <strong>Cena s DPH:</strong>
                <br/>
                {totalPrice.toFixed(2)} Kč
            </p>
            <p>
                <strong>Vystaveno:</strong>
                <br/>
                {dateStringFormatter(invoice.issued, true)}
            </p>
            <p>
                <strong>Splatnost:</strong>
                <br/>
                {dateStringFormatter(invoice.dueDate, true)}
            </p>
            <p>
                <strong>Poznámka:</strong>
                <br/>
                {invoice.note}
            </p>
        </div>
    );
};
// export InvoiceDetail component
export default InvoiceDetail;
