const spicedPg = require('spiced-pg');
const db = spicedPg(process.env.DATABASE_URL || `postgres:postgres:postgres@localhost:5432/socialnetwork`);

module.exports.registeringUsers = (first_name, last_name, email, hash) => {
	return db.query(`INSERT INTO users (first, last, email, password) values ($1, $2, $3, $4) RETURNING id;`, [
		first_name,
		last_name,
		email,
		hash
	]);
};

module.exports.retrievingPassword = (email) => {
	return db.query(`SELECT password FROM users WHERE email = $1`, [ email ]);
};

module.exports.loggedId = (email) => {
	return db.query(`SELECT id FROM users WHERE email = $1`, [ email ]);
};

module.exports.getUserById = (id) => {
	return db.query(`SELECT id, first, last, profilepicture, bio FROM users WHERE id = $1`, [ id ]);
};

module.exports.addProfilePic = (id, profilepicture) => {
	return db.query(`UPDATE users SET profilepicture=$2 WHERE id = $1 RETURNING profilepicture`, [
		id,
		profilepicture
	]);
};

module.exports.editBio = (id, bio) => {
	return db.query(`UPDATE users SET bio=$2 WHERE id = $1 RETURNING bio`, [ id, bio ]);
};

module.exports.getLastThree = () => {
	return db.query(`SELECT id, first, last, profilepicture FROM users ORDER BY id DESC LIMIT 3`);
};

module.exports.getMatchingUsers = (val) => {
	return db.query(`SELECT id, first, last, profilepicture FROM users WHERE first ILIKE $1 LIMIT 3`, [ val + '%' ]);
};

module.exports.getRelationship = (receiver_id, sender_id) => {
	return db.query(
		`SELECT * FROM friendships
    WHERE (receiver_id = $1 AND sender_id = $2)
    OR (receiver_id = $2 AND sender_id = $1)
  `,
		[ receiver_id, sender_id ]
	);
};

// Don't touch "accepted" boolean yet.
module.exports.addAsFriend = (operans, operator) => {
	return db.query(`INSERT INTO friendships (receiver_id, sender_id) values ($1, $2);`, [ operans, operator ]);
};

module.exports.acceptRequest = (operans, operator) => {
	return db.query(
		`UPDATE friendships SET accepted=true WHERE (receiver_id = $1 AND sender_id = $2) OR (receiver_id = $2 AND sender_id = $1)`,
		[ operans, operator ]
	);
};

module.exports.endFriendship = (operans, operator) => {
	return db.query(
		`DELETE FROM friendships WHERE (receiver_id = $1 AND sender_id = $2) OR (receiver_id = $2 AND sender_id = $1);`,
		[ operans, operator ]
	);
};

module.exports.getWannabes = (id) => {
	return db.query(
		`SELECT users.id, first, last, profilepicture, accepted
        FROM friendships
        JOIN users
        ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND receiver_id = users.id);`,
		[ id ]
	);
};

module.exports.postNewMessage = (message, user) => {
	return db.query(`INSERT INTO messages (message, talker) values ($1, $2) RETURNING *;`, [ message, user ]);
};

module.exports.getLastTenChatMessages = () => {
	return db.query(`SELECT messages.id, message, first, last, profilepicture, messages.created_at
        FROM messages
        JOIN users
        ON (users.id = messages.talker)
        ORDER BY id DESC
        LIMIT 10;`);
};
