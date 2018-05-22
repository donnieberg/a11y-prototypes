import React, { Component } from 'react';
import { Button, ButtonIcon, InputIcon } from 'design-system-react';
import SuperSearchBasic from './components/SuperSearchBasic';

class SuperSearch extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<SuperSearchBasic />
			</div>
		)
	}
}

export default SuperSearch;
