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

import React, {createContext, useState, useEffect} from "react";

// create context for authentication
export const AuthContext = createContext();

// provider for authentication context
export const AuthProvider = ({children}) => {
    // authentication state
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // state for loading data from storage
    const [loading, setLoading] = useState(true);
    // state for user data
    const [user, setUser] = useState(null);

    // check authentication on component load
    useEffect(() => {
        // load token and data from local storage
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('user');
        console.log("AuthContext init:", {token, userData});
        // set state if token exists
        if (token) {
            setIsAuthenticated(true);
            if (userData) {
                setUser(JSON.parse(userData));
            }
        }
        setLoading(false);
    }, []);

    // function to login user
    const login = (token, userData) => {
        console.log("Login called with:", {token, userData});
        // save token and data to local storage
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(userData));
        // set authentication state
        setIsAuthenticated(true);
        setUser(userData);
    };

    // function to logout user
    const logout = () => {
        // delete token and data from local storage
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        // reset authentication state
        setIsAuthenticated(false);
        setUser(null);
    };

    // return provider with context values
    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, loading, user}}>
            {children}
        </AuthContext.Provider>
    );
};
