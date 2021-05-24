
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
		user_name: 'jacin3',
		password: 'asd123',
		aboutMe: 'No te pueden hacer bullyng si te lo hacen primero',
		token: '',
	},
	{
		id: 3,
		name: 'Jacinsssto',
		user_name: 'jaciwwwn3',
		password: 'asd123',
		aboutMe: 'No te pueden hacer bullyng si te lo hacen primero',
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
	update: (user) => {
		userIndex = users.findIndex(({id}) => id == userId);
		if (userIndex != -1) {
			users[userIndex] = { ...users[userIndex], ...user };
		}
	},
};