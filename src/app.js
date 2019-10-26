import React from 'react';
import { ProfilePic } from './profile-pic';
import Uploader from './uploader';
import axios from './axios';

const navStyles = {
	backgroundColor: 'white',
	height: '65px',
	marginTop: '0'
};

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
		axios.get('/user').then(({ data }) => {
			this.setState(data);
		});
	}
	toggleModal() {
		if (this.state.uploaderIsVisible) {
			this.setState({ uploaderIsVisible: false });
		} else {
			this.setState({ uploaderIsVisible: true });
		}
	}

	setImage(profilepicture) {
		this.setState({ profilepicture: profilepicture });
	}

	methodInApp() {
		console.log('I am a method running in APP');
	}

	render() {
		return (
			<section>
				<nav style={navStyles}>
					<ProfilePic
						toggleModal={() => this.toggleModal()}
						first={this.state.first}
						last={this.state.last}
						profilepicture={this.state.profilepicture}
					/>
				</nav>
				{this.state.uploaderIsVisible && <Uploader setImage={this.setImage} />}
			</section>
		);
	}
}
