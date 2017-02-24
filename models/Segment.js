var db = require("../utils/db");
const sqlGetSegmentByName = "SELECT * FROM segment WHERE name = ?";

function getSegmentByName(name, callback){
    "use strict";
    db.getPool().query(sqlGetSegmentByName, name, function (err, segment) {
        if(err){
            console.log(err);
            return callback(err);
        }
        return callback(null, segment);
    })
}

module.exports = {
    findByName: getSegmentByName
};