
const posts = [
	{
		id: 1,
		content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
		user_id: 1,
	},
];

module.exports = {
	all: () => [...posts].reverse(),
	get: (postId) => posts.find(({id}) => id == postId),
	add: (post) => {
		posts.push({...post, id: posts.length + 1});
		return posts[posts.length - 1];
	},
	delete: (postId) => posts.splice(posts.findIndex(({id}) => id == postId), 1),
	update: (post) => {
		postIndex = posts.findIndex(({id}) => id == postId);
		if (postIndex != -1) {
			posts[postIndex] = { ...posts[postIndex], ...post };
		}
	},
	getByUserId: (userId) => posts.filter(({user_id}) == userId),
};