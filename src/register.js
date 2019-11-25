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
				<input
					className="form-control"
					style={welcomeForm}
					name="first"
					placeholder="First Name"
					id="first"
					onChange={(e) => this.handleChange(e)}
				/>
				<input
					className="form-control"
					style={welcomeForm}
					name="last"
					placeholder="Last Name"
					id="last"
					onChange={(e) => this.handleChange(e)}
				/>
				<input
					className="form-control"
					type="email"
					style={welcomeForm}
					name="email"
					placeholder="E-mail"
					id="email"
					onChange={(e) => this.handleChange(e)}
				/>
				<input
					className="form-control"
					style={welcomeForm}
					name="password"
					placeholder="Password"
					id="password"
					type="password"
					onChange={(e) => this.handleChange(e)}
				/>
				<button className="registerbtn" onClick={() => this.submit()}>
					Register
				</button>
				<Link to="/login">
					<button className="loggerbtn">or Log In</button>
				</Link>
			</div>
		);
	}
}
