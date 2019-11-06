import * as io from 'socket.io-client';

import { chatMessages, chatMessage } from './actions';

export let socket;

export const init = (store) => {
	if (!socket) {
		socket = io.connect();

		socket.on('chatMessage', (newMessage) => {
			store.dispatch(chatMessage(newMessage));
			console.log('This is newMessage', newMessage);
		});

		socket.on('chatMessages', (msgs) => {
			store.dispatch(chatMessages(msgs));
			console.log('These are chatMessages', msgs);
		});
	}
};
