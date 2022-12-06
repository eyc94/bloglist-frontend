import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    );
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password
      });
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  )

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog));
        setNewTitle('');
        setNewAuthor('');
        setNewUrl('');
        setSuccessMessage(`Added ${returnedBlog.title} by ${returnedBlog.author}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      });
  };

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <Notification successMessage={successMessage} errorMessage={errorMessage} />
        {loginForm()}
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
      <h2>Create New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title: <input type='text' value={newTitle} name='Title' onChange={({ target }) => setNewTitle(target.value)} />
        </div>
        <div>
          Author: <input type='text' value={newAuthor} name='Author' onChange={({ target }) => setNewAuthor(target.value)} />
        </div>
        <div>
          URL: <input type='text' value={newUrl} name='Url' onChange={({ target }) => setNewUrl(target.value)} />
        </div>
        <button type='submit'>Create</button>
      </form>
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
}

export default App;
