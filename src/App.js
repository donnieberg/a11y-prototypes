import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import './App.css';
import BadA11yExample from './BadA11yExample';
import GoodA11yExample from './GoodA11yExample';

class App extends Component {
  render() {
    return (
			<Router>
				<div className="App">
					<ul>
						<li><Link to="/">Home</Link></li>
						<li><Link to="/badA11y">Bad A11y Example</Link></li>
						<li><Link to="/goodA11y">Good A11y Example</Link></li>
					</ul>
    			<Route path="/badA11y" component={BadA11yExample} />
					<Route path="/goodA11y" component={GoodA11yExample} />
				</div>
			</Router>
    );
  }
}

export default App;
