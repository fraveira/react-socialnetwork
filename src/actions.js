import axios from 'axios';

export async function receiveFriendsWannabes() {
	const { data } = await axios.get('/friends-wannabes');
	console.log('Data returned from /friends-wannabes', data);
	return {
		type: 'RECEIVE_USERS',
		users: data
	};
}

export async function acceptFriendRequest(id) {
	await axios.post(`/accept-friendship/${id}`);
	return {
		type: 'MAKE_FRIENDS',
		id
	};
}

export async function unFriend(id) {
	await axios.post(`/end-friendship/${id}`);
	return {
		type: 'MAKE_NOT',
		id
	};
}
