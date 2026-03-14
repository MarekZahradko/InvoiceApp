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
import {Link} from "react-router-dom";

import {apiGet, apiGetExcel} from "../utils/api";

// statistics - sales for individual persons
const PersonStatistics = () => {
    // list of statistics
    const [stats, setStats] = useState([]);

    // load statistics from API
    useEffect(() => {
        apiGet("/api/persons/statistics").then((data) => setStats(data));
    }, []);

    // download statistics as Excel file
    const handleExcelExport = () => {
        apiGetExcel("/api/statistics/export/excel").then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "statistiky.xlsx";
            a.click();
            window.URL.revokeObjectURL(url);
        });
    };

    // render statistics in table
    return (
        <div className="card mt-4">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Tržby jednotlivých osob</h5>
                <button className="btn btn-success btn-sm" onClick={handleExcelExport}>
                    Export do Excelu
                </button>
            </div>
            <div className="card-body">
                {/* display table if data exists */}
                {stats.length > 0 ? (
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>IČO</th>
                            <th>Osoba</th>
                            <th className="text-end">Tržby (Kč)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* render rows for each person */}
                        {stats.map((stat) => (
                            <tr key={stat.identificationNumber}>
                                <td>{stat.identificationNumber}</td>
                                <td><Link to={`/persons/show/${stat.personId}`}>{stat.personName}</Link></td>
                                <td className="text-end">{stat.revenue ? stat.revenue.toLocaleString('cs-CZ') : 0}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-muted">Žádné dostupné údaje</p>
                )}
            </div>
        </div>
    );
};

// export PersonStatistics component
export default PersonStatistics;
