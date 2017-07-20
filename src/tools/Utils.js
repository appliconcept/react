import React from "react";

//Sizes
const Sizes = ["Xsmall", "Small", "Medium", "Large", "Xlarge"];

//Colors
const Colors = ["Primary", "PrimaryLight", "PrimaryDark", "Secondary", "SecondaryLight", "SecondaryDark", "Danger", "Success", "Info", "Warning", "Default", "TextColor", "Black", "White"];

//Cloner tout les composant enfants d'un composant parent
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

//Classes
const applySingleClass = function(base, props, addon){
    let loweraddon = addon.toLowerCase();
    return props[loweraddon] ? " " + base + addon : "";
}

const applySizesClass = function(base, props){
    let size = Sizes.find( el => props[el.toLowerCase()] ? true : false );
    size = (size === undefined) ? "Medium" : size;
    return " " + base + size;
}

const applyColorsClass = function(base, props){
    let color = Colors.find( el => props[el.toLowerCase()] ? true : false );
    color = (color === undefined) ? "Default" : color;
    color = props["hollow"] ? color + "Hollow" : color;
    return " " + base + color;
}

const applyIconForcedColorClass = function(base, props){
    let exp = /Icon/;
    if(props["icon"] && base.match(exp)){
        let color = Colors.find( el => props["icon"+el.toLowerCase()] ? true : false );
        if(color !== undefined){
            return " " + base + "Forced" + color;
        }else{
            return "";
        }
    }
    return "";
}

const applyLabelForcedColorClass = function(base, props){
    let exp = /Label/;
    if(props["label"] && base.match(exp)){
        let color = Colors.find( el => props["label"+el.toLowerCase()] ? true : false );
        if(color !== undefined){
            return " " + base + "Forced" + color;
        }else{
            return "";
        }
    }
    return "";
}

const applyPositionClass = function(base, props){
    let size = Sizes.find( el => props[el.toLowerCase()] ? true : false );
    size = (size === undefined) ? "Medium" : size;
    if(props["icon"] && props["label"]){
        return " " + base + size + "Position3";
    }else if(props["icon"]){
        return " " + base + size + "Position1";
    }else if(props["label"]){
        return " " + base + size + "Position2";
    }else{
        return " " + base + size + "Position0";
    }
}

const applyUserClass = function(base, props){
    return props["className"] ? " " + props["className"] : "";
}

const applyClass = function(base, props, state, useradd = false){
    
    let finalClass = base;
    
    //Classes par defaut
    finalClass += applySingleClass(base, props, "Block");
    finalClass += applySingleClass(base, props, "Disabled");
    finalClass += applySingleClass(base, props, "Rounded");
    finalClass += applySingleClass(base, props, "RoundedMax");
    finalClass += applySingleClass(base, props, "Required");
    
    //Tailles et couleurs
    finalClass += applySizesClass(base, props);
    finalClass += applyColorsClass(base, props);
    
    //Couleurs forcees (icon, label)
    finalClass += applyIconForcedColorClass(base, props);
    finalClass += applyLabelForcedColorClass(base, props);
    
    //Position des differents composants
    finalClass += applyPositionClass(base, props);
    
    //Erreurs
    if(state && state.errorDisplay){
        finalClass += " " + base + "Error";
    }

    //Classes utilisateurs
    if(useradd){
        finalClass += applyUserClass(base, props);     
    }

    //Retourner la classe finale
    return finalClass;
}

//Styles
const applySingleStyle = function(base, props, styles, addon){
    let styleName = applySingleClass(base, props, addon);
    styleName = styleName.replace(" ","");
    return styles[styleName] ? styles[styleName] : {};
}

const applySizesStyle = function(base, props, styles){
    let styleName = applySizesClass(base, props);
    styleName = styleName.replace(" ","");
    return styles[styleName] ? styles[styleName] : {};
}

const applyColorsStyle = function(base, props, styles){
    let styleName = applyColorsClass(base, props);
    styleName = styleName.replace(" ","");
    return styles[styleName] ? styles[styleName] : {};
}

const applyDecaleStyle = function(base, props, styles){
    let styleName = applyPositionClass(base, props);
    styleName = styleName.replace(" ","");
    return styles[styleName] ? styles[styleName] : {};
}

const applyUserStyle = function(base, props){
    return props["style"] ? props["style"] : {};
}

const applyStyle = function(base, props, styles, state, useradd = false){
    let finalStyles = {
        ...styles[base],
        ...applySingleStyle(base, props, styles, "Block"),
        ...applySingleStyle(base, props, styles, "Disabled"),
        ...applySingleStyle(base, props, styles, "Rounded"),
        ...applySingleStyle(base, props, styles, "RoundedMax"),
        ...applySizesStyle(base, props, styles),
        ...applyColorsStyle(base, props, styles),
        ...applyDecaleStyle(base, props, styles)
    };
    if(state && state.errorDisplay){
        finalStyles = {
            ...finalStyles
            //Do something for error on mobile  
        };
    }
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
    applyClass : applyClass,
    applyStyle : applyStyle,
    colors : Colors,
    sizes : Sizes,
    recursiveReactClone: recursiveReactClone
}
export default Utils;