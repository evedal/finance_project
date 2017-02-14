var bookshelf = require('../utils/db').getBookshelf();
var User = bookshelf.Model.extend({
    tableName: 'post',
    hidden: ['hash', 'salt']


});
