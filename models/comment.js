/**
 * Created by kaze13 on 2014/6/28.
 */
var mongodb = require('./db');
//var mongodb = mongodb = require('mongodb').Db;
//var settings = require('../settings');

function Comment(name, day, title, comment) {
    this.name = name;
    this.day = day;
    this.title = title;
    this.comment = comment;
}

module.exports = Comment;

Comment.prototype.save = function (callback) {
    var name = this.name,
        day = this.day,
        title = this.title,
        comment = this.comment;
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.update({
                "name": name,
                "time.day": day,
                "title": title
            }, {
                $push: {"comments": comment}
            }, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};