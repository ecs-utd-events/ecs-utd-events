import { useRouteMatch, Switch, Route } from "react-router-dom";
import NotFound from "./NotFound";

import OrgProfile from './OrgProfile';

// This functional component handles the routing for org profile pages
// Though we fall back to the 404 page (NotFound component) this router doesn't actually solve the issue
// of when we have an invalid orgSlug in the URL!
export default function OrgProfileRouter() {
    let match = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${match.path}/:orgSlug`}>
                <OrgProfile />
            </Route>
            <Route exact path={match.path}>
                <div>
                    <h2>There must be an organization name at the end of the URL!</h2>
                </div>
            </Route>
            <Route component={NotFound} />
        </Switch>
    )
}