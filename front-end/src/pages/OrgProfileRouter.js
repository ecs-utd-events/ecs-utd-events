import { useRouteMatch, Switch, Route } from "react-router-dom";

import OrgProfile from './OrgProfile';


export default function OrgProfileRouter() {
    let match = useRouteMatch();
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