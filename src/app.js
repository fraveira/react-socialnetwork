import React from 'react';
import { ProfilePic } from './profile-pic';
import Uploader from './uploader';
import axios from './axios';

export class App extends React.Component {
	constructor() {
		super();
		this.state = {
			first: '', // modify this. Get what the db returns.
			last: '', // modify this.
			img: '', // Starting with no picture now.
			file: null,
			uploaderIsVisible: false
		};
		this.toggleModal = this.toggleModal.bind(this);
	}

	async componentDidMount() {
		console.log('App mounted!!');
		axios.get('/user').then(({ data }) => {
			this.setState(data);
		});

		const { data } = await axios.get('/user');
		this.setState(data);
	}
	toggleModal() {
		console.log('I am Togglemodal');
		if (this.state.uploaderIsVisible) {
			this.setState({ uploaderIsVisible: false });
		} else {
			this.setState({ uploaderIsVisible: true });
		}
	}

	upload(something) {
		console.log('this does nothing');
	}

	methodInApp() {
		console.log('I am a method running in APP');
	}

	render() {
		return (
			<div>
				<h1 onClick={this.toggleModal}>Hello from App!!!</h1>
				<ProfilePic firstName={this.state.first} lastName={this.state.last} imgUrl={this.state.img} />
				{this.state.uploaderIsVisible && <Uploader upload={this.upload()} />}
			</div>
		);
	}
}
