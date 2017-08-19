import React, { Component } from "react";
import Utils from "../tools/Utils";
import { Attrs, Colors, Elems, Sizes } from "../tools/Settings";
import Validator from "../tools/Validator";

export default class Champ extends Component{

    //Classes properties
    champType = "Champ";
    childTypes = [];
    isChampMultiple = false;

    //define default state
    constructor(props){
        super(props);
        this.state = {
            children: [],
            display: {
                error: false,
                errorMsg: "",
                errorDisplay: false,
                touched: false
            },
            value: this.props.value ? this.props.value : ""
        };
    }

    //Update value when component is mounted
    componentDidMount(){
        this.updateValue(this.state.value, false, false);
    }

    //Update value when component receives new props
    componentWillReceiveProps = (nextProps)=>{
        if(nextProps.submitted){
            this.updateValue(this.state.value, true, true);
        }else{
            if(nextProps.value && nextProps.value !== this.state.value){
                this.updateValue(nextProps.value, true, false);
            }
        }
    }

    //Define component styles to later update state
    getStyles = (errorDisplay)=>{
        let styles = {};
        let classes = this.getClassNames(errorDisplay);
        let adduser = false;
        for(let prop in classes){
            adduser = (prop.replace("Class", "Style") == "champContainerStyle") ? true: false;
            styles[prop.replace("Class", "Style")] = {};
            if(adduser){
                styles[prop.replace("Class", "Style")] = {
                    ...styles[prop.replace("Class", "Style")],
                    ...this.props.style ? this.props.style : {}
                };
            }
        }
        return styles;
    }

    //Define component classes to later update state
    getClassNames = (errorDisplay)=>{
        let classes = {};
        let adduser = false;
        Elems.map((elem)=>{
            adduser = (elem == "Container") ? true: false;
            classes["champ"+elem+"Class"] = Utils.applyClass("apc" + this.champType + elem, this.props, errorDisplay, adduser);
        });
        return classes;
    }

    //Attach a specific class to component
    displayClass(name){
        name = "champ"+name+"Class";
        return this.state.display[name] ? this.state.display[name] : "";
    }

    //Attach a specific style to component
    displayStyle(name){
        name = "champ"+name+"Style";
        return this.state.display[name] ? this.state.display[name] : {};
    }

    //Handle onClick action
    handleClick = (event)=>{
        if(this.props.onClick){ this.props.onClick(event); }
    }

    //Handle onFocus action
    handleFocus = (event)=>{
        if(this.props.onFocus){ this.props.onFocus(event); }
    }

    //Handle onClur action
    handleBlur = (event)=>{
        this.handleChange(event);
        if(this.props.onBlur){ this.props.onBlur(event); }
    }

    //Handle onChange action
    handleChange = (event)=>{
        this.updateValue(event.target.value, true);
    }

    //Handle clear action (custom action)
    handleClear = ()=>{
        this.updateValue("::APC_CLEAR_ALL::", true);
    }

    //Update component value, display and state
    updateValue = (value, touched=false, submitted=false)=>{
        
        //Clear value if clear action is triggered
        if(value == "::APC_CLEAR_ALL::"){
            value = "";
            if(this.isChampMultiple){
                value = []; 
            }
        }else{

            //Handle component with multiple values (checkboxes, selects...)
            if(this.isChampMultiple){

                //if value is nor already an array passed from props
                if(!Array.isArray(value)){
                    let newValue = [];
                    if(this.state.value === ""){
                        newValue = [];
                    }else{
                        newValue = this.state.value;
                    }
                    if(newValue.find(el=> el === value)){
                        newValue = newValue.filter(el => el !== value);
                    }else{
                        if(value !== ""){
                            newValue.push(value);
                        }
                    }
                    value = newValue;
                }
            }
        }

        //Validate value (required, mail, phone, currency...)
        let retour = Validator(this.champType, value, this.props);

        //Define new state
        let newState = {
            display: {
                error: retour.error,
                errorMsg: retour.errorMsg,
                errorDisplay: retour.error && touched,
                touched: touched,
                value: value,
                ...this.getClassNames(retour.error && touched),
                ...this.getStyles(retour.error && touched)
            },
            value: value
        };

        //Launch custom onChange passed by user/dev if value changed
        if(value !== this.state.value){
            if(this.props.onChange){
                this.props.onChange(value);
            }
        }
        
        //Update parent component if parent is of type Form
        if(this.props.updateForm){
            this.props.updateForm({
                name: this.props.name,
                value: value,
                valid: !retour.error
            });
        }

        //Test if display or value changed
        if(newState.display !== this.state.display | newState.value !== this.state.value){
            
            //Update state
            this.setState(newState, ()=>{
                
                //Redraw children if multiple values component
                this.redrawChildren();
            });
        }  
    }

    //Add new props to children component defined in this.childTypes
    addNewPropsToChildren = (child) => {
        
        //Add parent value and parent update function
        let addProps = {};
        addProps["updateParent"] = this.updateValue;
        addProps["parentValue"] = this.state.value;

        //Add customs attributes (Required, Rounded, RoundedMax, Block ...)
        Attrs.map((attr)=>{
            if(this.props[attr.toLowerCase()]){
                addProps[attr.toLowerCase()] = true;
            }
        });

        //Add colors props
        Colors.forEach((color)=>{
            if( this.props[color.toLowerCase()] ){
                addProps[color.toLowerCase()] = true;
            }
        });

        //Add sizes props
        Sizes.forEach((size)=>{
            if( this.props[size.toLowerCase()] ){
                addProps[size.toLowerCase()] = true;
            }
        });

        //Update corresponding children with new props
        if(this.childTypes.find( el=>child.type )){
            return React.cloneElement(child, addProps);
        }else{
            return child;
        }
    }

    //Redraw children when updating multiple values component state
    redrawChildren = (child) => {
        if(this.childTypes.length > 0){
            this.setState({
                children: Utils.recursiveReactClone(this.props.children, this.addNewPropsToChildren)
            });
        }
    }

    //Display component, will be replace when this class is extended
    render(){
        return(
            <div></div>
        );
    }
}