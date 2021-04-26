import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import { useEffect } from "react";

import Login from './pages/Login';
import SendPasswordResetEmail from "./pages/SendPasswordResetEmail";
import Home from './pages/Home';
import ResetPassword from './pages/ResetPassword';
import OrgProfileRouter from './pages/OrgProfileRouter';
import AdminRouter from "./pages/admin/AdminRouter";
import UserProvider from "./providers/UserProvider";

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import AllOrgProvider from "./providers/AllOrgProvider";
import NotFound from "./pages/NotFound";
import JerryEmail from "./pages/JerryEmail";


export function ScrollToTop() {
  const { pathname } = useLocation();

  // This solves a bug with React-Router where sometimes a window 
  // remains in the same scroll position even after changing pages
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
            <Route path="/password-reset-email" exact component={SendPasswordResetEmail} />
            <Route path="/reset-password" exact component={ResetPassword} />
            <Route path="/admin" component={AdminRouter} />
            <Route path="/email" exact component={JerryEmail} />
            <Route path="/" exact component={Home} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </AllOrgProvider>
    </UserProvider>
  );
}

export default App;
