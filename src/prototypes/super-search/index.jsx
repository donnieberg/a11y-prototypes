import React, { Component } from 'react';
import { Button, ButtonIcon, InputIcon } from 'design-system-react';
import SuperSearchBasic from './components/SuperSearchBasic';
import SuperSearchJumpRegions from './components/SuperSearchJumpRegions';

class SuperSearch extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<SuperSearchBasic />
				<SuperSearchJumpRegions />
			</div>
		)
	}
}

export default SuperSearch;
