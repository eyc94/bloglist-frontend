import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title: <input id='title-input' type='text' value={title} name='Title' onChange={handleTitleChange} placeholder='write title here...' />
        </div>
        <div>
          Author: <input id='author-input' type='text' value={author} name='Author' onChange={handleAuthorChange} placeholder='write author here...' />
        </div>
        <div>
          URL: <input id='url-input' type='text' value={url} name='Url' onChange={handleUrlChange} placeholder='write url here...' />
        </div>
        <button id='new-blog-button' type='submit'>Create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
