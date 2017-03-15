export default {
    traverseJson: function iterJson(json, func){
        "use strict";
        for (let key in obj){
            if (obj.hasOwnProperty(key)){
                if(Array.isArray(obj[key])){
                    for(let item in obj[key]){

                        iterJson(item)
                    }
                }
            }
        }
    }
}