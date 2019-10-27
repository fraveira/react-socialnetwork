import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';

const welcomeForm = {
	display: 'block',
	margin: 'auto',
	marginTop: '10px',
	marginBottom: '5px'
};

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
					location.replace('/');
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
				<label>First Name</label>
				<input
					style={welcomeForm}
					name="first"
					placeholder="First Name"
					id="first"
					onChange={(e) => this.handleChange(e)}
				/>
				<label>Last Name</label>
				<input
					style={welcomeForm}
					name="last"
					placeholder="Last Name"
					id="last"
					onChange={(e) => this.handleChange(e)}
				/>
				<label>E-Mail</label>
				<input
					type="email"
					style={welcomeForm}
					name="email"
					placeholder="E-mail"
					id="email"
					onChange={(e) => this.handleChange(e)}
				/>
				<label>Password</label>
				<input
					style={welcomeForm}
					name="password"
					placeholder="Password"
					id="password"
					type="password"
					onChange={(e) => this.handleChange(e)}
				/>
				<button onClick={() => this.submit()}>Submit</button>
				<Link to="/login">Click here to Log in!</Link>
			</div>
		);
	}
}
