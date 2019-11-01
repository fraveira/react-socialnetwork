import axios from './axios';

export async function receiveFriendsWannabes() {
	const { data } = await axios.get('/friends-wannabes');
	return {
		type: 'RECEIVE_USERS',
		users: data
	};
}

export async function acceptFriendRequest(id) {
	await axios.post(`/accepting-friendship/${id}`);
	return {
		type: 'MAKE_FRIENDS',
		id
	};
}

export async function unFriend(id) {
	await axios.post(`/ending-friendship/${id}`);
	return {
		type: 'MAKE_NOT',
		id
	};
}
