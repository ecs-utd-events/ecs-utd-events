import { useRouteMatch, Switch, Route } from "react-router-dom";

import OrgProfile from './OrgProfile';


export default function OrgProfileRouter() {
    let match = useRouteMatch();
    // location state param passes the list of organizations to each individual org page 
    // so we don't have to re-fetch in the majority of cases.

    return (
        <Switch>
            <Route path={`${match.path}/:orgSlug`}>
                <OrgProfile />
            </Route>
            <Route path={match.path}>
                <div>
                    <h2>There must be an organization name at the end of the URL!</h2>
                </div>
            </Route>
        </Switch>
    )
}