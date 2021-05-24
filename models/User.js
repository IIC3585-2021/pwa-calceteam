
const users = [
	{
		id: 1,
		name: 'Gonzalo',
		user_name: 'chalo',
		password: 'asd123',
		aboutMe: 'A los conejos les gusta el pan, pero no hay que darles mucho',
		token: '',
	},
	{
		id: 2,
		name: 'Jacinto',
		user_name: 'user2',
		password: 'asd123',
		aboutMe: 'Chorrocientos pituto ubicatex huevo duro bolsero cachureo el hoyo del queque en cana huevón el año del loly hacerla corta impeque de miedo quilterry la raja longi ñecla. Hilo curado rayuela carrete quina guagua lorea piola ni ahí.',
		token: '',
	},
	{
		id: 3,
		name: 'Jacinsssto',
		user_name: 'user3',
		password: 'asd123',
		aboutMe: 'Lorem ipsum dolor sit cuchuflí barquillo bacán jote gamba listeilor po cahuín, luca melón con vino pichanga coscacho ni ahí peinar la muñeca chuchada al chancho achoclonar.',
		token: '',
	},
];

module.exports = {
	all: () => [...users],
	get: (userId) => users.find(({id}) => id == userId),
	getByUsername: (username) => users.find(({user_name}) => user_name == username),
	add: (user) => {
		users.push({...user, id: users.length + 1});
		return users[users.length - 1];
	},
	delete: (userId) => users.splice(users.findIndex(({id}) => id == userId), 1),
	update: (userId, user) => {
		userIndex = users.findIndex(({id}) => id == userId);
		if (userIndex != -1) {
			users[userIndex] = { ...users[userIndex], ...user };
		}
	},
};