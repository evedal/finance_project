import cookie from 'react-cookie';
import { get } from '../utils/APImanager';
import User from '../models/User';


// Input = callback(err, user)
// If user has token and data stored in session storage, returns user
// If user has only token, calls API to check if token is valid, gets user data

function isAuthenticated(callback) {

    //find whether token exists
    let token = User.getToken();
    //token = undefined if not found
    if(token){
        //check if user data is already stored in session storage
        let user = User.getUser();

        //if user and token exists, we expect that the user is logged in
        console.log(User.getUser());

        if(user && user.user_id){
            return callback(null, user);
        }
        //if token exists but not user, we send a request to check for a valid token, and store returned user
        get("/api/user", function (err, user) {
            console.log("User   : "+user);
            if(err || !user) {
                return callback(err, false);
            }
            User.setUser(user);
            console.log(User.getUser());
            return callback(null, user);
        });
    }
    return callback(null, false)
}
//Authorization function for react router to check on enter to protected page
function requireAuth(nextState, replace) {
    console.log("HEI")
    isAuthenticated(function (err, user) {
        console.log(err + " HEI igjen "+user)
        if (err || !user) {
            replace({
                pathname: '/login',
                state: {nextPathname: nextState.location.pathname}
            })
        }

    })
}
function requireNotAuth(nextState, replace) {
    isAuthenticated(function (err, user) {
        if(!err || user){
            replace({
                pathname: '/',
            })
        }
    });
}

export default {
    isAuthenticated: isAuthenticated,
    requireAuth: requireAuth
};