import React, { useState, useEffect } from 'react';
import axios from './axios';

export default function Friendsof({ visitedId }) {
	const [ peoples, setTheirFriends ] = useState([]);
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
			<h2>These are their friends</h2>
			<ul>
				{peoples.map((people) => (
					<li key={people.first}>
						<h3>
							{people.first}
							{people.last}
						</h3>
						<a href={'/user/' + people.id}>
							{' '}
							<img src={people.profilepicture} />
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
