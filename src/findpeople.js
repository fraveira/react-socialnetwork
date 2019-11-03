import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from './axios';

const searcher = {
	backgroundColor: 'lightblue',
	textAlign: 'center',
	width: '50%'
};
const searcher_img = {
	height: '180px',
	width: '180px',
	objectFit: 'cover',
	borderRadius: '15px'
};

const searcher_lis = {
	listStyleType: 'none'
};

const searcher_hrs = {
	width: '50%'
};

export default function FindPeople() {
	const [ userInput, setUserInput ] = useState('');
	const [ peoples, setPeoples ] = useState([]);

	useEffect(
		() => {
			let ignore = false;
			if (userInput == '') {
				(async () => {
					const { data } = await axios.get(`/api/users/`);
					setPeoples(data);
				})();
			} else {
				(async () => {
					const { data } = await axios.get(`/api/users/${userInput}`);
					if (!ignore) {
						setPeoples(data);
					} else {
						console.log('Ignored');
					}
				})();
			}
			return () => {
				ignore = true;
			};
		},
		[ userInput ]
	);

	return (
		<div style={searcher}>
			<h2>Search People:</h2>
			<input placeholder="Start typing" type="text" onChange={(e) => setUserInput(e.target.value)} />
			<ul>
				{peoples.map((people) => (
					<li style={searcher_lis} key={people.first}>
						<h3>
							{people.first}
							{people.last}
						</h3>
						<a href={'/user/' + people.id}>
							{' '}
							<img style={searcher_img} src={people.profilepicture} />
						</a>
						<hr style={searcher_hrs} />
					</li>
				))}
			</ul>
		</div>
	);
}
