import React from 'react';
import ProfilePic from './profile-pic';
import Uploader from './uploader';
import axios from './axios';
import Profile from './profile';
import { BrowserRouter, Route } from 'react-router-dom';
import { OtherProfile } from './otherprofile';
import FindPeople from './findpeople';
import FriendButton from './friendbtn';
import Friends from './friends';
import Chat from './chat';

const navStyles = {
	backgroundColor: 'white',
	height: '65px',
	marginTop: '0',
	display: 'inline-block'
};

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
		if (!this.state.first) {
			return null;
		}
		return (
			<React.Fragment>
				<BrowserRouter>
					<React.Fragment>
						<nav style={navStyles}>
							<a href="/">
								<img src="/assets/logo.png" />
							</a>
							<div className="navbtn">
								<span>
									<a href="/users">Search Users</a>
								</span>
								<span>
									<a href="/friends">Friends List</a>
								</span>
								<span>
									<a href="/logout">Logout</a>
								</span>
							</div>

							<ProfilePic
								toggleModal={() => this.toggleModal()}
								first={this.state.first}
								last={this.state.last}
								profilepicture={this.state.profilepicture}
							/>
						</nav>
						<Route
							exact
							path="/"
							render={(props) => (
								<section>
									<Profile
										id={this.state.id}
										first={this.state.first}
										last={this.state.last}
										profilepicture={this.state.profilepicture}
										onClick={this.showUploader}
										bio={this.state.bio}
										setBio={this.setBio}
										toggleModal={() => this.toggleModal()}
									/>
									{this.state.uploaderIsVisible && <Uploader setImage={this.setImage} />}
								</section>
							)}
						/>

						<Route
							path="/user/:id"
							render={(props) => (
								<OtherProfile key={props.match.url} match={props.match} history={props.history} />
							)}
						/>
						<Route
							path="/users"
							render={(props) => (
								<FindPeople key={props.match.url} match={props.match} history={props.history} />
							)}
						/>
						<Route
							path="/friends"
							render={(props) => (
								<Friends key={props.match.url} match={props.match} history={props.history} />
							)}
						/>
						<Route
							path="/chat"
							render={(props) => (
								<Chat key={props.match.url} match={props.match} history={props.history} />
							)}
						/>
					</React.Fragment>
				</BrowserRouter>
			</React.Fragment>
		);
	}
}
