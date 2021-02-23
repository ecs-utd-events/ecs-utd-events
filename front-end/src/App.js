import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import { useEffect } from "react";

import Login from './pages/Login';
import Home from './pages/Home';
import CreateEvent from './pages/admin/CreateEvent';
import OrgProfileRouter from './pages/OrgProfileRouter';
import EditProfile from "./pages/admin/EditProfile";
import EditEvents from "./pages/admin/EditEvents";
import HelpPage from "./pages/admin/HelpPage";

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';


export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route path="/org" component={OrgProfileRouter} />
        <Route path="/login" component={Login} />
        <Route path="/admin/profile" component={EditProfile} />
        <Route path="/admin/events" component={EditEvents} />
        <Route path="/admin/help" component={HelpPage} />
        <Route path="/admin/create" component={CreateEvent} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
