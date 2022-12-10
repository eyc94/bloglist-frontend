import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('renders blog title and author but not url and likes by default', () => {
  const blog = {
    title: 'Sample Blog',
    author: 'Sample Author',
    url: 'https://www.google.com',
    likes: 10,
    user: {
      username: 'admin',
      name: 'Admin',
      id: '62c7e7ee9ff8b1bf39fdcf72',
    },
  };

  const user = {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVjaGluIiwiaWQiOiI2MmM3ZTdlZTlmZjhiMWJmMzlmZGNmNzIiLCJpYXQiOjE2NTc0NTYwNjB9',
    username: 'admin',
    password: 'password',
  };

  const mockLikeHandler = jest.fn();
  const mockRemoveHandler = jest.fn();

  const { container } = render(
    <Blog
      blog={blog}
      user={user}
      likeHandler={mockLikeHandler}
      removeHandler={mockRemoveHandler}
    />,
  );
  const div = container.querySelector('.default-blog');
  expect(div).toHaveTextContent(`${blog.title} ${blog.author}`);
  expect(div).not.toHaveTextContent(`${blog.url}`);
  expect(div).not.toHaveTextContent(`${blog.likes}`);
});

test('renders blog url and likes after the view button is clicked', async () => {
  const blog = {
    title: 'Sample Blog',
    author: 'Sample Author',
    url: 'https://www.google.com',
    likes: 10,
    user: {
      username: 'admin',
      name: 'Admin',
      id: '62c7e7ee9ff8b1bf39fdcf72',
    },
  };

  const user = {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVjaGluIiwiaWQiOiI2MmM3ZTdlZTlmZjhiMWJmMzlmZGNmNzIiLCJpYXQiOjE2NTc0NTYwNjB9',
    username: 'admin',
    password: 'password',
  };

  const mockLikeHandler = jest.fn();
  const mockRemoveHandler = jest.fn();

  const { container } = render(
    <Blog
      blog={blog}
      user={user}
      likeHandler={mockLikeHandler}
      removeHandler={mockRemoveHandler}
    />,
  );

  const mockUser = userEvent.setup();
  const viewButton = screen.getByText('View');
  await mockUser.click(viewButton);

  const div = container.querySelector('.detail-blog');
  expect(div).toHaveTextContent(`${blog.url}`);
  expect(div).toHaveTextContent(`${blog.likes}`);
  expect(div).not.toHaveStyle('display: none');
});

test('calls like handler twice when the user clicks "like" twice', async () => {
  const blog = {
    title: 'Sample Blog',
    author: 'Sample Author',
    url: 'https://www.google.com',
    likes: 10,
    user: {
      username: 'admin',
      name: 'Admin',
      id: '62c7e7ee9ff8b1bf39fdcf72',
    },
  };

  const user = {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVjaGluIiwiaWQiOiI2MmM3ZTdlZTlmZjhiMWJmMzlmZGNmNzIiLCJpYXQiOjE2NTc0NTYwNjB9',
    username: 'admin',
    password: 'password',
  };

  const mockLikeHandler = jest.fn();
  const mockRemoveHandler = jest.fn();

  render(
    <Blog
      blog={blog}
      user={user}
      likeHandler={mockLikeHandler}
      removeHandler={mockRemoveHandler}
    />,
  );

  const mockUser = userEvent.setup();
  const viewButton = screen.getByText('View');
  await mockUser.click(viewButton);

  const likeButton = screen.getByText('like');
  await mockUser.click(likeButton);
  await mockUser.click(likeButton);

  expect(mockLikeHandler.mock.calls).toHaveLength(2);
});
