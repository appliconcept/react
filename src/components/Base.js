import React, {Component} from "react";
import Utils from "../tools/Utils";
import { Elems } from "../tools/Settings";

export default class Base extends Component{
    
    componentType = "DefaultType";

    constructor(props){
        super(props);
        this.state = {
            display: {},
            status: {
                active: this.props.to && this.props.location && this.props.location.pathname == this.props.to ? true : false,
                hover: false
            }
        };
    }

    //Handle default and user click event
    handleClick = (event)=>{
        
        //If componentType is Link
        if(this.componentType == "Link"){

            //Si props "to"
            if(this.props.to){
                this.props.history.push(this.props.to);
            }

        }else{

            let newStatus = {
                ...this.state.status,
                active: !this.state.status.active
            };
    
            //Default function : Update Styles and classes
            this.updateStylesClasses(this.props, newStatus);
        }

        //User custom function
        if(this.props.onClick){
            this.props.onClick(event);
        }
    }

    //Handle default and user mouseover event
    handleMouseOver = (event)=>{
        let newStatus = {
            ...this.state.status,
            hover: true
        };

        //Default function : Update Styles and classes
        this.updateStylesClasses(this.props, newStatus);

        //User custom function
        if(this.props.onMouseOver){
            this.props.onMouseOver(event);
        }
    }

    //Handle default and user mouseout event
    handleMouseOut = (event)=>{
        let newStatus = {
            ...this.state.status,
            hover: false
        };

        //Default function : Update Styles and classes
        this.updateStylesClasses(this.props, newStatus);

        //User custom function
        if(this.props.onMouseOut){
            this.props.onMouseOut(event);
        }
    }

    //Update styles and classes when component is mounted
    componentDidMount(){
        this.updateStylesClasses(this.props, this.state.status);
    }

    //Update styles and classes when component receives new props or nex context
    componentWillReceiveProps = (nextProps)=>{
        if(nextProps !== this.props){
            let active = this.state.status.active;
            if(this.componentType == "Link"){
                active = nextProps.to && nextProps.location && nextProps.location.pathname == nextProps.to ? true : false;
            }
            let nextStatus = {
                ...this.state.status,
                active: active
            };
            this.updateStylesClasses(nextProps, nextStatus);
        }
    }

    //Define component classes to later update state
    getClassNames = (props, status)=>{
        let base = "apc" + this.componentType;
        let classes = {};
        let adduser = false;
        Elems.map((elem)=>{
            adduser = (elem == "Container") ? true: false;
            classes["champ"+elem+"Class"] = Utils.applyClass( base + elem, props, status, adduser);
        });
        return classes;
    }

    //Attach a specific class to component
    displayClass = (name)=>{
        name = "champ"+name+"Class";
        return this.state.display[name] ? this.state.display[name] : "";
    }

    //Update state, including classes and styles
    updateStylesClasses = (props, status)=>{
        let classes = this.getClassNames(props, status);
        this.setState({
            display: {
                ...classes
            },
            status: status
        });
    }

    //Default rendering function
    render(){
        return(
            <div>{this.props.children}</div>
        );
    }
}