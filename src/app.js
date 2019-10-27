import React from 'react';
import ProfilePic from './profile-pic';
import Uploader from './uploader';
import axios from './axios';
import Profile from './profile';

const navStyles = {
	backgroundColor: 'white',
	height: '65px',
	marginTop: '0'
};

// const profile = {
// 	display: 'flex',
// 	width: '100%'
// };

export class App extends React.Component {
	constructor() {
		super();
		this.state = {
			first: '', // modify this. Get what the db returns.
			last: '', // modify this.
			img: '', // Starting with no picture now.
			bio: '',
			file: null,
			uploaderIsVisible: false
		};
		this.toggleModal = this.toggleModal.bind(this);
		this.setImage = this.setImage.bind(this);
		this.setBio = this.setBio.bind(this);
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

	setBio(bio) {
		this.setState({ bio: bio });
	}

	methodInApp() {}

	render() {
		return (
			<React.Fragment>
				<nav style={navStyles}>
					<ProfilePic
						toggleModal={() => this.toggleModal()}
						first={this.state.first}
						last={this.state.last}
						profilepicture={this.state.profilepicture}
					/>
				</nav>
				<section>
					<Profile
						id={this.state.id}
						first={this.state.first}
						last={this.state.last}
						profilepicture={this.state.profilepicture}
						onClick={this.showUploader}
						bio={this.state.bio}
						setBio={this.setBio}
					/>
					{this.state.uploaderIsVisible && <Uploader setImage={this.setImage} />}
				</section>
			</React.Fragment>
		);
	}
}
