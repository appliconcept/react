import React, { Component } from "react";
import Icon from "./Icon";
import Utils from "../tools/Utils";
import "../styles/Button.scss";

export default class Button extends Component{
    //Default handle click function
    handleClick = (event)=>{
        if( !this.props.disabled && !this.props.readonly){
            
            //User onclick
            if(this.props.onClick){
                this.props.onClick(event);
            }
        }
    }

    //Draw Component
    render(){
        let champClass = Utils.applyClass("apcButton", this.props, false, true);
        let champIconClass = Utils.applyClass("apcButtonIcon", this.props, false);
        let champStyle = this.props.style ? this.props.style : {};
        return(
            <button
                className={champClass}
                disabled={(this.props.disabled | this.props.readonly) ? "disabled" : ""}
                onClick={this.handleClick}
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