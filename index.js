const express = require('express');
const app = express();
const compression = require('compression');
const db = require('./db');
const cookieSession = require('cookie-session');
const bcrypt = require('./bcrypt');
const csurf = require('csurf');
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const s3 = require('./s3');
const { s3Url } = require('./config');
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: 'localhost:8080 ' });

app.use(compression());

// Static:

app.use(express.static('./public'));

app.use(express.json());

// Upload storage logic:

const diskStorage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, __dirname + '/uploads');
	},
	filename: function(req, file, callback) {
		uidSafe(24).then(function(uid) {
			callback(null, uid + path.extname(file.originalname));
		});
	}
});

const uploader = multer({
	storage: diskStorage,
	limits: {
		fileSize: 3097152
	}
});

// Middleware

const cookieSessionMiddleware = cookieSession({
	secret: `I'm always angry.`,
	maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
	cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());

app.use(function(req, res, next) {
	res.cookie('mytoken', req.csrfToken());
	next();
});

app.use(
	express.urlencoded({
		extended: false
	})
);

// End of the middleware.

if (process.env.NODE_ENV != 'production') {
	app.use(
		'/bundle.js',
		require('http-proxy-middleware')({
			target: 'http://localhost:8081/'
		})
	);
} else {
	app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get('/welcome', function(req, res) {
	if (req.session.userId) {
		res.redirect('/');
	} else {
		res.sendFile(__dirname + '/index.html');
	}
});

// Register route.

app.post('/register', (req, res) => {
	let first_name = req.body.first;
	let last_name = req.body.last;
	let email = req.body.email;
	let password = req.body.password;

	bcrypt.hash(password).then((hash) => {
		db
			.registeringUsers(first_name, last_name, email, hash)
			.then(({ rows }) => {
				req.session.userId = rows[0].id;
				res.json({ success: true });
			})
			.catch((err) => {
				console.log('error happened, maybe user typed an existing-email.', err);
			});
	});
});

// Login route

app.post('/login', (req, res) => {
	let email = req.body.email;
	let submittedPass = req.body.password;
	let userPassword;
	db
		.retrievingPassword(email)
		.then(({ rows }) => {
			userPassword = rows[0].password;
			return userPassword;
		})
		.then((userPassword) => {
			return bcrypt.compare(submittedPass, userPassword);
		})
		.then((areTheSame) => {
			if (areTheSame) {
				db.loggedId(email).then((id) => {
					req.session.userId = id.rows[0].id;
					res.json({ success: true });
				});
			} else {
				res.json({ success: false });
			}
		})
		.catch((error) => {
			console.log('This is catching an error happening in comparing passwords', error);
			res.json({ success: false });
		});
});

app.get('/user', async (req, res) => {
	try {
		const { rows } = await db.getUserById(req.session.userId);
		res.json(rows[0]);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

// Upload route:

app.post('/upload', uploader.single('image'), s3.upload, function(req, res) {
	const imageUrl = `${s3Url}${req.file.filename}`;
	db
		.addProfilePic(req.session.userId, imageUrl)
		.then(function({ rows }) {
			res.json(rows[0]);
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});
});

// Editbio route.

app.post('/editbio', function(req, res) {
	db
		.editBio(req.session.userId, req.body.bio)
		.then(function({ rows }) {
			res.json(rows[0]);
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});
});

// Other users routes:

app.get('/api/user/:id', async (req, res) => {
	if (Number(req.params.id) == req.session.userId) {
		res.json({ redirectMe: true });
	} else {
		try {
			const { rows } = await db.getUserById(req.params.id);
			if (!rows[0]) {
				res.json({ redirectMe: true });
			}
			res.json(rows[0]);
		} catch (err) {
			console.log(err);
			res.sendStatus(500);
		}
	}
});

// FindPeople route:

app.get('/api/users', async (req, res) => {
	try {
		const { rows } = await db.getLastThree();
		res.json(rows);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

app.get('/api/users/:query', async (req, res) => {
	try {
		const { rows } = await db.getMatchingUsers(req.params.query);
		res.json(rows);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

// Friend Buttons and Relationship routes.

app.get('/get-initial-status/:id', async (req, res) => {
	const operans = Number(req.params.id);
	try {
		const { rows } = await db.getRelationship(operans, req.session.userId);
		res.json(rows[0]);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

app.post('/sending-request/:id', async (req, res) => {
	const operans = Number(req.params.id);
	const operator = req.session.userId;
	try {
		const { rows } = await db.addAsFriend(operans, operator);
		res.json(rows[0]);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

app.post('/accepting-request/:id', async (req, res) => {
	const operans = Number(req.params.id);
	const operator = req.session.userId;
	try {
		const { rows } = await db.acceptRequest(operans, operator);
		res.json(rows[0]);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

app.post('/ending-friendship/:id', async (req, res) => {
	const operans = Number(req.params.id);
	const operator = req.session.userId;
	try {
		const { rows } = await db.endFriendship(operans, operator);
		res.json(rows[0]);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

// Friends wannabes route:

app.get('/friends-wannabes/', async (req, res) => {
	const operator = req.session.userId;
	try {
		const { rows } = await db.getWannabes(operator);
		res.json(rows);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

// Logout route:

app.get('/logout', function(req, res) {
	req.session = null;
	res.redirect('/register');
});

// Fall route, don't delete
app.get('*', function(req, res) {
	if (!req.session.userId) {
		res.redirect('/welcome');
	} else {
		res.sendFile(__dirname + '/index.html');
	}
});

server.listen(8080, function() {
	console.log("I'm listening.");
});

// SERVER SIDE SOCKET CODE:

io.on('connection', function(socket) {
	console.log(`socket with the id ${socket.id} is connected NOW`);
	if (!socket.request.session.userId) {
		return socket.disconnect(true);
	}

	const userId = socket.request.session.userId;

	// /* we want to get the last 10 chat messages */

	db.getLastTenChatMessages().then((data) => {
		io.sockets.emit('chatMessages', data.rows);
		console.log('This is the info of the last 10 messages', data);
	});

	socket.on('My amazing chat message', function(newMessage) {
		console.log('My amazing chat NEW message: ', newMessage);
		io.sockets.emit('chatMessage', newMessage);
		db
			.postNewMessage(newMessage, userId)
			.then(function({ rows }) {
				// res.json({ postsuccess: true });
				console.log('The rows from the socket', rows);
			})
			.catch(function(err) {
				console.log(err);
				res.sendStatus(500);
			});
	});
});
