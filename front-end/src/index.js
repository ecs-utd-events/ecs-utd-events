import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import {
  withRouter
} from "react-router-dom";

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default withRouter(ScrollToTop);

ReactDOM.render(
  <ScrollToTop>

      <App />
  </ScrollToTop>,

  document.getElementById('root')
);
