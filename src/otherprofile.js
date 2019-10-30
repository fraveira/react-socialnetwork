import React from 'react';
import axios from './axios';
import ProfilePic from './profile-pic';
import FriendButton from './friendbtn';

export class OtherProfile extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	async componentDidMount() {
		axios
			.get(`/api/user/${this.props.match.params.id}`)
			.then(({ data }) => {
				if (data.redirectMe) {
					this.props.history.push('/');
				} else {
					this.setState(data);
				}
			})
			.catch((error) => {
				console.log(error);
				this.props.history.push('/');
			});
	}

	render() {
		return (
			<React.Fragment>
				<div className="profileStyles">
					<ProfilePic
						first={this.state.first}
						last={this.state.last}
						profilepicture={this.state.profilepicture}
					/>
					<FriendButton visitedId={this.props.match.params.id} />
				</div>
				<div className="bioEdition">
					<h3>
						{this.state.first} {this.state.last}
					</h3>
					<p> {this.state.bio}</p>
				</div>
			</React.Fragment>
		);
	}
}
