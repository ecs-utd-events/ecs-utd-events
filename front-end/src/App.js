import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from './pages/Login';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

import FullCalendar, { formatDate } from '@fullcalendar/react'


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/org/create" component={CreateEvent} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
