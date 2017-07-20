import React, { Component } from "react";
import "../styles/Row.css";

export default class Row extends Component{
    render(){
        let composedClass = "apcRow";
        composedClass += this.props.className ? " "+this.props.className : "";
        return(
            <div
                className={composedClass}
                style={this.props.style}
            >
                {this.props.children}
            </div>
        );
    }
}