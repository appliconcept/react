import React, {Component} from "react";
import Utils from "../tools/Utils";
import {Sizes, Screens, Grid} from "../tools/Settings";
import Icon from "./Icon";

export default class Menu extends Component{

    //Context params types declaration from parent App
    static contextTypes = {
        apcIndex: React.PropTypes.number
    };

    //Context params types declaration for children
    static childContextTypes = {        
        apcIsMobile: React.PropTypes.bool,
        apcMenuHeight: React.PropTypes.string
    };

    //Default style
    defaultHeight = "50px";
    defaultFlexDirection = "row";
    defaultStyle = {
        alignItems: "center",
        boxSizing: "border-box",
        display: "flex",
        margin: "0 0 0 0",
        padding: "0 0 0 0",
        width: "100%"
    }

    //Defaul state
    constructor(props){
        super(props);
        this.state = {
            isMobile: false,
            isOpen: false,
            height: this.getHeight(),
            flexDirection: this.defaultFlexDirection
        };
    }

    //Pass context to children
    getChildContext = ()=>{
        return {            
            apcIsMobile: this.state.isMobile,
            apcMenuHeight: this.getHeight()    
        }
    }

    //Update styles and classes when component is mounted
    componentDidMount = ()=>{
        this.setIsmobile(this.props, this.context);
    }

    //Update styles and classes when component receives new props or new context
    componentWillReceiveProps = (nextProps, nextContext)=>{
        if(this.props !== nextProps | this.context !== nextContext){
            this.setIsmobile(nextProps, nextContext);
        }
    }

    //getHeight
    getHeight = ()=>{
        let height = this.props.style && this.props.style.height ? this.props.style.height : this.defaultHeight;
        height = this.props.height ? this.props.height + "px" : height;
        return height;
    }

    //Update ismobile
    setIsmobile = (props, context)=>{
        let isMobile = this.state.isMobile;
        let size = this.props.mobile ? this.props.mobile : "xsmall";
        let index = Sizes.findIndex((s)=>{
            return s.toLowerCase() === size;
        });
        isMobile = context.apcIndex <= index;
        let flexDirection = isMobile ? "column" : "row"
        this.setState({
            isMobile,
            flexDirection
        });
    }

    //Open | Close menu when in mobile mode
    toggleOpen = ()=>{
        let isOpen = !this.state.isOpen;
        let height = this.getHeight();
        if(isOpen){
            height = "auto";
        }
        this.setState({
            isOpen: isOpen,
            height: height 
        });
    }

    //Render Menu
    render(){
        return(
            <div
                className={this.props.className ? this.props.className : ""}
                style={{
                    ...this.defaultStyle,
                    ...this.props.style ? this.props.style : {},
                    flexDirection: this.state.flexDirection,
                    height: this.state.height
                }}
            >
                {this.props.children}
                {
                    this.state.isMobile &&
                    <Icon
                        name="bars"
                        onClick={this.toggleOpen}
                        style={{
                            fontSize: parseInt(this.getHeight()) / 1.5 + "px",
                            left: "0px",
                            marginTop: "-" + (parseInt(this.getHeight()) / 1.5) /2 + "px",
                            position: "absolute",
                            top: ((parseInt(this.getHeight()) / 2)) + "px"                                                      
                        }}
                    />                    
                }
            </div>
        );
    }
}