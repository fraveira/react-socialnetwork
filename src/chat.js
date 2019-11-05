import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { socket } from './socket';

export function Chat() {
	const chatMessages = useSelector((state) => state && state.chatMessages);
	const elemRef = useRef();

	useEffect(() => {
		console.log('Chat mounted');
		console.log('Scroll top: ', elemRef.current.scrollTop);
		console.log('Scroll height: ', elemRef.current.scrollHeight);
		console.log('Client height: ', elemRef.current.clientHeight);
		elemRef.current.scrollTop = elemRef.current.scrollHeight - elemRef.current.clientHeight;
	}, []);

	const keyCheck = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			console.log(e.target.value);
			console.log(e.key);
			socket.emit('My amazing chat message', e.target.value);
			e.target.value = '';
		}
	};
	console.log('Here are the last 10 chat messages', chatMessages);
	return (
		<div className="chat">
			<h1>Chat Room</h1>
			<div className="chat-container" ref={elemRef}>
				<p>Chat message will go here</p>
				<p>Chat message will go here</p>
				<p>Chat message will go here</p>
				<p>Chat message will go here</p>
				<p>Chat message will go here</p>
			</div>
			<textarea placeholder="Add your chat message here" onKeyDown={keyCheck} />
		</div>
	);
}
