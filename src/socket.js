import * as io from 'socket.io-client';

// import { chatMessages, chatMessage } from './actions';

export let socket;

export const init = (store) => {
	if (!socket) {
		socket = io.connect();

		socket.on('New chat message from the server', (newMessage) => {
			console.log('This is from the server', newMessage);
		});
	}
};

// socket.on('chatMessages', (msgs) => store.dispatch(chatMessages(msgs)));

// socket.on('chatMessage', (msg) => store.dispatch(chatMessage(msg)));
