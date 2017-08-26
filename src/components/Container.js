import React, { Component } from "react";
import { Containers } from "../tools/Settings";

export default class Container extends Component{
    
    //Context params types declaration from parent App
    static contextTypes = {        
        apcIndex: React.PropTypes.number
    };

    //Default style
    defaultStyle = {
        boxSizing: "border-box",
        display: "block",
        margin: "auto auto auto auto",
        padding: "0 0 0 0"
    };

    //Default state
    constructor(props){
        super(props);
        this.state = {}
    }

    //Update styles and classes when component is mounted
    componentDidMount(){
        this.setContainerStyles(this.props, this.context);
    }

    //Update styles and classes when component receives new props or next context
    componentWillReceiveProps = (nextProps, nextContext)=>{
        if(this.props !== nextProps | this.context !== nextContext){
            this.setContainerStyles(nextProps, nextContext);
        }
    }

    //Define container styles
    setContainerStyles = (props, context)=>{
        let width = "100%";
        if(!props.fluid){
            width = Containers[context.apcIndex];
        }
        this.setState({
            width
        });
    }

    //Render container
    render(){
        return(
            <div
                className={this.props.className ? this.props.className : ""}
                style={{
                    ...this.defaultStyle,
                    ...this.props.style ? this.props.style : {},
                    width: this.state.width
                }}
            >
                {this.props.children}
            </div>
        );
    }
}