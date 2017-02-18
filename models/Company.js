var pool = require("../utils/db").pool;
const sqlGetCompany = "SELECT * FROM company WHERE company_id = ?";

function getCompanyById(company_id, callback){
    "use strict";
    pool.query(sqlGetCompany, company_id, function (err, company) {
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