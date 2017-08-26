import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Base from "./Base";
import Icon from "./Icon";
import Utils from "../tools/Utils";
import "../styles/Link.scss";

class Link extends Base{
    
    //Component type
    componentType = "Link";

    //Context params types declaration from parent and Menu
    static contextTypes = {        
        apcIsMobile: React.PropTypes.bool,
        apcMenuHeight: React.PropTypes.string
    };

    //Draw Component
    render(){
        return(
            <a
                className={this.displayClass("")}
                onClick={this.handleClick}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
                style={{
                    ...this.props.style ? this.props.style : {},
                    borderBottom: this.context.apcIsMobile ? "1px solid #e0e0e0" : "none",
                    width: this.context.apcIsMobile ? "120%" : "auto"
                }}
            >
                {
                    this.props.icon &&
                    <Icon
                        name={this.props.icon}
                        className={this.displayClass("Icon")}
                    />
                }
                <span>{this.props.label}</span>
            </a>
        );
    }
}

export default withRouter(Link);