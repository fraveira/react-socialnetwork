import axios from './axios';

export async function receiveFriendsWannabes() {
	const { data } = await axios.get('/friends-wannabes');
	return {
		type: 'RECEIVE_USERS',
		users: data
	};
}

export async function acceptFriendRequest(id) {
	await axios.post(`/accepting-request/${id}`);
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

export async function chatMessage(newMessage) {
	return {
		type: 'ADD_CHAT',
		message: newMessage
	};
}

export async function chatMessages(msgs) {
	return {
		type: 'GET_CHATS',
		messages: msgs
	};
}
