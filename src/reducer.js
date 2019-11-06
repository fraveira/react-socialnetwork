export function reducer(state = {}, action) {
	if (action.type == 'RECEIVE_USERS') {
		state = {
			...state,
			users: action.users
		};
	}
	if (action.type == 'MAKE_FRIENDS') {
		state = {
			...state,
			users: state.users.map((user) => {
				if (user.id == action.id) {
					return {
						...user,
						accepted: action.type == 'MAKE_FRIENDS'
					};
				} else {
					return user;
				}
			})
		};
	}

	if (action.type == 'MAKE_NOT') {
		state = {
			...state,
			users: state.users.filter((user) => user.id != action.id)
		};
	}

	// Show this in reverse order.

	if (action.type == 'GET_CHATS') {
		console.log('This is get action', action.messages);
		state = {
			...state,
			messages: action.messages.reverse()
		};
	}

	// Take a copy of all the chats, take the current string of chats.
	// Then add the new chat that was posted, and add it at the end of the array.

	if (action.type == 'ADD_CHAT') {
		state = {
			...state,
			messages: state.messages.concat(action.message)
		};

		console.log('What is action.message in POST_CHAT?', action.message);
		console.log('What is message in POST_CHAT?', state.messages);
	}
	return state;
}
