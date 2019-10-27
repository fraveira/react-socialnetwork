import React from 'react';
import ProfilePic from './profile-pic';
import Bioedit from './bioedit';

export default class Profile extends React.Component {
	constructor() {
		super();
	}

	componentDidMount() {}

	render() {
		return (
			<div className="profile">
				<ProfilePic
					toggleModal={() => this.toggleModal()}
					first={this.props.first}
					last={this.props.last}
					profilepicture={this.props.profilepicture}
				/>
				<Bioedit
					first={this.props.first}
					last={this.props.last}
					bio={this.props.bio}
					setBio={this.props.setBio}
				/>
			</div>
		);
	}
}
