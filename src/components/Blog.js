import { useState } from 'react';

const Blog = ({ blog }) => {
  const [detailVisible, setDetailVisible] = useState(false);

  const showWhenVisible = { display: detailVisible ? '' : 'none' };
  const hideWhenVisible = { display: detailVisible ? 'none' : '' };

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
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible}>
        <div>Title: {blog.title} <button onClick={toggleVisibility}>Hide</button></div>
        <div>Author: {blog.author}</div>
        <div>URL: {blog.url}</div>
        <div>Likes: {blog.likes} <button>like</button></div>
      </div>
    </div>
  );
};

export default Blog;
