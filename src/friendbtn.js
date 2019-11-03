import React, { useState, useEffect } from 'react';
import axios from './axios';

export default function FriendButton({ visitedId }) {
	const [ relation, setRelation ] = useState();
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
					console.log('They  didntaccept the request, and you are who sent it.');
					setRelation('Cancel Friend Request');
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

	function handleRelation() {
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
	}

	return (
		<div>
			<button className="submitbtn" onClick={() => handleRelation()} type="button">
				{' '}
				{relation}
			</button>
		</div>
	);
}
