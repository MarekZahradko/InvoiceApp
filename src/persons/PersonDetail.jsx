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

import Country from "./Country";

const PersonDetail = () => {
    const {id} = useParams();
    const [person, setPerson] = useState({});
    const [sales, setSales] = useState([]);
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        apiGet("/api/persons/" + id).then((data) => setPerson(data));
    }, [id]);

    useEffect(() => {
        if (person.identificationNumber) {
            apiGet("/api/identification/" + person.identificationNumber + "/sales").then((data) => setSales(data)).catch(() => setSales([]));
            apiGet("/api/identification/" + person.identificationNumber + "/purchases").then((data) => setPurchases(data)).catch(() => setPurchases([]));
        }
    }, [person.identificationNumber]);

    const country = Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";

    return (
        <div>
            <div>
                <h1>Detail osoby</h1>
                <hr/>
                <h3>{person.name} ({person.identificationNumber})</h3>
                <p>
                    <strong>DIČ:</strong>
                    <br/>
                    {person.taxNumber}
                </p>
                <p>
                    <strong>Bankovní účet:</strong>
                    <br/>
                    {person.accountNumber}/{person.bankCode} ({person.iban})
                </p>
                <p>
                    <strong>Tel.:</strong>
                    <br/>
                    {person.telephone}
                </p>
                <p>
                    <strong>Mail:</strong>
                    <br/>
                    {person.mail}
                </p>
                <p>
                    <strong>Sídlo:</strong>
                    <br/>
                    {person.street}, {person.city}, {person.zip}, {country}
                </p>
                <p>
                    <strong>Poznámka:</strong>
                    <br/>
                    {person.note}
                </p>
                <hr/>
                <h4>Vydané faktury ({sales.length})</h4>
                {sales.length > 0 ? (
                    <table className="table table-sm table-bordered">
                        <thead>
                        <tr>
                            <th>Číslo</th>
                            <th>Kupující</th>
                            <th>Cena</th>
                            <th>Vystaveno</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sales.map((invoice) => (
                            <tr key={invoice._id}>
                                <td>
                                    <Link to={"/invoices/show/" + invoice._id} className="text-decoration-none">
                                        {invoice.invoiceNumber}
                                    </Link>
                                </td>
                                <td>
                                    {invoice.buyer?._id ? (
                                        <Link to={"/persons/show/" + invoice.buyer._id} className="text-decoration-none">
                                            {invoice.buyer.name}
                                        </Link>
                                    ) : (
                                        invoice.buyer?.name
                                    )}
                                </td>
                                <td>{invoice.price} Kč</td>
                                <td>{dateStringFormatter(invoice.issued, true)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-muted">Žádné vydané faktury</p>
                )}
                <hr/>
                <h4>Přijaté faktury ({purchases.length})</h4>
                {purchases.length > 0 ? (
                    <table className="table table-sm table-bordered">
                        <thead>
                        <tr>
                            <th>Číslo</th>
                            <th>Prodávající</th>
                            <th>Cena</th>
                            <th>Vystaveno</th>
                        </tr>
                        </thead>
                        <tbody>
                        {purchases.map((invoice) => (
                            <tr key={invoice._id}>
                                <td>
                                    <Link to={"/invoices/show/" + invoice._id} className="text-decoration-none">
                                        {invoice.invoiceNumber}
                                    </Link>
                                </td>
                                <td>
                                    {invoice.seller?._id ? (
                                        <Link to={"/persons/show/" + invoice.seller._id} className="text-decoration-none">
                                            {invoice.seller.name}
                                        </Link>
                                    ) : (
                                        invoice.seller?.name
                                    )}
                                </td>
                                <td>{invoice.price} Kč</td>
                                <td>{dateStringFormatter(invoice.issued, true)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-muted">Žádné koupené faktury</p>
                )}
            </div>
        </div>
    );
};

export default PersonDetail;