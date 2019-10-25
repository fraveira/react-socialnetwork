import React from 'react';

export function ProfilePic({ firstName, lastName, imgUrl }) {
	console.log('props in ProfilePic: ', firstName, lastName, imgUrl);
	imgUrl = imgUrl || '/assets/defaultpic.png';

	return (
		<div>
			<h2>I am the Profile Pic {firstName}</h2>
			<img src={imgUrl} alt={lastName} />
		</div>
	);
}
