import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, user, likeHandler, removeHandler }) => {
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

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='default-blog'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible} className='detail-blog'>
        <div>Title: {blog.title} <button onClick={toggleVisibility}>Hide</button></div>
        <div>Author: {blog.author}</div>
        <div>URL: {blog.url}</div>
        <div>Likes: {blog.likes} <button onClick={likeHandler}>like</button></div>
        <button style={showIfAuthor} onClick={removeHandler}>Remove</button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeHandler: PropTypes.func.isRequired,
  removeHandler: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
