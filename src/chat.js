import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { socket } from './socket';

export default function Chat() {
	const chatMessages = useSelector((state) => state && state.messages);
	const elemRef = useRef();

	useEffect(
		() => {
			if (!elemRef) {
				return null;
			}
			console.log('Chat mounted');
			console.log('Scroll top: ', elemRef.current.scrollTop);
			console.log('Scroll height: ', elemRef.current.scrollHeight);
			console.log('Client height: ', elemRef.current.clientHeight);
			elemRef.current.scrollTop = elemRef.current.scrollHeight - elemRef.current.clientHeight;
		},
		[ chatMessages ]
	);

	const keyCheck = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			console.log(e.target.value);
			console.log(e.key);
			socket.emit('My amazing chat message', e.target.value);
			e.target.value = '';
		}
	};
	return (
		<div className="chat">
			<h1>Chat Room</h1>
			<div className="chat-container" ref={elemRef}>
				{chatMessages &&
					chatMessages.map((msg, chat_id) => (
						<div key={chat_id}>
							{' '}
							<p>{msg.message}</p>
						</div>
					))}
			</div>
			<textarea placeholder="Add your chat message here" onKeyDown={keyCheck} />
		</div>
	);
}
