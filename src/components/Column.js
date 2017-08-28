import React, { Component } from "react";
import {Grid, Sizes} from "../tools/Settings";

export default class Column extends Component{

    //Context params types declaration from parent App
    static contextTypes = {        
        apcIndex: React.PropTypes.number
    };

    //Default style
    defaultStyle = {
        boxSizing: "border-box",
        display: "flex",
        margin: "0 0 0 0",
        padding: "0 0 0 0",
        flexBasis: "100%"
    }

    //Default state
    constructor(props){
        super(props);
        this.state = {};
    }

    //Update styles and classes when component is mounted
    componentDidMount(){
        this.setColumnStyles(this.props, this.context);
    }

    //Update styles and classes when component receives new props or next context
    componentWillReceiveProps = (nextProps, nextContext)=>{
        if(this.props !== nextProps | this.context !== nextContext){
            this.setColumnStyles(nextProps, nextContext);
        }
    }

    //Set column styles
    setColumnStyles = (props, context)=>{
        let size = Grid.size;
        Sizes.map((s, i)=>{
            if(this.props[s.toLowerCase()]){
                if(context.apcIndex >= i){
                    size = this.props[s.toLowerCase()];
                }
            }
        });
        let unit = size == Grid.size ? 100 : (100 - Grid.gutter) / Grid.size;
        let flexBasis = unit * size;
        this.setState({
            flexBasis: flexBasis + "%"
        });
    }

    //Render component
    render(){
        return(
            <div
                className={this.props.className ? this.props.className : ""}
                style={{
                    ...this.defaultStyle,
                    ...this.props.style ? this.props.style : {},
                    ...this.props.right ? {justifyContent: "flex-end"} : {},
                    ...this.props.left ? {justifyContent: "flex-start"} : {},
                    ...this.props.center ? {justifyContent: "center"} : {},
                    flexBasis: this.state.flexBasis
                }}
            >
                {this.props.children}
            </div>
        );
    }
}