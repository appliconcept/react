import React, {Component} from "react";
import Utils from "../tools/Utils";
import {Sizes, Screens} from "../tools/Settings";

export default class Navigation extends Component{

    //Context params types declaration from parent and Menu
    static contextTypes = {        
        apcIsMobile: React.PropTypes.bool,
        apcMenuHeight: React.PropTypes.string
    };

    //Default style
    defaultStyle = {
        alignItems: "center",
        boxSizing: "border-box",
        display: "flex",
        flex: "1",
        margin: "0 0 0 0",
        padding: "0 0 0 0",
        overflow: "hidden"
    }

    //Default State
    constructor(props){
        super(props);
        this.state = {};
    }

    //Update styles and classes when component is mounted
    componentDidMount = ()=>{
        this.setNavigationStyles(this.props, this.context);
    }

    //Update styles and classes when component receives new props or new context
    componentWillReceiveProps = (nextProps, nextContext)=>{
        if(this.props !== nextProps | this.context !== nextContext){
            this.setNavigationStyles(nextProps, nextContext);
        }
    }

    //Define Navigation styles and classes
    setNavigationStyles = (props, context)=>{
        let height = context.apcMenuHeight;
        let width = "auto";
        if(context.apcIsMobile){
            height = "auto";
            width = "100%";            
        }
        this.setState({
            height,
            width
        });
    }

    //Render Navigation
    render(){
        return(
            <div
                className={this.props.className ? this.props.className : ""}
                style={{
                    ...this.defaultStyle,
                    backgroundColor: this.context.apcIsMobile ? "#f8f8f8" : "transparent",
                    boxShadow: this.context.apcIsMobile ? "inset 0px 0px 8px 0px rgba(50, 50, 50, 0.5)" : "none",
                    flexDirection: this.context.apcIsMobile ? "column" : "row",
                    height: this.state.height,                    
                    marginLeft: this.context.apcIsMobile ? "-10%" : "0",
                    width: this.context.apcIsMobile ? "120%" : this.state.width,
                    ...this.props.style ? this.props.style : {},
                }}
            >
                {this.props.children}
            </div>
        );
    }
}