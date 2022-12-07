import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
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
  );

  const blogFormRef = useRef();

  const blogForm = () => (
    <Togglable buttonLabel='New Blog' ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog}
      />
    </Togglable>
  );

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog));
        setSuccessMessage(`Added ${returnedBlog.title} by ${returnedBlog.author}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      });
  };

  const likeHandler = async (blog) => {
    const returnedBlog = await blogService.updateLike(blog);
    console.log(returnedBlog);
    setBlogs(
      blogs.map(b =>
        b.id === returnedBlog.id
          ? { ...b, likes: returnedBlog.likes }
          : b)
    );
  };

  const removeHandler = async (blog) => {
    const deleteMessage = `Remove blog ${blog.title} by ${blog.author} ?`;
    if (window.confirm(deleteMessage)) {
      await blogService.del(blog.id);
      setBlogs(blogs.filter(b => b.id !== blog.id));
    }
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
      {blogForm()}

      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} removeHandler={() => removeHandler(blog)} likeHandler={() => likeHandler(blog)} user={user} />
      )}
    </div>
  );
};

export default App;
