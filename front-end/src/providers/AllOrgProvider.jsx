import React, { useState, useEffect, createContext } from "react";

export const AllOrgContext = createContext(null);

function AllOrgProvider({ children }) {
    const [orgs, setOrgs] = useState([])

    // load organizations onto home page (see bottom of page)
    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_URL + '/organizations', { method: 'GET', mode: 'cors', redirect: 'follow' })
            .then(response => response.json())
            .then(data => setOrgs(data))
            .catch(error => {
                console.error('There was an error fetching all the orgs', error);
            });
    }, [])

    console.log("in allorgprovider neha")
    console.log(orgs)

    return (
        <AllOrgContext.Provider value={orgs}>
            {children}
        </AllOrgContext.Provider>
    );
}
export default AllOrgProvider;