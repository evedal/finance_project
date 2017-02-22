var pool = require("../utils/db").pool;
const sqlGetCompany = "SELECT * FROM company WHERE ticker = ?";

function getCompanyById(ticker, callback){
    "use strict";
    console.log(ticker)
    pool.query(sqlGetCompany, ticker, function (err, company) {
        if(err){
            console.log(err);
            return callback(err);
        }
        return callback(null, company);
    })
}

module.exports = {
    findById: getCompanyById
};