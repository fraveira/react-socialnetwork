import React from 'react';
import axios from './axios';

export default class Uploader extends React.Component {
	constructor() {
		super();
		this.state = {};
	}
	componentDidMount() {
		console.log('Uploader mounted!!');
		console.log('this.props: ', this.props);
	}
	render() {
		return (
			<div>
				<h3 onClick={() => this.props.methodInApp()}>This is my uploader component</h3>
			</div>
		);
	}
}
