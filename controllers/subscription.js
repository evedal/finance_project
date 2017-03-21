var Subscription = require('../models/Subscription');

function addSubs(user, companies, callback) {
    console.log("\n\n\nHER ER JEG\n\n\n")
    let values = [];
    if(companies.length < 1 )return callback(null, true);
    for (let i in companies) {
        console.log(companies[i]);
        if(companies.hasOwnProperty(companies[i]))
            values.push([user.user_id, companies[i].ticker])
    }
    console.log("HER KOMMER VERDIENE SOM SENDER TIL SUBS");
    console.log(values)
    Subscription.create(values, callback);
}
module.exports = {
    addSubs: addSubs,
};
