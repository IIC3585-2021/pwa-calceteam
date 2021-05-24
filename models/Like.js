const likes = [
	{
		id: 1,
		user_id: 1,
		post_id: 1,
	},
];

module.exports = {
	all: () => [...likes],
	get: (likeId) => likes.find(({id}) => id == likeId),
	add: (like) => {
		likes.push({...like, id: likes.length + 1});
		return likes[likes.length - 1];
	},
	delete: (likeId) => likes.splice(likes.findIndex(({id}) => id == likeId), 1),
	update: (like) => {
		likeIndex = likes.findIndex(({id}) => id == likeId);
		if (likeIndex != -1) {
			likes[likeIndex] = { ...likes[likeIndex], ...like };
		}
	},
	getByUserId: (userId) => likes.filter(({user_id}) => user_id == userId),
	getByPostId: (postId) => likes.filter(({post_id}) => post_id == postId),
};