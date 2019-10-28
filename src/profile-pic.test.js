// /src/profile-pic.test.js

// Now we import all the stuff we need

import React from 'react';
import ProfilePic from './profile-pic';
import { render, fireEvent } from '@testing-library/react';

test('renders img with source set to url prop', () => {
	const { container } = render(<ProfilePic url="/dog.png" />);

	expect(container.querySelector('img').getAttribute('src')).toBe(
		'https://image.flaticon.com/icons/png/512/149/149071.png'
	);
});

test('renders img with source set to default.png when no url prop is passed', () => {
	const { container } = render(<ProfilePic />);

	expect(container.querySelector('img').getAttribute('src')).toBe(
		'https://image.flaticon.com/icons/png/512/149/149071.png'
	);
});

test('renders first and last props in alt attribute', () => {
	const { container } = render(<ProfilePic last="matijevic" />);

	expect(container.querySelector('img').getAttribute('alt')).toBe('matijevic');
});

test('onClick prop gets called when img is clicked. ', () => {
	// Here I am creating an onClick mock because i want to test if onclick
	// is invoked when the user clicks on the img.
	// This is what mock functions exist for! they exist to give us a way
	// to check if a function is being invoked when we expect it to!. .
	const onClick = jest.fn(); // We mock the function.
	const { container } = render(<ProfilePic onClick={onClick} />);

	fireEvent.click(container.querySelector('img'));
	fireEvent.click(container.querySelector('img'));
	fireEvent.click(container.querySelector('img'));

	expect(onClick.mock.calls.length).toBe(3);
});
