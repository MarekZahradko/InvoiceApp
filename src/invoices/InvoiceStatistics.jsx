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

import {apiGet} from "../utils/api";

const InvoiceStatistics = () => {
    const [stats, setStats] = useState({});

    useEffect(() => {
        apiGet("/api/invoices/statistics").then((data) => setStats(data));
    }, []);

    return (
        <div className="row mt-4">
            <div className="col-md-4">
                <div className="card">
                    <div className="card-header">
                        <h6>Počet faktur</h6>
                    </div>
                    <div className="card-body">
                        <h3 className="text-center">{stats.invoicesCount || 0}</h3>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card">
                    <div className="card-header">
                        <h6>Součet letošního roku</h6>
                    </div>
                    <div className="card-body">
                        <h3 className="text-center">
                            {stats.currentYearSum ? stats.currentYearSum.toLocaleString('cs-CZ') : 0} Kč
                        </h3>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card">
                    <div className="card-header">
                        <h6>Součet všech dob</h6>
                    </div>
                    <div className="card-body">
                        <h3 className="text-center">
                            {stats.allTimeSum ? stats.allTimeSum.toLocaleString('cs-CZ') : 0} Kč
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceStatistics;
