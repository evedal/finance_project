/**
 * Created by evend on 2/12/2017.
 */
var bookshelf = require('../utils/db/db').getBookshelf();

var Post = bookshelf.Model.extend({
    tableName: 'post'
});
