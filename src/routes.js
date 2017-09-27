// src/routes.js
import React from 'react';
import { Router, Route } from 'react-router';

import App from './App';
import BadA11yExample from './BadA11yExample';
import GoodA11yExample from './GoodA11yExample';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/goodA11y" component={GoodA11yExample} />
    <Route path="/badA11y" component={BadA11yExample} />
  </Router>
);

export default Routes;
