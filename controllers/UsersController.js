const UserModel = require('../models/User.js');
const FollowModel = require('../models/Follow.js');
const PostModel = require('../models/Post.js');
const LikeModel = require('../models/Like.js');

module.exports = (app) => {
	app.get('/users', (req, res) => {
		const userFollowing = FollowModel.getByFollowerId(req.headers.user_id).map(({user_id}) => user_id);
		const users = UserModel.all();
		const usersWithData = users.map((user) => ({
			...user,
			followers: FollowModel.getByUserId(user.id).length,
			following: FollowModel.getByFollowerId(user.id).length,
			followed: userFollowing.includes(user.id),
		}));
		return res.send(usersWithData);
	});

	app.get('/users/:id', (req, res) => {
		const userFollowing = FollowModel.getByFollowerId(req.headers.user_id).map(({user_id}) => user_id);
		const user = UserModel.get(req.params.id);
		const posts = PostModel.getByUserId(user.id);
	
		const postsWithUsers = posts.map((post) => ({
			...post,
			user,
			likes: LikeModel.getByPostId(post.id).length,
		}));

		const userWithPosts = {
			...user,
			posts: postsWithUsers,
			followers: FollowModel.getByUserId(req.params.id).length,
			following: FollowModel.getByFollowerId(req.params.id).length,
			followed: userFollowing.includes(user.id),
		}

		return res.send(userWithPosts);
	});

	app.post('/login', (req, res) => {
		const user = UserModel.getByUsername(req.body.user_name);
		if(user && user.password == req.body.password)
			return res.send(user);

		return res.send({error: 'usuario o contraseña inválido'});
	});

	app.post('/users', (req, res) => {
		return res.send(UserModel.add(req.body));
	});

	app.post('/users/:id/follow', (req, res) => {
		return res.send(FollowModel.add({
			user_id: parseInt(req.params.id), 
			follower_id: req.body.follower_id
		}));
	});
}