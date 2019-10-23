import React from 'react';
import axios from './axios';

const welcomeForm = {
	display: 'block',
	margin: 'auto',
	marginTop: '10px',
	marginBottom: '5px'
};

export default class Login extends React.Component {
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
			.post('/login', {
				email: this.state.email,
				password: this.state.password
			})
			.then(({ data }) => {
				console.log('Info importante', data);
				if (data.success) {
					console.log('Login succesful');
					location.replace('/');
				} else {
					this.setState({
						error: true
					});
				}
			})
			.catch((error) => {
				console.log('Error logging in', error);
				this.setState({
					error: true
				});
			});
	}

	render() {
		return (
			<div>
				{this.state.error && <div className="error"> Oops! That was your fault</div>}
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
			</div>
		);
	}
}
