const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');

const UsersController = require('./controllers/UsersController.js');
const PostsController = require('./controllers/PostsController.js');
const app = express();
const port = 80;


const privateKey = fs.readFileSync('/etc/letsencrypt/live/proyectoprogramacion.vadok.dev/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/proyectoprogramacion.vadok.dev/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/proyectoprogramacion.vadok.dev/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};


app.use(bodyParser.json());
UsersController(app);
PostsController(app);
// We tell express to serve the folder public as static content
app.use(express.static('public'));
app.get('/public');

//app.listen(port, () => console.log(`Listening on port ${port}!`));

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});