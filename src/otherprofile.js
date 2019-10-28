import React from 'react';
import axios from './axios';

export class OtherProfile extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	componentDidMount() {
		console.log('I am mounting the component');
		console.log('this.props.match', this.props.match.params.id);
	}

	render() {
		return (
			<React.Fragment>
				<div className="profileStyles">
					<h1>Hello from other profile!</h1>
				</div>
			</React.Fragment>
		);
	}
}
