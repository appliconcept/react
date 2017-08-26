import React, {Component} from "react";
import Utils from "../tools/Utils";
import {Sizes, Screens} from "../tools/Settings";

export default class Logo extends Component{

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
        height: "100%",
        justifyContent: "center",
        margin: "0 0 0 0",
        padding: "0 0 0 0"
    }

    //Default State
    constructor(props, context){
        super(props, context);
        this.state = {};
    }

    //Update styles and classes when component is mounted
    componentDidMount = ()=>{
        this.setLogoStyles(this.props, this.context);
    }

    //Update styles and classes when component receives new props or new context
    componentWillReceiveProps = (nextProps, nextContext)=>{
        if(this.props !== nextProps | this.context !== nextContext){
            this.setLogoStyles(nextProps, nextContext);
        }
    }

    //Define logo width
    setLogoStyles = (props, context)=>{
        let width = "auto";
        if(context.apcIsMobile){
            width = "100%";
        }
        this.setState({
            width
        });
    }

    //Render logo
    render(){
        return(
            <div
                className={this.props.className ? this.props.className : ""}
                style={{
                    ...this.defaultStyle,
                    ...this.props.style ? this.props.style : {},
                    height: this.context.apcMenuHeight,
                    width: this.state.width
                }}
            >
                <img
                    src={this.props.src}
                    alt={this.props.alt ? this.props.alt : ""}
                    style={{
                        height: (parseInt(this.context.apcMenuHeight) - 4) + "px",
                        width: "auto"
                    }}
                />
            </div>
        );
    }
}