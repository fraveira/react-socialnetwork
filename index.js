const express = require('express');
const app = express();
const compression = require('compression');
const db = require('./db');
const cookieSession = require('cookie-session');
const bcrypt = require('./bcrypt');
const csurf = require('csurf');

app.use(compression());

// Static:

app.use(express.static('./public'));

app.use(express.json());

app.use(csurf());

app.use(function(req, res, next) {
	res.cookie('mytoken', req.csrfToken());
	next();
});

// Middleware

app.use(
	cookieSession({
		secret: `I'm always happy.`,
		maxAge: 1000 * 60 * 60 * 24 * 14
	})
);

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

app.post('/register', (req, res) => {
	console.log(req.body.email);
	console.log(req.body.password);
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

// Fall route, don't delete
app.get('*', function(req, res) {
	if (!req.session.userId) {
		res.redirect('/welcome');
	} else {
		res.sendFile(__dirname + '/index.html');
	}
});

app.listen(8080, function() {
	console.log("I'm listening.");
});
