import React from 'react';
import Register from './register';

const imgStyle = {
	width: '45em'
};

const layoutWelcome = {
	textAlign: 'center'
};

export default function Welcome() {
	return (
		<div style={layoutWelcome}>
			<img style={imgStyle} src="/assets/reactlogo.svg" />
			<h2>Welcome to your Social Network!</h2>
			<Register />
		</div>
	);
}

// Here goes the second part.
