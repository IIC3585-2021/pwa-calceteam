const SERVER_URL = 'http://localhost:3000'

const getPosts = () => {
	return axios.get(SERVER_URL + '/posts')
}

const addPost = (post) => {
	return axios.post(SERVER_URL + '/posts', post);
}