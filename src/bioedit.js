import React from 'react';
import axios from './axios';

export default class Bioedit extends React.Component {
	constructor() {
		super();
		this.state = {
			bioIsOn: false,
			bio: undefined
		};
	}

	componentDidMount() {
		this.setState({
			bio: this.state.bio
		});
	}

	editBio() {
		axios
			.post('/editbio', { bio: this.state.bio })
			.then((res) => {
				this.props.setBio(res.data.bio);
				this.setState({ bioIsOn: false });
			})
			.catch((err) => console.log(err));
	}

	deleteBio() {
		axios
			.post('/editbio', { bio: this.state.bio })
			.then((res) => {
				this.props.setBio('');
				this.setState({ bioIsOn: false });
			})
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<React.Fragment>
				<p className="nameInProfile">
					{' '}
					<span className="helloInProfile">Welcome to your Profile,</span> {this.props.first}!
				</p>
				<p className="form-control">{this.props.bio}</p>
				{!this.props.bio &&
				!this.state.bioIsOn && (
					<button
						className="biobtn"
						onClick={() =>
							this.setState({
								bioIsOn: !this.state.bioIsOn
							})}
					>
						Add your Bio!
					</button>
				)}
				{this.props.bio &&
				!this.state.bioIsOn && (
					<div className="bioOutButtons">
						<button
							className="editbtn"
							onClick={() =>
								this.setState({
									bioIsOn: !this.state.bioIsOn
								})}
						>
							Edit your Bio!
						</button>
						<button
							className="deletebtn"
							onClick={() =>
								this.deleteBio({
									bio: ''
								})}
						>
							Delete your Bio!
						</button>
					</div>
				)}
				{this.state.bioIsOn && (
					<div className="bioEditorArea">
						<textarea
							className="form-control"
							name="bio"
							rows="10"
							cols="80"
							placeholder="Add your bio!"
							defaultValue={this.props.bio}
							onChange={(e) => {
								this.setState({ bio: e.target.value });
							}}
						/>
						<button className="submibtbtn" onClick={() => this.editBio()}>
							Save Changes
						</button>
					</div>
				)}
			</React.Fragment>
		);
	}
}
