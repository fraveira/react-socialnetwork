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
					console.log('Give me this console dat log');
					console.log('This is the visited id, they are my FRIENDS', visitedId);
					(async () => {
						const { data } = await axios.get(`/api/friendsof/${visitedId}`); // Rewrite this to a working route.
						console.log('Esta es la data conseguida', data);
						setTheirFriends(data);
					})();
				} else {
					console.log("They are not friends, don't show any div");
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
