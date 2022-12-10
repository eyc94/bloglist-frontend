import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('blog form handler called with correct details on blog creation', async () => {
  const createBlog = jest.fn();
  const mockUser = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const titleInput = screen.getByPlaceholderText('write title here...');
  const authorInput = screen.getByPlaceholderText('write author here...');
  const urlInput = screen.getByPlaceholderText('write url here...');
  const createButton = screen.getByText('Create');

  await mockUser.type(titleInput, 'Testing Blog Creation');
  await mockUser.type(authorInput, 'John Doe');
  await mockUser.type(urlInput, 'https://www.google.com');
  await mockUser.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('Testing Blog Creation');
  expect(createBlog.mock.calls[0][0].author).toBe('John Doe');
  expect(createBlog.mock.calls[0][0].url).toBe('https://www.google.com');
});
