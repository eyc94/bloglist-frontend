import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  console.log('response:', response);
  return response.data;
};

const updateLike = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const changedBlog = {
    ...blog,
    likes: blog.likes + 1,
  };

  const response = await axios.put(
    `${baseUrl}/${blog.id}`,
    changedBlog,
    config,
  );
  return response.data;
};

const del = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, create, setToken, updateLike, del };
