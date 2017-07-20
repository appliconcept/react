import React from "react";
import Champ from "./Champ";
import Icon from "./Icon";
import Radio from "./Radio";
import Utils from "../tools/Utils";
import "../styles/RadioGroup.css";

export default class RadioGroup extends Champ{
    
    //State par default
    constructor(props){
        super(props);
        this.champType = "RadioGroup";
        this.childType = Radio;
    }

    //Definir les classes du champ
    getClassNames = ()=>{
        return {
            champClass      : Utils.applyClass("apc"+this.champType, this.props, this.state, true),
            champIconClass  : Utils.applyClass("apc"+this.champType+"Icon", this.props, this.state),
            champLabelClass : Utils.applyClass("apc"+this.champType+"Label", this.props, this.state),
            champErrorClass : "apc"+this.champType+"ErrorBox"
        };
    }

    //Afficher le composant
    render(){
        return(
            <div
                className={ this.state.champClass ? this.state.champClass : "" }
                style={this.props.style ? this.props.style : {}}
            >
                { 
                    (this.props.icon && this.props.label) &&
                    <Icon
                        name={this.props.icon}
                        className={ this.state.champIconClass ? this.state.champIconClass : "" }
                    />
                }
                { 
                    this.props.label &&
                    <div
                        className={ this.state.champLabelClass ? this.state.champLabelClass : "" }
                    >
                        {this.props.label}
                    </div>
                }
                
                { this.state.children }
                
                {
                    this.state.errorDisplay &&
                    <div
                        className={ this.state.champErrorClass ? this.state.champErrorClass : "" }
                    >
                        { this.state.errorMsg }
                    </div>
                }
            </div>
        );
    }
}