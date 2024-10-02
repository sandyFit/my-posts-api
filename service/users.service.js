const db = require('../config/db.config');

exports.register = (data, callback) => {
    db.query(
        "INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)",
        [data.firstName, data.lastName, data.email, data.password],
        (err, results, fields) => {
            if (err) {
                return callback(err); // If there's an error, the callback is passed `err`.
            }
            // On success, `null` is passed  as the first argument, which signifies no error.
            return callback(null, "Registration successful"); 
        }
    );
};
