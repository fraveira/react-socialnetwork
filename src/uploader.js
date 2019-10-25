import React from 'react';
import axios from './axios';

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
		fd.append('image', this.state.file); // .file doesn't exist.
		axios.post('/upload', fd).then(function(res) {
			// No iea what to do here.
		});
	}
	render() {
		// You have to render the input!!!
		return (
			<div>
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
