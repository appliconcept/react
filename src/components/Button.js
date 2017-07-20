import React, { Component } from "react";
import Icon from "./Icon";
import Utils from "../tools/Utils";
import "../styles/Button.css";

export default class Button extends Component{
    //Dessiner le composant
    render(){
        let champClass = Utils.applyClass("apcButton", this.props, this.state, true);
        let champIconClass = Utils.applyClass("apcButtonIcon", this.props, this.state);
        let champStyle = this.props.style ? this.props.style : {};
        return(
            <button
                className={champClass}
                disabled={(this.props.disabled | this.props.readonly) ? "disabled" : ""}
                onClick={this.props.onClick ? this.props.onClick : ()=>{}}
                style={champStyle}
            >
                {
                    this.props.icon &&
                    <Icon
                        name={this.props.icon}
                        className={champIconClass}
                    />
                }
                {this.props.icon && " "}
                {this.props.children}
            </button>
        );
    }
}