import cookie from 'react-cookie';
import events from 'events';
export default new class User extends events.EventEmitter{

    getUser(){
        let user = sessionStorage.getItem("user");
        user = user ? JSON.parse(user) : "";
        console.log(user);
        return user;
    }
    setUser(user){
        user = user ? JSON.stringify(user) : "";
        console.log(user)
        sessionStorage.setItem("user", user);
        this.emit('change', user);

    }
    getToken(){
        return cookie.load("access_token");
    }
    setToken(token){
        cookie.save("access_token", token, {path: "/"});
    }
    clear(){
        this.setToken("");
        this.setUser("");
    }
}