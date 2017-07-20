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
    getClassNames = ()=>{
        return{
            champContainerClass : Utils.applyClass("apc"+this.champType+"Container", this.props, this.state, true),
            champClass          : Utils.applyClass("apc"+this.champType, this.props, this.state),
            champClearClass     : Utils.applyClass("apc"+this.champType+"Clear", this.props, this.state),
            champIconClass      : Utils.applyClass("apc"+this.champType+"Icon", this.props, this.state),
            champLabelClass     : Utils.applyClass("apc"+this.champType+"Label", this.props, this.state),
            champErrorClass     : "apc"+this.champType+"ErrorBox"
        };
    }

    //Definir les styles du composant
    getStyles = ()=>{
        return {
            champContainerStyle: this.props.style ? this.props.style : {}
        };
    }

    //Dessiner le champ
    render(){
        return(
            <div
                className={this.state.champContainerClass ? this.state.champContainerClass : ""}
                style={this.state.champContainerStyle? this.state.champContainerStyle : {}}
            >
                {
                    this.props.icon &&
                    <Icon
                        name={this.props.icon}
                        className={this.state.champIconClass ? this.state.champIconClass : ""}
                        style={this.state.champIconStyle ? this.state.champIconStyle : {}}
                    />
                }

                {
                    this.props.label &&
                    <div
                        className={this.state.champLabelClass ? this.state.champLabelClass : ""}
                        style={this.state.champLabelStyle ? this.state.champLabelStyle : {}}
                    >
                        {this.props.label}
                    </div>
                }

                <input
                    className={this.state.champClass ? this.state.champClass : ""}
                    disabled={(this.props.disabled | this.props.readonly) ? "disabled" : ""}
                    onBlur={this.handleBlur}
                    onClick={this.handleClick}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    placeholder={this.props.placeholder}
                    readOnly={(this.props.disabled | this.props.readonly) ? "readonly" : ""}
                    style={this.state.champStyle ? this.state.champStyle : {}}
                    type={(this.props.type && this.props.type === "password") ? "password" : "text"}
                    value={this.state.value}
                />

                {
                    this.props.clear &&
                    <div
                        className={this.state.champClearClass ? this.state.champClearClass : ""}
                        style={this.state.champClearStyle ? this.champClearStyle : {}}
                    >
                        x
                    </div>
                }

                {
                    this.state.errorDisplay &&
                    <div
                        className={this.state.champErrorClass ? this.state.champErrorClass : ""}
                        style={this.state.champErrorStyle ? this.champErrorStyle : {}}
                    >
                        {this.state.errorMsg}
                    </div>
                }
            </div>
        );
    }
}