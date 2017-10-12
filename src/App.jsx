import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom'
import IconSettings from 'design-system-react/components/icon-settings';

import './App.css';
import TextOnImages from './prototypes/text-on-images';

class App extends Component {
  render() {
    return (
			<Router>
				<IconSettings iconPath="./assets/icons">
					<div className="ht-full df">
						<ul className="nav pvm slds-size_2-of-12 bg-navy text-aqua">
							<li className="f4 caps phm pvs text-aqua slds-border_bottom fw-bold">A11y Prototypes</li>
							<li className="f4"><NavLink className="db phm pvs" to="/textOnClouds">Text on Clouds</NavLink></li>
						</ul>
						<div className="pam slds-size_10-of-12">
							<Route path="/textOnClouds" component={TextOnImages} />
						</div>
					</div>
				</IconSettings>
			</Router>
    );
  }
}

export default App;
