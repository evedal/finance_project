var Company = require('../models/Company');


function createCompany(company, callback){
    "use strict";
    //Check if all required fields are present
    if(!company.ticker || !company.name ||!company.description || !company.segment_id){
        return callback({message: "Missing required fields", status : 400});
    }

    //Check if ticker matches common ticker requirements
    if(!(company.ticker > 0 && company.ticker < 10) || !/[^A-Z0-9]/.test(company.ticker)){
        return callback({message: "Invalid ticker", status: 400});
    }
    company.ticker = company.ticker.toUpperCase();

    if(company.name < 2 && company.name > 100){
        return callback({message: "Invalid name", status: 400});
    }
    if(company.description < 20 && company.description > 1000){
        return callback({message: "Description needs to be between 20 and 1000 characters", status: 400});
    }

    Company.create(company, function (err, result) {
        if(err){
            return callback({message: "Issue creating company, perhaps it already exsists", status: 400})
        }
        return callback(null, result);
    });

}

module.exports = {
    create: createCompany,
};
