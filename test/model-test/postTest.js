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
            'ticker' : 'FAR'
        };
        Post.create(data, function (err, result) {
            createId = result.insertId;
            assert.isNotNull(result, "error when creating post");
            done();
        });
    });
    it("Should be able to update post", function (done) {
        Post.update({'header' : 'Title'}, 1, function (err, result) {
            assert.isOk(result, "Post was updated")
            done()

        })
    })
});
describe('Get Post', function () {
    it("Should get posts", function (done) {
        Post.find(function (err, result) {
            assert.isNotNull(result, "no error when creating empty post");
            done();
        });
    });
    it("Should get one post", function (done) {
        Post.findById(1, function (err, result) {
            assert.isNotNull(result, "No error when getting one post")
            done()
        })
    })
    it("Should get posts from company", function (done) {
        Post.findByCompany(1, {}, function (err, result) {
            assert.isNotNull(result, "No error when getting post from company")
            done()
        })
    })
    it("Should get posts from segment", function (done) {
        Post.findBySegment(1, {}, function (err, result) {
            assert.isNotNull(result, "No error when getting post from segment")
            done()
        })
    })
});
describe('Get og data for post', function () {
    it("Should find og data", function (done) {
        Post.getOgData("aftenposten.no", function (err, result) {
            assert.isNotNull(result.success, "Found og data")
            done()

        });
    });
    it("Should not find og data", function (done) {
        this.timeout(4000)
        Post.getOgData("aftenposten", function (err, result) {
            console.log("error: "+err)
            assert.isTrue(err, "Did not find og data")
            done()

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
