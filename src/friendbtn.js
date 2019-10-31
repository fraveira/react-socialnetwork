import React, { useState, useEffect } from 'react';
import axios from './axios';

export default function FriendButton({ visitedId }) {
	const [ relation, setRelation ] = useState();
	// I should find a pair of words that are more relevant...
	useEffect(
		() => {
			(async () => {
				const { data } = await axios.get(`/get-initial-status/${visitedId}`);
				console.log('Visited id is this', visitedId);
				console.log('Data receiver id', data.receiver_id);
				if (!data) {
					console.log('We are not getting any data');
					setRelation('Add as a friend');
				} else if (data.accepted == false && visitedId == data.receiver_id) {
					// At this point we need to differentiate if the person visiting is the sender or the receiver.
					console.log('They  didntaccept the request, and you are who sent it.');
					setRelation('Cancel Friend Request');
					// If it's still not accepted, show "Accept Request", if you are the receiver.
				} else if (data.accepted == false) {
					console.log('They sent the request, but we havent accepted it yet');
					setRelation('Accept Friend Request');
				} else {
					console.log('They accepted the request, so we are friends');
					setRelation('Delete from my friends list');
				}
			})();
		},
		[ visitedId ]
	);

	// Down below we start writing the setRelation requests. The way to decide what request to do is by
	// checking the text of the button (I guess it's the only way)
	// This will have several iifes.
	// ALL THE ROUTES ARE POST!!!!!
	// 1) Post that user x sent a request to user y. And that's all. (if the button is 'Add as a friend')

	function handleRelation() {
		// If the text is "Add as a friend", then allow to do this query.
		if ('Add as a friend' == relation) {
			(async () => {
				const { data } = await axios.post(`/sending-request/${visitedId}`);
				setRelation('Cancel Friend Request');
			})();
		} else if ('Accept Friend Request' == relation) {
			(async () => {
				const { data } = await axios.post(`/accepting-request/${visitedId}`);
				setRelation('Delete from my friends list');
			})();
		} else if ('Delete from my friends list' == relation || 'Cancel Friend Request' == relation) {
			(async () => {
				const { data } = await axios.post(`/ending-friendship/${visitedId}`);
				setRelation('Add as a friend');
			})();
		}

		// } else if ('Cancel Friend Request' == relation) {
		// 	// (async () => {
		// 	// 	const { data } = await axios.post(`/accept-request/${visitedId}`);
		// 	// 	setRelation('Add as a friend');
		// 	// })();
		// } else ('Delete from my friends list' == relation) {
		//     // (async () => {
		// 	// 	const { data } = await axios.post(`/DELETE/${visitedId}`);
		// 	// 	setRelation('Add as a friend');
		// 	// })();
		// }

		// If the text is

		// We need 2 more POST requests, AND all the logic behind the 3 of them.
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
