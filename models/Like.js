var bookshelf = require('../utils/db').getBookshelf();

var Like = bookshelf.Model.extend({
    tableName: 'like',
    postLike : function(){
        "use strict";
        return this.morphOne(PostLike)
    }
    });

module.exports = {
    Like: Like
};