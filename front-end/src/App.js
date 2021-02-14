import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from './pages/Login';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import OrgProfile from './pages/OrgProfile';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/org" component={OrgProfile} />
        <Route path="/login" component={Login} />
        <Route path="/admin/create" component={CreateEvent} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
