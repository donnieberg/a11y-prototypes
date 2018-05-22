import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom'
import IconSettings from 'design-system-react/components/icon-settings';
import MenuDropdown from 'design-system-react/components/menu-dropdown';

import './App.css';
import Feeds from './prototypes/feeds';
import SuperSearch from './prototypes/super-search';

class App extends Component {
  render() {
    return (
			<Router>
				<IconSettings iconPath="./assets/icons">
					<nav className="pam df df-justify pos-fix wi-full f3 bg-navy text-aqua">
						<span>a11y Prototypes</span>
						<ul className="f4 caps list-horz">
							<li className="prl"><NavLink to="/feeds">Feeds</NavLink></li>
							<li className="prl"><NavLink to="/super-search">Super Search</NavLink></li>
						</ul>
					</nav>
					<main className="main-container-padding pt-main-container pam">
						<Route path="/feeds" component={Feeds} />
						<Route path="/super-search" component={SuperSearch} />
					</main>
				</IconSettings>
			</Router>
    );
  }
}

export default App;
