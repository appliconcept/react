import React, { Component } from "react";
import Utils from "../tools/Utils";
import { Colors, Sizes } from "../tools/Settings";
import Validator from "../tools/Validator";

export default class Champ extends Component{

    //Proprietes de classes
    champType = "Champ";
    childTypes = [];
    classes = [];
    isChampMultiple = false;

    //State par default
    constructor(props){
        super(props);
        this.state = {
            children: [],
            display: {
                error: false,
                errorMsg: "",
                errorDisplay: false,
                touched: false,
                value: this.props.value ? this.props.value : ""
            }
        };
    }

    //Recuperer les styles du champ
    getStyles = (errorDisplay)=>{
        return {
            champContainerStyle: this.props.style ? this.props.style : {}
        };
    }

    //Recuperer les classNames du champ
    getClassNames = (errorDisplay)=>{
        let base = "apc"+this.champType;
        let elements = {};
        this.classes.map((cl)=>{
            let adduser = (cl == "Container") ? true: false;
            elements["champ"+cl+"Class"] = Utils.applyClass("apc"+this.champType+cl, this.props, errorDisplay, adduser);
        });
        return elements;
    }

    //Afficher les classes
    displayClass(name){
        name = "champ"+name+"Class";
        return this.state.display[name] ? this.state.display[name] : "";
    }

    //Afficher les styles
    displayStyle(name){
        name = "champ"+name+"Style";
        return this.state.display[name] ? this.state.display[name] : {};
    }

    //Action quand le composant est "Mounted" la 1ere fois
    componentDidMount(){
        this.updateValue(this.state.display.value);
    }

    //Action quand champ recoit "NewProps"
    componentWillReceiveProps = (nextProps)=>{
        if(nextProps.submitted){
            this.updateValue(this.state.display.value, true, true);
        }else{
            this.updateValue(nextProps.value ? nextProps.value : this.state.display.value);
        }
    }

    //Action quand champ est "Clicked"
    handleClick = (event)=>{
        if(this.props.onClick){ this.props.onClick(event); }
    }

    //Action quand champ est "Focus"
    handleFocus = (event)=>{
        if(this.props.onFocus){ this.props.onFocus(event); }
    }

    //Action quand champ est "Blurred"
    handleBlur = (event)=>{
        this.handleChange(event);
        if(this.props.onBlur){ this.props.onBlur(event); }
    }

    //Action quand la valeur du champ est "Changed"
    handleChange = (event)=>{
        this.updateValue(event.target.value, true);
    }

    //Action quand on clear le champ
    handleClear = ()=>{
        this.updateValue("::APC_CLEAR_ALL::", true);
    }

    //Mettre a jour la valeur du champ
    updateValue = (value, touched=false, submitted=false)=>{
        
        //Si effacement du champ
        if(value == "::APC_CLEAR_ALL::"){
            value = "";
            if(this.isChampMultiple){
                value = []; 
            }
        }else{

            //Si les valeurs sont contenus dans un tableau (Checkboxes, Select multiple...)
            if(this.isChampMultiple && !submitted){
                let newValue = [];
                if(this.state.display.value === ""){
                    newValue = [];
                }else{
                    newValue = this.state.display.value;
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

        //Validation
        let retour = Validator(this.champType, value, this.props);

        //Nouveau state
        let display = {
            error: retour.error,
            errorMsg: retour.errorMsg,
            errorDisplay: retour.error && touched,
            touched: touched,
            value: value,
            ...this.getClassNames(retour.error && touched),
            ...this.getStyles(retour.error && touched)
        };

        //Si state different nouveau state
        if(display !== this.state.display){
            
            //Mettre a jour le state
            this.setState({display}, ()=>{
                
                //Redessiner les enfants si champ multiple
                this.redrawChildren();

                //Mettre a jour le parent Form
                if(this.props.updateForm){
                    this.props.updateForm({
                        name: this.props.name,
                        value: value,
                        valid: !retour.error
                    });
                }

                //Executer le onChange passed by User
                if(this.props.onChange){
                    this.props.onChange(value);
                }
            });
        }  
    }

    //Ajouter les nouvelles props aux children
    addNewPropsToChildren = (child) => {
        
        //Par defaut ajouter la valeur actuel du parent et methode de maj du parent
        let addProps = {};
        addProps["updateParent"] = this.updateValue;
        addProps["parentValue"] = this.state.display.value;

        //Ajouter "Block", "Disabled", "Readonly", "Rounded", "RoundedMax"
        if(this.props["block"]){ addProps["block"] = true; }
        if(this.props["disabled"]){ addProps["disabled"] = true; }
        if(this.props["readonly"]){ addProps["readonly"] = true; }
        if(this.props["rounded"]){ addProps["rounded"] = true; }
        if(this.props["roundedmax"]){ addProps["roundedmax"] = true; }

        //Ajouter les couleurs
        Colors.forEach((color)=>{
            if( this.props[color.toLowerCase()] ){
                addProps[color.toLowerCase()] = true;
            }
        });

        //Ajouter les tailles
        Sizes.forEach((size)=>{
            if( this.props[size.toLowerCase()] ){
                addProps[size.toLowerCase()] = true;
            }
        });

        //Traiter les enfants
        if(this.childTypes.find( el=>child.type )){
            return React.cloneElement(child, addProps);
        }else{
            return child;
        }
    }

    //Redessiner les enfants (si champ contient des enfants)
    redrawChildren = (child) => {
        if(this.childTypes.length > 0){
            this.setState({
                children: Utils.recursiveReactClone(this.props.children, this.addNewPropsToChildren)
            });
        }
    }

    //Afficher le champ
    render(){
        return(
            <div></div>
        );
    }
}