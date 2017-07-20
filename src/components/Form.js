import React, { Component } from "react";
import CheckboxGroup from "./CheckboxGroup";
import Input from "./Input";
import RadioGroup from "./RadioGroup";
import Submit from "./Submit";
import Utils from "../tools/Utils";

export default class Form extends Component{
    
    //State par default
    constructor(props){
        super(props);
        this.state = {
            children: [],
            values: {},
            valids: {}
        }
    }

    //Action quand Form est "Mounted"
    componentDidMount = ()=>{
        this.setState({
            children: Utils.recursiveReactClone(this.props.children, this.addChildrenPropsUpdateSubmit)
        });
    }

    //Valider et envoyer le Form
    submit = ()=>{
        if(this.props.onSubmit){
            let isValid = true;
            for(let v in this.state.valids){
                if(!this.state.valids[v]){
                    isValid = false;
                }
            }
            if(!isValid){
                let childrenMixed = Utils.recursiveReactClone(this.props.children, this.addChildrenPropsSubmitted);
                this.setState({children: childrenMixed}, ()=>{
                    this.props.onSubmit(isValid, this.state.values);
                });
            }else{
                this.props.onSubmit(isValid, this.state.values);
            }
        }
    }

    //Mettre a jour les valeurs du Form
    updateValues = (child)=>{
        let newState = {...this.state}
        newState.values[child.name] = child.value;
        newState.valids[child.name] = child.valid;
        this.setState(newState);
    }

    //Les champs autorises dans les formulaires
    champAutorises = (type)=>{
        if(type === CheckboxGroup){ return true; }
        if(type === Input){ return true; }
        if(type === RadioGroup){ return true; }
        return false;
    }

    //Permettre aux children de "updateForm" et "submit"
    addChildrenPropsUpdateSubmit = (child) => {
        if(this.champAutorises(child.type)){
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

    //Afficher les erreurs des children quand "submitted"
    addChildrenPropsSubmitted = (child) => {
        if(this.champAutorises(child.type)){
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

    //Afficher le composant
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