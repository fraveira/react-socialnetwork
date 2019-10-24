import React from 'react';
import { ProfilePic } from './profile-pic';
import Uploader from './uploader';

export class App extends React.Component {
	constructor() {
		super();
		this.state = {
			first: 'Pete',
			last: 'Anderson',
			img: '',
			uploaderIsVisible: false
		};
		this.toggleModal = this.toggleModal.bind(this);
	}

	componentDidMount() {
		console.log('App mounted!!');
		// This is where we want to make an axios request.
		// A get request to a route called '/user'.
		//When we get a response we want to put the info into state...
		// this.setState();
	}
	toggleModal() {
		console.log('I am Togglemodal');
		if (this.state.uploaderIsVisible) {
			this.setState({ uploaderIsVisible: false });
		} else {
			this.setState({ uploaderIsVisible: true });
		}
	}

	methodInApp() {
		console.log('I am a method running in APP');
	}

	render() {
		return (
			<div>
				<h1 onClick={this.toggleModal}>Hello from App!!!</h1>
				<ProfilePic firstName={this.state.first} lastName={this.state.last} imgUrl={this.state.img} />
				{this.state.uploaderIsVisible && <Uploader methodInApp={this.methodInApp} />}
			</div>
		);
	}
}
