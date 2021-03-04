import { useRouteMatch, Switch, Route, Redirect, useLocation } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../../providers/UserProvider";
import CreateEvent from './CreateEvent';
import EditProfile from "./EditProfile";
import EditEvents from "./EditEvents";
import HelpPage from "./HelpPage";

export default function AdminRouter() {
    let match = useRouteMatch();
    let location = useLocation();

    const { user } = useContext(UserContext);
    if (user == null) {
        return <Redirect to={{ pathname: "/login", state: { redirectRoute: `${location.pathname}` } }} />
    }
    return (
        <Switch>
            <Route path={`${match.path}/profile`} component={EditProfile} />
            <Route path={`${match.path}/events`} component={EditEvents} />
            <Route path={`${match.path}/help`} component={HelpPage} />
            <Route path={`${match.path}/create`} component={CreateEvent} />
        </Switch>
    )
}