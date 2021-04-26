import { useRouteMatch, Switch, Route, Redirect, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { UserContext } from "../../providers/UserProvider";
import CreateEvent from './CreateEvent';
import EditProfile from "./EditProfile";
import EditEvents from "./EditEvents";
import HelpPage from "./HelpPage";
import NotFound from "../NotFound";

// How long we wait for user's login credentials
const FALLBACK_DELAY = 500

// Handles routing and security for the Admin Panel
// The main function of the Admin Router is to ensure that anyone accessing the admin panel is logged in!
export default function AdminRouter() {
    let match = useRouteMatch();
    let location = useLocation();
    const [delayed, setDelayed] = useState(false);

    // We want to delay the redirection back to login page for 0.5s 
    // This allows for a better UX in cases where the person is logged in but Firebase Auth is lagging
    useEffect(() => {
        const timeout = setTimeout(() => setDelayed(true), FALLBACK_DELAY);
        return () => clearTimeout(timeout);
    }, []);

    const { user } = useContext(UserContext);
    // if we have waited an appropriate amount of time AND the user is still not authenticated
    // then redirect them to the login page and display an error
    // we also send the original route the user was trying to access as the redirectRoute for better UX
    if (delayed && user == null) {
        return <Redirect to={{ pathname: "/login", state: { redirectRoute: `${location.pathname}`, displayError: (location.pathname != null && location.pathname !== '' && delayed) } }} />
    }
    return (
        <Switch>
            <Route path={`${match.path}`} exact component={EditProfile} />
            <Route path={`${match.path}/profile`} exact component={EditProfile} />
            <Route path={`${match.path}/events`} exact component={EditEvents} />
            <Route path={`${match.path}/help`} exact component={HelpPage} />
            <Route path={`${match.path}/create`} exact component={CreateEvent} />
            <Route component={NotFound} />
        </Switch>
    )
}