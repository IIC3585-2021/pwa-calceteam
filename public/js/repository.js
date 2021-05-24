const SERVER_URL = "https://proyectoprogramacion.vadok.dev";

const getPosts = () => {
    const user = JSON.parse(localStorage.getItem('user'));
	return axios.get(`${SERVER_URL}/posts`, {
		headers: {user_id: user.id},
	});
};

const getUser = (userId) => {
    const user = JSON.parse(localStorage.getItem('user'));
	return axios.get(`${SERVER_URL}/users/${userId}`, {
		headers: {user_id: user.id},
	});
};

const getUsers = () => {
    const user = JSON.parse(localStorage.getItem('user'));
	return axios.get(`${SERVER_URL}/users/`, {
		headers: {user_id: user.id},
	});
};

const addPost = (post) => {
	return axios.post(`${SERVER_URL}/posts`, post);
};

const addFollow = (userId, follow) => {
	return axios.post(`${SERVER_URL}/users/${userId}/follow`, follow);
};

const addLike = (userId, like) => {
	return axios.post(`${SERVER_URL}/users/${userId}/follow`, like);
};

const login = (credentials) => {
	return axios.post(`${SERVER_URL}/login`, credentials);
};

const register = (user) => {
	return axios.post(`${SERVER_URL}/users`, user);
};
