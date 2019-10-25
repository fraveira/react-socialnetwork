import React from 'react';

export function ProfilePic({ first, last, profilepicture }) {
	console.log('props in ProfilePic: ', first, last, profilepicture);
	profilepicture = profilepicture || '/assets/defaultpic.png';

	return (
		<div>
			<h2>I am the Profile Pic {first}</h2>
			<img src={profilepicture} alt={last} />
		</div>
	);
}
