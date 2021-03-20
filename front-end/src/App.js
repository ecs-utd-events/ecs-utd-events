import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import { useEffect } from "react";

import Login from './pages/Login';
import ResetPassword from "./pages/ResetPassword";
import Home from './pages/Home';
import OrgProfileRouter from './pages/OrgProfileRouter';
import AdminRouter from "./pages/admin/AdminRouter";
import UserProvider from "./providers/UserProvider";

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import AllOrgProvider from "./providers/AllOrgProvider";
import NotFound from "./pages/NotFound";


export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <UserProvider>
      <AllOrgProvider>
        <Router>
          <ScrollToTop />
          <Switch>
            <Route path="/org" component={OrgProfileRouter} />
            <Route path="/login" exact component={Login} />
            <Route path="/reset-password" exact component={ResetPassword} />
            <Route path="/admin" component={AdminRouter} />
            <Route path="/" exact component={Home} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </AllOrgProvider>
    </UserProvider>
  );
}

export default App;
