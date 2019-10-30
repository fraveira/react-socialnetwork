import React, { useState, useEffect } from 'react';
import axios from './axios';

export default function FriendButton({ visitedId }) {
	console.log('Userprofile is this', visitedId);

	const [ relation, setRelation ] = useState();

	useEffect(() => {
		(async () => {
			const { data } = await axios.get(`/get-initial-status/${visitedId}`);
			if (!data) {
				console.log('We are not getting any data');
				setRelation('Render a button Add frienship');
			}
			// setRelation(data); Dinamically saying what to return.
		})();
	});

	return (
		<div>
			<button onClick={() => handleClick({ dinamicallycallingthemethod })} type="button">
				{' '}
				{'dynamically rendering the text'}
			</button>
		</div>
	);
}
