import 'whatwg-fetch';

function getFromApi(url, callback) {
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            if(response.ok){
                response.json().then((json) => {
                    if(json.length > 0) {
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
    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
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
    postToApi as post
}
