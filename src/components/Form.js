import React, { Component } from "react";
import CheckboxGroup from "./CheckboxGroup";
import Input from "./Input";
import RadioGroup from "./RadioGroup";
import Submit from "./Submit";
import Textarea from "./Textarea";
import Utils from "../tools/Utils";

export default class Form extends Component{
    
    values = {};
    valids = {};
    childType = [CheckboxGroup, Input, RadioGroup, Textarea];

    //Default state
    constructor(props){
        super(props);
        this.state = {
            children: []
        }
    }

    //Draw children when component is mounted
    componentDidMount = ()=>{
        this.setState({
            children: Utils.recursiveReactClone(this.props.children, this.addChildrenPropsUpdateSubmit)
        });
    }

    //Validate and submit values
    submit = ()=>{
        if(this.props.onSubmit){
            let isValid = true;
            for(let v in this.valids){
                if(!this.valids[v]){
                    isValid = false;
                }
            }
            if(!isValid){
                this.setState({children: Utils.recursiveReactClone(this.props.children, this.addChildrenPropsSubmitted)});
            }
            this.props.onSubmit(isValid, this.values);
        }
    }

    //Used by children to update forms values
    updateValues = (child)=>{
        this.values[child.name] = child.value;
        this.valids[child.name] = child.valid;
    }

    //Add function updateForm and Submit as props to corresponding children
    addChildrenPropsUpdateSubmit = (child) => {
        if(this.childType.find(el => el ==child.type)){
            return React.cloneElement(child, {
                updateForm: this.updateValues
            });
        }else if(child.type === Submit){
            return React.cloneElement(child, {
                onClick: this.submit
            });
        }else{
            return child;
        }
    }

    //Adds submitted properties to children when user/dev clicks on Submit component
    addChildrenPropsSubmitted = (child) => {
        if(this.childType.find(el => el == child.type)){
            return React.cloneElement(child, {
                submitted: true,
                updateForm: this.updateValues
            });
        }else if(child.type === Submit){
            return React.cloneElement(child, {
                onClick: this.submit
            });
        }else{
            return child;
        }
    }

    //Rendrer components and children
    render(){
        return(
            <div
                className={"apcForm" + (this.props.className ? " "+this.props.className : "")}
                style={ this.props.style ? this.props.style : {} }
            >
                {this.state.children}
            </div>
        );
    }
}