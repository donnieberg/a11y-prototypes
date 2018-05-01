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
					<div className="ht-full df">
						<ul className="nav pvm slds-size_1-of-6 bg-navy text-aqua">
							<li className="f3 caps phm pvs text-aqua slds-border_bottom fw-bold">A11y Prototypes</li>
							<li className="f4"><NavLink className="db phm pvs" to="/feeds">Feeds</NavLink></li>
						</ul>
						<div className="pam slds-size_5-of-6">
							<Route path="/feeds" component={Feeds} />
						</div>
					</div>
				</IconSettings>
			</Router>
    );
  }
}

export default App;
