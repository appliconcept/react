import React from "react";
import Champ from "./Champ";
import Icon from "./Icon";
import Utils from "../tools/Utils";
import "../styles/Input.css";

export default class Input extends Champ{

    //Definir le type de champ
    constructor(props){
        super(props);
        this.champType = "Input";
    }

    //Definir les classes du composant
    getClassNames = (errorDisplay)=>{
        return{
            champClass          : Utils.applyClass("apc"+this.champType, this.props, errorDisplay),
            champContainerClass : Utils.applyClass("apc"+this.champType+"Container", this.props, errorDisplay, true),
            champClearClass     : Utils.applyClass("apc"+this.champType+"Clear", this.props, errorDisplay),
            champIconClass      : Utils.applyClass("apc"+this.champType+"Icon", this.props, errorDisplay),
            champLabelClass     : Utils.applyClass("apc"+this.champType+"Label", this.props, errorDisplay),
            champErrorClass     : "apc"+this.champType+"ErrorBox"
        };
    }

    //Definir les styles du composant
    getStyles = (errorDisplay)=>{
        return {
            champContainerStyle: this.props.style ? this.props.style : {}
        };
    }

    //Dessiner le champ
    render(){
        return(
            <div
                className={this.state.display.champContainerClass ? this.state.display.champContainerClass : ""}
                style={this.state.display.champContainerStyle? this.state.display.champContainerStyle : {}}
            >
                {
                    this.props.icon &&
                    <Icon
                        name={this.props.icon}
                        className={this.state.display.champIconClass ? this.state.display.champIconClass : ""}
                        style={this.state.display.champIconStyle ? this.state.display.champIconStyle : {}}
                    />
                }

                {
                    this.props.label &&
                    <div
                        className={this.state.display.champLabelClass ? this.state.display.champLabelClass : ""}
                        style={this.state.display.champLabelStyle ? this.state.display.champLabelStyle : {}}
                    >
                        {this.props.label}
                    </div>
                }

                <input
                    className={this.state.display.champClass ? this.state.display.champClass : ""}
                    disabled={(this.props.disabled | this.props.readonly) ? "disabled" : ""}
                    onBlur={this.handleBlur}
                    onClick={this.handleClick}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    placeholder={this.props.placeholder}
                    readOnly={(this.props.disabled | this.props.readonly) ? "readonly" : ""}
                    style={this.state.display.champStyle ? this.state.display.champStyle : {}}
                    type={(this.props.type && this.props.type === "password") ? "password" : "text"}
                    value={this.state.display.value}
                />

                {
                    this.props.clear &&
                    <div
                        className={this.state.display.champClearClass ? this.state.display.champClearClass : ""}
                        style={this.state.display.champClearStyle ? this.display.champClearStyle : {}}
                    >
                        x
                    </div>
                }

                {
                    this.state.display.errorDisplay &&
                    <div
                        className={this.state.display.champErrorClass ? this.state.display.champErrorClass : ""}
                        style={this.state.display.champErrorStyle ? this.display.champErrorStyle : {}}
                    >
                        {this.state.display.errorMsg}
                    </div>
                }
            </div>
        );
    }
}