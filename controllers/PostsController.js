const PostModel = require("../models/Post.js");
const LikeModel = require("../models/Like.js");
const UserModel = require("../models/User.js");
const FollowModel = require("../models/Follow.js");

var admin = require("firebase-admin");

var serviceAccount = require("./calcetweet-firebase-adminsdk-gopwk-c59e20711e.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

module.exports = (app) => {
	app.get("/posts", (req, res) => {
		const userFollowing = FollowModel.getByFollowerId(
			req.headers.user_id
		).map(({ user_id }) => user_id);
		const posts = PostModel.all().filter(({ user_id }) =>
			userFollowing.includes(user_id)
		);
		const postsWithUsers = posts.map((post) => ({
			...post,
			user: UserModel.get(post.user_id),
			likes: LikeModel.getByPostId(post.id).length,
		}));
		return res.send(postsWithUsers);
	});

	app.post("/posts/:id/like", (req, res) => {
		return res.send(
			LikeModel.add({
				post_id: parseInt(req.params.id),
				user_id: req.body.user_id,
			})
		);
	});

	app.post("/posts", (req, res) => {
		const user = UserModel.get(req.body.user_id);
		const tokens = FollowModel.getByUserId(req.body.user_id).map(
			({ follower_id }) => UserModel.get(follower_id).token
		).filter((token) => token != '');

		if(tokens.length > 0) {

			console.log(tokens);
			const message = {
				notification: {
					title: "Nuevo post",
					body: `${user.name} ha subido un nuevo post.`,
				},
				tokens: tokens,
			};
			console.log(message);
			// Send a message to the device corresponding to the provided
			// registration token.
			admin
				.messaging()
				.sendMulticast(message)
				.then((response) => {
					// Response is a message ID string.
					console.log("Successfully sent message:", response);
				})
				.catch((error) => {
					console.log("Error sending message:", error);
				});

		}
		return res.send(PostModel.add(req.body));
	});
};
