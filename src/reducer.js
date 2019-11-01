export function reducer(state = {}, action) {
	if (action.type == 'RECEIVE_USERS') {
		state = {
			...state,
			users: action.users
		};
	}
	if (action.type == 'MAKE_FRIENDS' || action.type == 'MAKE_NOT') {
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
	return state;
}
