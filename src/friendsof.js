import React, { useState, useEffect } from 'react';
import axios from './axios';

export default function Friendsof({ visitedId }) {
	const [ peoples, setPeoples ] = useState([]);
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
						setPeoples(data);
					})();
				} else {
					console.log("They are not friends, don't show any div");
				}
			})();
		},
		[ visitedId ]
	);

	return (
		<div />
		// <div>
		// 	<h3>These are the friends from </h3>
		// 	<ul>
		// 		{friends.map((user) => (
		// 			<li style={friends_lis} key={user.first}>
		// 				<h3>
		// 					{user.first}
		// 					{user.last}
		// 				</h3>
		// 				<a href={'/user/' + user.id}>
		// 					<img style={friends_img} src={user.profilepicture} />
		// 				</a>
		// 			</li>
		// 		))}
		// 	</ul>
		// </div>
	);
}
