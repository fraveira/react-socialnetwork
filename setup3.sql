DROP TABLE IF EXISTS messages;

CREATE TABLE messages
(
    id SERIAL PRIMARY KEY,
    message TEXT,
    talker INT NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)