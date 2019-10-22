import React from 'react';
import axios from 'axios';

export default class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	handleChange({ target }) {
		this.setState({
			[target.name]: target.value
		});
	}

	//that previous code equals
	// handleChange(e) {
	//    let target = e.target
	// }

	submit() {
		axios
			.post('/register', {
				first: this.state.first,
				last: this.state.last,
				email: this.state.email,
				password: this.state.password
			})
			.then(({ data }) => {
				if (data.success) {
				} else {
					this.setState({
						error: true
					});
				}
			});
	}

	render() {
		return (
			<div>
				{this.state.error && <div className="error"> Oops! That was your fault</div>}
				<input name="first" onChange={(e) => this.handleChange(e)} />
				<input name="last" onChange={(e) => this.handleChange(e)} />
				<input name="email" onChange={(e) => this.handleChange(e)} />
				<input name="password" onChange={(e) => this.handleChange(e)} />
				<button onClick={() => this.submit()}>Submit</button>
			</div>
		);
	}
}
