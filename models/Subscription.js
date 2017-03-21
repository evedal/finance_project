var db = require("../utils/db");

const sqlCreateSubscription = "INSERT INTO user_company (user_id,ticker) VALUES ?";
const sqlRemoveSubscription = "DELETE FROM user_company WHERE ?";

function startSubscription(values, callback){
    "use strict";
    let query = db.getPool().query(sqlCreateSubscription, values, function (err, result) {
        console.log(query.sql);
        if(err || !result){
            return callback(err);
        }
        callback(null, result);
    });
}
function endSubscription(user_id, ticker, callback) {
    "use strict";
    let payload = {
        user_id: user_id,
        ticker: ticker
    };
    let query = db.getPool().query(sqlRemoveSubscription, payload, function (err, result) {
        console.log(query.sql);
        if(err || !result){
            return callback(err);
        }
        callback(null, result);
    });
}


module.exports = {
    create: startSubscription,
    remove: endSubscription
};