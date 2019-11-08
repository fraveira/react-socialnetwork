import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { receiveFriendsWannabes, acceptFriendRequest, unFriend } from './actions';

const friends_hrs = {
	width: '50%'
};

const friends_lis = {
	listStyleType: 'none'
};

const friends_img = {
	height: '180px',
	width: '180px',
	objectFit: 'cover',
	borderRadius: '15px'
};

export default function Friends() {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.users);
	const friends = useSelector((state) => state.users && state.users.filter((user) => user.accepted));
	const wannabes = useSelector((state) => state.users && state.users.filter((user) => user.accepted === false));
	useEffect(() => {
		dispatch(receiveFriendsWannabes());
	}, []);

	if (!users) {
		return null;
	}

	return (
		<React.Fragment>
			<section>
				<div className="yesfriends">
					<h2>These are your friends!</h2>
					<ul>
						{friends.map((user) => (
							<li style={friends_lis} key={user.first}>
								<h3>
									{user.first} {user.last}
								</h3>
								<a href={'/user/' + user.id}>
									<img style={friends_img} src={user.profilepicture} />
								</a>
								<button className="deletebtn" onClick={(e) => dispatch(unFriend(user.id))}>
									Unfriend
								</button>
								<hr style={friends_hrs} />
							</li>
						))}
					</ul>
				</div>
				<div className="wannabes">
					<h2>They want to be your friends!</h2>
					<ul>
						{wannabes.map((user) => (
							<li style={friends_lis} key={user.first}>
								<h3>
									{user.first} {user.last}
								</h3>
								<a href={'/user/' + user.id}>
									<img style={friends_img} src={user.profilepicture} />
								</a>
								<button className="submitbtn" onClick={(e) => dispatch(acceptFriendRequest(user.id))}>
									Accept friend
								</button>
								<hr style={friends_hrs} />
							</li>
						))}
					</ul>
				</div>
			</section>
		</React.Fragment>
	);
}
