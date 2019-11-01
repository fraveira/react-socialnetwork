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
	// Separating make friends from unfriend might solve the bug.

	if (action.type == 'MAKE_NOT') {
		state = {
			...state,
			users: state.users.filter((user) => user.id != action.id)
		};
	}
	return state;
}
