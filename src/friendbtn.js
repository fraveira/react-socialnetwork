import React, { useState, useEffect } from 'react';
import axios from './axios';

export default function FriendButton({ visitedId }) {
	console.log('Userprofile is this', visitedId);

	const [ relation, setRelation ] = useState();
	// I should find a pair of words that are more relevant...
	useEffect(() => {
		(async () => {
			const { data } = await axios.get(`/get-initial-status/${visitedId}`);
			if (!data) {
				// No data no friends!
				console.log('We are not getting any data');
				setRelation('Add as a friend');
			} else if (conditioncomeshere) {
				console.log('What is data returning?', data.accepted);
				console.log('What is accepted returning?', data.accepted);
				console.log("Following requests are to be done when some data is returned. Now it's the case.");
				// CHECK NOW IF THERE IS DATA, AND IF THE REQUEST IS NOT ACCEPTED.
				// Else if accepted is FALSE.
				// So now is the time to do the post requests,
				// Relation always is returned depending on the database (coming from axios.get)
				// But naturalmente the function we execute is different depending on the status.
				// let's focus on the setRelation function.
			} else {
				console.log('Accepted is true');
				// Else if acccepted is TRUE
			}
		})();
	});

	// Down below we start writing the setRelation requests. The way to decide what request to do is by
	// checking the text of the button (I guess it's the only way)
	// This will have several iifes.
	// ALL THE ROUTES ARE POST!!!!!
	// 1) Post that user x sent a request to user y. And that's all. (if the button is 'Add as a friend')

	function handleRelation() {
		(async () => {
			const { data } = await axios.post(`/sending-request/${visitedId}`);
			// Set the text to "Cancel frienship"
			setRelation('Add as a friend');
		})();
	}

	return (
		<div>
			<button onClick={() => handleRelation()} type="button">
				{' '}
				{relation}
			</button>
		</div>
	);
}
