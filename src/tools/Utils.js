import React from "react";
import { Attrs, Colors, ColorsForced, Status, Sizes } from "./Settings";

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
        
    //Base color
    let color = Colors.find( cl => props[cl.toLowerCase()] ? true : false );
    color = (color === undefined) ? "Default" : color;
    
    //Forced color for element
    ColorsForced.map((el)=>{
        let exp = new RegExp(el, "i");
        if(props[el.toLowerCase()] && base.match(exp)){
            Colors.map((cl)=>{
                if(props[el.toLowerCase()+cl.toLowerCase()]){
                    color = cl;
                }
            });
        }
    });

    //Hollow,
    color = props["hollow"] ? color + "Hollow" : color;

    //Return final color
    return " " + base + color;
}

//Apply colors status class to element
const applyColorsStatusClass = function(base, props, stat){
    
    //Base color
    let color = Colors.find( cl => props[cl.toLowerCase()] ? true : false );
    color = (color === undefined) ? "Default" : color;

    //States color for element
    Colors.map((cl)=>{
        if(props[stat.toLowerCase()+cl.toLowerCase()]){
            color = cl
        }
    });

    //Hollow,
    color = props["hollow"] ? color + "Hollow" : color;

    //Return final color
    return " " + base + color + stat;
}

//Apply all class to element (colors, sizes, block, error...)
const applyClass = function(base, props, status, useradd = false, errorDisplay = false, ){
    
    //Base class
    let finalClass = base;
    
    //Base Attributes
    Attrs.map((prop)=>{
        finalClass += applySingleClass(base, props, prop);
    })
    
    //Sizes class
    finalClass += applySizesClass(base, props);
    
    //Colors class
    finalClass += applyColorsClass(base, props);
    Status.map((stat)=>{
        if(status[stat.toLowerCase()] && status[stat.toLowerCase()] === true){
            finalClass += applyColorsStatusClass(base, props, stat);
        }
    });
        
    //Errors
    finalClass += (errorDisplay) ? " " + base + "Error" : "";

    //User class
    finalClass += (useradd) ? ( props["className"] ? " " + props["className"] : "" ) : "";   

    //Final class
    return finalClass;
}

//Export tools
const Utils = {
    applyClass: applyClass,
    applyColorsClass: applyColorsClass,
    applyColorsStatusClass: applyColorsStatusClass,
    recursiveReactClone: recursiveReactClone
}
export default Utils;