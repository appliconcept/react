import React from "react";
import Champ from "./Champ";
import Checkbox from "./Checkbox";
import Utils from "../tools/Utils";
import "../styles/CheckboxGroup.css";

export default class CheckboxGroup extends Champ{
    
    //State par default
    constructor(props){
        super(props);
        this.champType = "CheckboxGroup";
        this.childType = Checkbox;
    }

    //Definir les classes du champ
    getClassNames = ()=>{
        return {
            champClass : Utils.applyClass("apc"+this.champType, this.props, this.state, true)
        };
    }

    //Afficher le composant
    render(){
        return(
            <div
                className={ this.state.champClass ? this.state.champClass : "" }
                style={this.props.style ? this.props.style : {}}
            >
                { this.state.children }
                { this.state.errorDisplay && <div className="apcCheckboxGroupErrorError">{ this.state.errorMsg }</div>}
            </div>
        );
    }
}