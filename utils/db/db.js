var dbConfig = require('dbConfig') //create a file from example to set up your own database



var bookshelf = require('bookshelf')(knex);

function getBookshelf(){
    return bookshelf;
}
module.exports = {
    getBookshelf: getBookshelf
};

