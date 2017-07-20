import React, { Component } from "react";
import "../styles/Container.css";

export default class Container extends Component{
    render(){
        let composedClass = "apcContainer";
        if(this.props.fluid){
            composedClass = "apcContainerFluid";
        }
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