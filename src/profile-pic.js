import React from 'react';

const profilePicStyles = {
	height: '60px',
	width: '60px',
	objectFit: 'cover',
	borderRadius: '15px'
};

const profilePicContainer = {
	height: '60px',
	width: '60px',
	margin: '1px',
	backgroundColor: 'green',
	float: 'right',
	position: 'relative',
	border: 'black solid 1px',
	borderRadius: '15px'
};

export default function ProfilePic({ last, profilepicture, toggleModal }) {
	profilepicture = profilepicture || '/assets/defaultpic.png';

	return (
		<div onClick={toggleModal} style={profilePicContainer}>
			<img style={profilePicStyles} src={profilepicture} alt={last} />
		</div>
	);
}
