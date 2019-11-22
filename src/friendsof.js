import React, { useState, useEffect } from 'react';
import axios from './axios';

const imgFriendsStyle = {
	width: '10em'
};

const lisFriends = {
	display: 'inline-block',
	marginRight: '50px'
};

export default function Friendsof({ visitedId }) {
	const [ theirFriends, setTheirFriends ] = useState([]);
	useEffect(
		() => {
			(async () => {
				const { data } = await axios.get(`/get-initial-status/${visitedId}`);
				if (data.accepted == true) {
					(async () => {
						const { data } = await axios.get(`/api/friendsof/${visitedId}`); // Rewrite this to a working route.
						setTheirFriends(data);
					})();
				} else {
					console.log('Work to show no div if they aren not friends');
				}
			})();
		},
		[ visitedId ]
	);

	return (
		<div>
			<h2>These are the friends of your friend!</h2>
			<ul>
				{theirFriends.map((friends) => (
					<li style={lisFriends} key={friends.first}>
						<h3>
							{friends.first} {friends.last}
						</h3>
						<a href={'/user/' + friends.id}>
							{' '}
							<img style={imgFriendsStyle} src={friends.profilepicture} />
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
