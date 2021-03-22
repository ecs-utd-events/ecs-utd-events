import { useRouteMatch, Switch, Route } from "react-router-dom";
import NotFound from "./NotFound";

import OrgProfile from './OrgProfile';


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