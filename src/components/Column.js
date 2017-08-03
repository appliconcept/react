import React, { Component } from "react";
import "../styles/Column.scss";

export default class Column extends Component{
    render(){
        let composedClass = "apcColumn";
        composedClass += this.props.xsmall ? " apcColumnXsmall"+this.props.xsmall : "";
        composedClass += this.props.small ? " apcColumnSmall"+this.props.small : "";
        composedClass += this.props.medium ? " apcColumnMedium"+this.props.medium : "";
        composedClass += this.props.large ? " apcColumnLarge"+this.props.large : "";
        composedClass += this.props.xlarge ? " apcColumnXlarge"+this.props.xlarge : "";
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