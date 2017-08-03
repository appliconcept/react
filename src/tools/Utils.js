import React from "react";
import { Attrs, Colors, ColorsForced, Sizes } from "./Settings";

//Clone child elements and pass new props
const recursiveReactClone = (children, callback)=>{
    return React.Children.map(children, (child) => {
        let newChild = React.cloneElement(child, {});
        if(React.Children.count(newChild.props.children) > 0){
            return callback(React.cloneElement(newChild, {
                children: recursiveReactClone(newChild.props.children, callback)    
            }));
        }else{
            return callback(child);
        }
    });
};

//Apply single class to element
const applySingleClass = function(base, props, addon){
    let loweraddon = addon.toLowerCase();
    return props[loweraddon] ? " " + base + addon : "";
}

//Apply sizes class to element
const applySizesClass = function(base, props){
    let size = Sizes.find( el => props[el.toLowerCase()] ? true : false );
    size = (size === undefined) ? "Medium" : size;
    return " " + base + size;
}

//Apply colors class to element
const applyColorsClass = function(base, props){
    let color = Colors.find( cl => props[cl.toLowerCase()] ? true : false );
    //Base color
    color = (color === undefined) ? "Default" : color;
    //Forced color for element
    ColorsForced.map((el)=>{
        let exp = new RegExp(el, "i");
        if(props[el.toLowerCase()] && base.match(exp)){
            Colors.map((cl)=>{
                if(props[el.toLowerCase()+cl.toLowerCase()]){
                    color = cl;
                }
            })
        }
    });
    //Hollow or not
    color = props["hollow"] ? color + "Hollow" : color;
    //Return final color
    return " " + base + color;
}

//Apply all class to element (colors, sizes, block, error...)
const applyClass = function(base, props, errorDisplay, useradd = false){
    
    //Base class
    let finalClass = base;
    
    //All class but colors and sizes
    Attrs.map((prop)=>{
        finalClass += applySingleClass(base, props, prop);
    })
    
    //Sizes class
    finalClass += applySizesClass(base, props);
    
    //Colors class
    finalClass += applyColorsClass(base, props);
        
    //Errors
    finalClass += (errorDisplay) ? " " + base + "Error" : "";

    //User class
    finalClass += (useradd) ? ( props["className"] ? " " + props["className"] : "" ) : "";   

    //Final class
    return finalClass;
}

//Styles
const applyStyle = function(base, props, styles, errorDisplay=false, useradd = false){
    let finalStyles = {};
    if(useradd){
        finalStyles = {
            ...finalStyles,
            ...applyUserStyle(base, props)
        };
    }
    return finalStyles;
}

//Export tools
const Utils = {
    applyClass: applyClass,
    applyColorsClass: applyColorsClass,
    recursiveReactClone: recursiveReactClone
}
export default Utils;