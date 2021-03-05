import React, { useState, useEffect, createContext } from "react";

export const AllOrgContext = createContext(null);

function AllOrgProvider({ children }) {
    const [orgs, setOrgs] = useState([])

    useEffect(() => {
        fetch((process.env.REACT_APP_SERVER_URL || 'http://localhost:80') + '/api/orgs/all')
            .then(response => response.json())
            .then(data => setOrgs(data))
            .catch(error => {
                console.error('There was an error fetching all the orgs', error);
            });
    }, [])

    return (
        <AllOrgContext.Provider value={orgs}>
            {children}
        </AllOrgContext.Provider>
    );
}
export default AllOrgProvider;