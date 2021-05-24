const PostModel = require('../models/Post.js');
const LikeModel = require('../models/Like.js');
const UserModel = require('../models/User.js');
const FollowModel = require('../models/Follow.js');

module.exports = (app) => {
	app.get('/posts', (req, res) => {
		const userFollowing = FollowModel.getByFollowerId(req.headers.user_id).map(({user_id}) => user_id);
		const posts = PostModel.all().filter((({user_id}) => userFollowing.includes(user_id)));
		const postsWithUsers = posts.map((post) => ({
			...post,
			user: UserModel.get(post.user_id),
			likes: LikeModel.getByPostId(post.id).length,
		}));
		return res.send(postsWithUsers);
	});

	app.post('/posts/:id/like', (req, res) => {
		return res.send(LikeModel.add({
			post_id: parseInt(req.params.id), 
			user_id: req.body.user_id
		}));
	});

	app.post('/posts', (req, res) => {
		return res.send(PostModel.add(req.body));
	});
}