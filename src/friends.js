import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { receiveFriendsWannabes, acceptFriendRequest, unFriend } from './actions';

export default function Friends() {
	const dispatch = useDispatch();
	const friends = useSelector((state) => state.users && state.users.filter((user) => user.accepted == true));
	const wannabes = useSelector((state) => state.users && state.users.filter((user) => user.accepted == false));
	useEffect(() => {
		dispatch(receiveFriendsWannabes());
	}, []);

	if (!friends) {
		return null;
	}

	return (
		<React.Fragment>
			<div className="yesfriends">
				<ul>
					{friends.map((user) => (
						<li key={user.first}>
							{user.first}
							{user.last}
							<img src={user.profilepicture} />
							<button onClick={(e) => dispatch(unFriend(user.id))}>Unfriend</button>
						</li>
					))}
				</ul>
			</div>
			<div className="wannabes">
				<ul>
					{wannabes.map((user) => (
						<li key={user.first}>
							{user.first}
							{user.last}
							<img src={user.profilepicture} />
							<button onClick={(e) => dispatch(acceptFriendRequest(user.id))}>Accept friend</button>
						</li>
					))}
				</ul>
			</div>
		</React.Fragment>
	);
}
