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
			elemRef.current.scrollTop = elemRef.current.scrollHeight - elemRef.current.clientHeight;
		},
		[ chatMessages ]
	);

	const keyCheck = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
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
						<div className="chatMsg" key={chat_id}>
							<img id="imgChat" src={msg.profilepicture} />
							<h5>
								{msg.first} {msg.last} {msg.created_at}
							</h5>
							<p className="chatText">{msg.message}</p>
						</div>
					))}
			</div>
			<textarea className="text-to-chat" placeholder="Add your chat message here" onKeyDown={keyCheck} />
		</div>
	);
}
