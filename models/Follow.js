const follows = [
	{
		id: 1,
		user_id: 1,
		follower_id: 1,
	},
];

module.exports = {
	all: () => [...follows],
	get: (followId) => follows.find(({id}) => id == followId),
	add: (follow) => {
		follows.push({...follow, id: follows.length + 1});
		return follows[follows.length - 1];
	},
	delete: (followId) => follows.splice(follows.findIndex(({id}) => id == followId), 1),
	update: (follow) => {
		followIndex = follows.findIndex(({id}) => id == followId);
		if (followIndex != -1) {
			follows[followIndex] = { ...follows[followIndex], ...follow };
		}
	},
	getByUserId: (userId) => follows.filter(({user_id}) => user_id == userId),
	getByFollowerId: (followerId) => follows.filter(({follower_id}) => follower_id == followerId),
};