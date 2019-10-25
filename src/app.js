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
		this.setImage = this.setImage.bind(this);
	}

	async componentDidMount() {
		console.log('App mounted!!');
		axios.get('/user').then(({ data }) => {
			this.setState(data);
			console.log('This is setState', this.state);
		});
	}
	toggleModal() {
		console.log('I am Togglemodal');
		if (this.state.uploaderIsVisible) {
			this.setState({ uploaderIsVisible: false });
		} else {
			this.setState({ uploaderIsVisible: true });
		}
	}

	setImage(profilepicture) {
		console.log('Qué es imgUrl???', profilepicture);
		this.setState({ profilepicture: profilepicture });
	}

	methodInApp() {
		console.log('I am a method running in APP');
	}

	render() {
		return (
			<div>
				<h1 onClick={this.toggleModal}>Hello from App!!!</h1>
				<ProfilePic
					first={this.state.first}
					last={this.state.last}
					profilepicture={this.state.profilepicture}
				/>
				{this.state.uploaderIsVisible && <Uploader setImage={this.setImage} />}
			</div>
		);
	}
}

// if (!this.state.profilepicture) {
//     return A loading div. ..
// }
