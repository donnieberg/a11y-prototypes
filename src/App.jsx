import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom'
import IconSettings from 'design-system-react/components/icon-settings';

import './App.css';
import Feeds from './prototypes/feeds';

class App extends Component {
  render() {
    return (
			<Router>
				<IconSettings iconPath="./assets/icons">
					<nav className="pam df df-justify pos-fix wi-full f3 bg-navy text-aqua">
						<span>a11y Prototypes</span>
						<ul>
							<li><NavLink to="/feeds">Feeds</NavLink></li>
						</ul>
					</nav>
					<main className="main-container-padding pam">
						<Route path="/feeds" component={Feeds} />
					</main>
				</IconSettings>
			</Router>
    );
  }
}

export default App;
