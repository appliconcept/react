import React, { Component } from "react";
import CheckboxGroup from "./CheckboxGroup";
import Input from "./Input";
import RadioGroup from "./RadioGroup";
import Submit from "./Submit";
import Utils from "../tools/Utils";

export default class Form extends Component{
    
    values = {};
    valids = {};
    childType = [RadioGroup, CheckboxGroup, Input];

    //State par default
    constructor(props){
        super(props);
        this.state = {
            children: []
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
            for(let v in this.valids){
                if(!this.valids[v]){
                    isValid = false;
                }
            }
            if(!isValid){
                this.setState({children: Utils.recursiveReactClone(this.props.children, this.addChildrenPropsSubmitted)}, ()=>{
                    this.props.onSubmit(isValid, this.values);
                });
            }else{
                this.props.onSubmit(isValid, this.values);
            }
        }
    }

    //Mettre a jour les valeurs du Form par les enfants
    updateValues = (child)=>{
        this.values[child.name] = child.value;
        this.valids[child.name] = child.valid;
    }

    //Permettre aux children de "updateForm" et "submit"
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

    //Afficher les erreurs des children quand "submitted"
    addChildrenPropsSubmitted = (child) => {
        if(this.childType.find(el => el ==child.type)){
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