var db = require("../utils/db");
const sqlGetSegmentByName = "SELECT * FROM segment WHERE name = ?";
const sqlGetSegments = "SELECT segment_id, segment.name, description, created_date, segment.market_id, market.name as market_name " +
    "FROM segment LEFT JOIN market ON segment.market_id = market.market_id WHERE removed = 0";

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

function getSegments(callback) {
    var query= db.getPool().query(sqlGetSegments, function (err, segments) {
        console.log(query.sql);
        if(err){
            console.log(err);
            return callback(err);
        }
        return callback(null, segments);
    })
}

module.exports = {
    find: getSegments,
    findByName: getSegmentByName
};