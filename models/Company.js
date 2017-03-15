var db = require("../utils/db");
const sqlGetCompany = "SELECT * FROM company WHERE ticker = ?";
const sqlCreateCompany = "INSERT INTO company SET ?";
const sqlGetCompanies = "SELECT company.ticker, company.name, company.description, company.segment_id, segment.name as segment_name " +
    "FROM company LEFT JOIN segment ON segment.segment_id = company.segment_id";

function getCompanyById(ticker, callback){
    "use strict";
    db.getPool().query(sqlGetCompany, ticker, function (err, company) {
        if(err){
            console.log(err);
            return callback(err);
        }
        return callback(null, company);
    })
}
function getCompanies(callback){
    "use strict";
    db.getPool().query(sqlGetCompanies, function (err, companies) {
        if(err){
            console.log(err);
            return callback(err);
        }
        return callback(null, companies);
    });
}

function createCompany(payload, callback) {
    db.getPool().query(sqlCreateCompany, payload, function (err, company) {
        if(err){
            console.log(err);
            return callback(err);
        }
        return callback(null, company);
    })
}

module.exports = {
    find: getCompanies,
    findById: getCompanyById,
    create: createCompany
};