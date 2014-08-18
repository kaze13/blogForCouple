var crypto = require('crypto');
var mongoose = require('./mongoose');

function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
}

var userSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    head: String
}, {
    collection: 'users'
});

var userModel = mongoose.model('User', userSchema);


User.prototype.save = function (callback) {
    var md5 = crypto.createHash('md5'),
        email_MD5 = md5.update(this.email.toLowerCase()).digest('hex'),
        head = "http://www.gravatar.com/avatar/" + email_MD5 + "?s=48";

    var newUser = new userModel({
        name: this.name,
        password: this.password,
        email: this.email,
        head: head
    });

    newUser.save(function (err, user) {
        callback(err, user);
    });
};

User.get = function (name, callback) {
    userModel.findOne({name: name}, function (err, user) {
        callback(err, user);
    });
};

module.exports = User;