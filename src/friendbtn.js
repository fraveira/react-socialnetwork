import React, { useState, useEffect } from 'react';
import axios from './axios';

export default function FriendButton({ visitedId }) {
	const [ relation, setRelation ] = useState();
	useEffect(
		() => {
			(async () => {
				const { data } = await axios.get(`/get-initial-status/${visitedId}`);
				if (!data) {
					setRelation('Add as a friend');
				} else if (data.accepted == false && visitedId == data.receiver_id) {
					setRelation('Cancel Friend Request');
				} else if (data.accepted == false) {
					setRelation('Accept Friend Request');
				} else {
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
			<button className="biobtn" onClick={() => handleRelation()} type="button">
				{' '}
				{relation}
			</button>
		</div>
	);
}
