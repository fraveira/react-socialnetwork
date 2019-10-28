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
	backgroundColor: 'white',
	float: 'right',
	position: 'relative',
	border: 'black solid 1px',
	borderRadius: '15px'
};

export default function ProfilePic({ last, profilepicture, toggleModal }) {
	profilepicture = profilepicture || 'https://image.flaticon.com/icons/png/512/149/149071.png';

	return (
		<div onClick={toggleModal} style={profilePicContainer}>
			<img style={profilePicStyles} src={profilepicture} alt={last} />
		</div>
	);
}

// 5 possible ways to solve the issue with the loading default picture (instead of the profile):
// 1) Remove the OR logic so that it always takes the value from the database,
// and make sure that the DEFAULT value in the database is set to the default picture.
// I mean, start the user account with the row in his/her table already filled with that url.
// https://popsql.com/learn-sql/postgresql/how-to-add-a-default-value-to-a-column-in-postgresql/
// 2) Use React.Lazy Loader. https://hackernoon.com/lazy-loading-and-preloading-components-in-react-16-6-804de091c82d
// 3) Use React onLoad method, sending props down the crutial component (Profile-Pic)
// 4) Show a Skeleton while Loading: https://www.npmjs.com/package/react-loading-skeleton
// 5) OR logic with a url coming from a slower server than the one that serves pics in AWS. I have used this but I am not happy.
// The user profile pictures take about 150 ms more than the default to charge, they are heavier. But if on cache, they show first.
