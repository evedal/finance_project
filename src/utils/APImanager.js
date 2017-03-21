import 'whatwg-fetch';
import cookie from 'react-cookie';

function addTokenToConfig(cfg) {
    let token = cookie.load("access_token");
    if(token){
        cfg.headers.authorization = "JWT "+token;
    }
    return cfg;
}
function getFromApi(url, callback) {

    let config = addTokenToConfig({
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    fetch(url, config)
        .then(function (response) {
            if(response.ok){
                response.json().then((json) => {
                    console.log(json);
                    console.log(json.length);

                    if(json.length > 0 || !(Object.keys(json).length == 0 && json.constructor === Object)) {
                        return callback(null, json)
                    }
                    else{
                        return callback({message: "Resource not found"})
                    }

                });
                return ({message: "Unable to parse JSON"})
            }
            return(response.message)
        },
            function (err) {
                return(err.message);
        })
}
function postToApi(url, payload, callback) {
    let config = addTokenToConfig({
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)

    });
    fetch(url, config)
        .then(function (response) {
                if(response.ok){
                    response.json().then((json) => {
                        return callback(null, json)
                    });
                    return ({message: "Unable to parse JSON"})
                }
                return(response)
            },
            function (err) {
                return(err.message);
            })
}
function putToApi(url, payload, callback) {
    let config = addTokenToConfig({
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)

    });
    fetch(url, config)
        .then(function (response) {
                if(response.ok){
                    response.json().then((json) => {
                        return callback(null, json)
                    });
                    return ({message: "Unable to parse JSON"})
                }
                return(response)
            },
            function (err) {
                return(err.message);
            })
}
export {
    getFromApi as get,
    postToApi as post,
    putToApi as put
}
