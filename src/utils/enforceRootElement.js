import React from 'react';

function isArray(object) {
    var nativeIsArray = Array.isArray;
    var toString = Object.prototype.toString;
    return nativeIsArray(object) || toString.call(object) === '[object Array]';
}
export default function (object, props) {
    let newObject = undefined;

    if(typeof object === "string" || isArray(object)){
        if(!props){
            props = {}
        }

        newObject = <div {...props}>{object}</div>;
    }
    else{
        let newProps = props;
        let newChildren = [];

        if(object.props){
            for(let key in object.props){
                let value = object.props[key];
                if(key === 'children'){
                    newChildren = value;
                }
                else{
                    newProps[key] = value;
                }
            }
        }
        newObject = React.cloneElement(object,newProps,newChildren);
    }
    return newObject;

}