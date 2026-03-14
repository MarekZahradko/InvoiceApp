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

import PersonTable from "./PersonTable";
import PersonStatistics from "./PersonStatistics";

// list of all persons with statistics
const PersonIndex = () => {
    // list of persons
    const [persons, setPersons] = useState([]);

    // function to delete person
    const deletePerson = async (id) => {
        try {
            await apiDelete("/api/persons/" + id);
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
        // remove person from list
        setPersons(persons.filter((item) => item._id !== id));
    };

    // load persons on initialization
    useEffect(() => {
        apiGet("/api/persons").then((data) => setPersons(data));
    }, []);

    // render list of persons
    return (
        <div>
            <h1>Seznam osob</h1>
            <PersonTable
                deletePerson={deletePerson}
                items={persons}
                label="Počet osob:"
            />
           
        </div>
    );
};
// export PersonIndex component
export default PersonIndex;
