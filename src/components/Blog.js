import { useState } from 'react';
import blogService from '../services/blogs';
import PropTypes from 'prop-types';

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [detailVisible, setDetailVisible] = useState(false);

  const showWhenVisible = { display: detailVisible ? '' : 'none' };
  const hideWhenVisible = { display: detailVisible ? 'none' : '' };
  const showIfAuthor = { display: blog.user.username === user.username ? '' : 'none' };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setDetailVisible(!detailVisible);
  };

  const handleLikeButton = (id) => {
    const changedBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    };

    blogService
      .update(blog.id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog));
      });
  };

  const handleRemoveButton = async (id) => {
    const deleteMessage = `Remove blog ${blog.title} by ${blog.author} ?`;
    if (window.confirm(deleteMessage)) {
      await blogService.del(id);
      setBlogs(blogs.filter(b => b.id !== id));
    }
  };

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible}>
        <div>Title: {blog.title} <button onClick={toggleVisibility}>Hide</button></div>
        <div>Author: {blog.author}</div>
        <div>URL: {blog.url}</div>
        <div>Likes: {blog.likes} <button onClick={() => handleLikeButton(blog.id)}>like</button></div>
        <button style={showIfAuthor} onClick={() => handleRemoveButton(blog.id)}>Remove</button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
