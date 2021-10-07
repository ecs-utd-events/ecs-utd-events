import { useRouteMatch, Switch, Route } from "react-router-dom";
import TagTester from "./TagTester";

export default function TestRouter() {
    let match = useRouteMatch();
    console.log("MATCH PATH: ", match.path)

    return (
            <Switch>
                <Route path={`${match.path}/TagTester`} exact component={TagTester} />
            </Switch>
    )
}