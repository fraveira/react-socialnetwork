import React from 'react';
import axios from './axios';

const floatingUploader = {
	position: 'absolute',
	width: '500px',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -35%)',
	borderRadius: '12px',
	backgroundColor: 'white',
	fontSize: '15px',
	textAlign: 'left',
	zIndex: '1',
	display: 'block',
	border: '1px solid #ccc',
	opacity: '1'
};

export default class Uploader extends React.Component {
	constructor() {
		super();
		this.state = {};
	}
	componentDidMount() {
		console.log('Uploader mounted!!');
		console.log('this.props: ', this.props);
	}

	upload() {
		var fd = new FormData();
		fd.append('image', this.state.file);
		axios.post('/upload', fd).then((res) => {
			console.log('This is the data returned from the database', res.data);
			this.props.setImage(res.data.profilepicture);
		});
	}
	render() {
		return (
			<div style={floatingUploader}>
				<h3 className="insideuploader">Upload your Profile Picture!</h3>
				<input
					type="file"
					accept="image/*"
					className="inputfile"
					onChange={(e) => {
						this.setState({ file: e.target.files[0] });
					}}
				/>
				<button onClick={() => this.upload()}>Upload picture</button>
			</div>
		);
	}
}
