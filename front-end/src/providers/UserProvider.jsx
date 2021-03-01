import React, { useState, useEffect, createContext } from "react";
import { auth } from '../firebase';

export const UserContext = createContext({ user: null });

function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    useEffect(() => {
        auth.onAuthStateChanged(userAuth => {
            if (userAuth != null) {
                fetch((process.env.REACT_APP_SERVER_URL || 'http://localhost:80') + '/api/orgs/' + userAuth.uid)
                    .then(response => response.json())
                    .then(data => setUser({ ...userAuth, ...data }))
                    .catch(error => {
                        console.error('There was an error fetching org info for user: ' + userAuth.uid, error);
                    });
            } else {
                setUser(userAuth);
            }
        })
    })

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}
export default UserProvider;