import { useRouteMatch, Switch, Route, Redirect, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { UserContext } from "../../providers/UserProvider";
import CreateEvent from './CreateEvent';
import EditProfile from "./EditProfile";
import EditEvents from "./EditEvents";
import HelpPage from "./HelpPage";
import NotFound from "../NotFound";

const FALLBACK_DELAY = 500

export default function AdminRouter() {
    let match = useRouteMatch();
    let location = useLocation();
    const [delayed, setDelayed] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setDelayed(true), FALLBACK_DELAY);
        return () => clearTimeout(timeout);
    }, []);

    const { user } = useContext(UserContext);
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