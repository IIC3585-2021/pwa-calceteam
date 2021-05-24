const bodyParser = require('body-parser');
const express = require('express');
const UsersController = require('./controllers/UsersController.js');
const PostsController = require('./controllers/PostsController.js');
const app = express();
const port = 3000;

app.use(bodyParser.json());
UsersController(app);
PostsController(app);
// We tell express to serve the folder public as static content
app.use(express.static('public'));
app.get('/public');

app.listen(port, () => console.log(`Listening on port ${port}!`));
