var chai = require('chai');
var assert = chai.assert;
var Post = require('../../models/Post');
var moment = require('moment');
var createId;
describe('Create Post', function () {
    it("should not be able to create empty", function (done) {
        Post.create({}, function (result, err) {
            assert.isNotNull(err, "no error when creating empty post");
            done();
        });
    });
    it("should be able to create post", function (done) {
        var data = {
            'header' : 'Title',
            'content' : 'Here is the body',
            'created_date' : moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            'user_id' : '1',
            'company_id' : '1'
        };
        Post.create(data, function (err, result) {
            console.log(result);
            createId = result.insertId;
            assert.isNotNull(result, "error when creating post");
            done();
        });
    });
});
describe('Get Post', function () {
    it("Should get posts", function (done) {
        Post.find(function (err, result) {
            console.log(result);
            assert.isNotNull(result, "no error when creating empty post");
            done();
        });
    });
});
describe('Delete Post', function () {
    it("Should be able to delete post", function (done) {
        Post.delete({'post_id' : createId}, function (err, result) {
            assert.isNotNull(result, "error when deleting post");
            done();
        });
    });
});