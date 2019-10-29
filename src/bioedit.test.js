import React from 'react';
import Bioedit from './bioedit';
import { render, fireEvent } from '@testing-library/react';

test('When no bio is passed to BioEditor, we render the ADD BUTTON', () => {
	const { container } = render(<Bioedit />);
	expect(container.querySelector('button').innerHTML).toBe('Add your Bio!');
});

test('When a bio is passed to BioEditor, we render EDIT BUTTON', () => {
	const { container } = render(<Bioedit bio="ITS me, Mario!" />);
	expect(container.querySelector('button').innerHTML).toBe('Edit your Bio!');
});
