import React, { useState, useEffect, createContext } from "react";
import { auth } from '../firebase';

export const UserContext = createContext(null);

function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const [org, setOrg] = useState(null);
    useEffect(() => {
        auth.onAuthStateChanged(userAuth => {
            setUser(userAuth);
        })
    }, [])
    console.log(process.env.REACT_APP_SERVER_URL)
    useEffect(() => {
        if (user) {
            fetch((process.env.REACT_APP_SERVER_URL || 'http://localhost:80') + '/api/orgs/' + user.uid)
                .then(response => response.json())
                .then(data => setOrg(data))
                .catch(error => {
                    console.error('There was an error fetching the Org from user uid!', error);
                });
        }
    }, [user])

    const contextValue = {
        user,
        org
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}
export default UserProvider;