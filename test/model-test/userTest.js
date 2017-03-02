var chai = require('chai');
var assert = chai.assert;
var User = require('../../controllers/user');
var UserModel = require('../../models/User');

var createId;
describe('Create User', function () {
    it("should not be able to create empty", function (done) {
        User.create({}, function (result, err) {
            assert.isNotNull(err, "no error when creating empty post");
            done();
        });
    });
    it("should be able to create user", function (done) {
        var data = {
            'first_name' : 'Test',
            'last_name' : 'Test',
            'email' : 'test2@test.no',
            'password' : 'testeste',
            'username' : 'testesten'
        };
        User.create(data, function (err, result) {
            createId = result.user_id;
            console.log(createId)
            assert.isNotNull(result, "error when creating user");
            done();
        });
    });
    it("Should not create duplicate user", function (done) {
        var data = {
            'first_name' : 'Test',
            'last_name' : 'Test',
            'email' : 'test@test.no',
            'password' : 'testeste',
            'username' : 'testeste'
        };
        User.create(data, function (err, result) {
            assert.isNotNull(err, "Issue with create duplicate user");
            done()
        });
    });
    it("Should not create user with short password", function (done) {
        var data = {
            'first_name' : 'Test',
            'last_name' : 'Test',
            'mail' : 'test@test2.no',
            'password' : 'test',
            'username' : 'testeste2'
        };
        User.create(data, function (err, result) {
            assert.isNotNull(err, "Issue with create duplicate user");

            done()
        });
    });
    it("Should log in user", function (done) {
        UserModel.delete(createId, function (err, result) {
            assert.isNotNull(result, "Issue with deleting user");
            done();
        })

    });
    it("Should delete user", function (done) {
        console.log(createId)
        if(createId){
            UserModel.delete(createId, function (err, result) {
                assert.isNotNull(result, "Issue with deleting user");
                done();
            })
        }
    })

});
