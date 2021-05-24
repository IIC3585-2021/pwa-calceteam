const UserModel = require('../models/User.js');
const FollowModel = require('../models/Follow.js');

module.exports = (app) => {
	app.get('/users', (req, res) => {
		const users = UserModel.all();
		const usersWithData = users.map((user) => ({
			...user,
			followers: FollowModel.getByUserId(user.id).length,
			following: FollowModel.getByFollowerId(user.id).length,
		}));
		return res.send(usersWithData);
	});

	app.get('/users/:id', (req, res) => {
		return res.send(UserModel.get(req.params.id));
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