import React, { Component } from "react";
import Utils from "../tools/Utils";
import Validator from "../tools/Validator";

export default class Champ extends Component{

    //Proprietes de classes
    champType = "Champ";
    childType = null;

    //State par default
    constructor(props){
        super(props);
        this.state = {
            children: [],
            error: false,
            errorMsg: "",
            errorDisplay: false,
            touched: false,
            pristine: true,
            value: this.props.value ? this.props.value : ""
        };
    }

    //Recuperer les styles du champ
    getStyles = ()=>{ return {}; }

    //Recuperer les classNames du champ
    getClassNames = ()=>{ return {}; }

    //Definir les classes et les styles
    setClassAndStyles = ()=>{
        this.setState({
            ...this.getStyles(),
            ...this.getClassNames()
        });    
    }

    //Action quand le composant est "Mounted" la 1ere fois
    componentDidMount(){
        this.validateAndUpdateForm();
    }

    //Action quand champ recoit "NewProps"
    componentWillReceiveProps = (nextProps)=>{
        if(nextProps.submitted){
            this.setState({touched: true}, ()=>{
                this.validateAndUpdateForm();
            });
        }else{
            this.validateAndUpdateForm();
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
        this.updateValue(event.target.value);
    }

    //Quels champ sont multivalues
    champMultiValues = (type)=>{
        let multi = ["CheckboxGroup"];
        return multi.find(el => el === type) ? true: false;
    }

    //Mettre a jour la valeur du champ
    updateValue = (value)=>{

        //Si les valeurs sont contenus dans un tableau (Checkboxes, Select multiple)
        if(this.champMultiValues(this.champType)){
            let newValue = [];
            if(this.state.value === ""){
                newValue = [];
            }else{
                newValue = this.state.value;
            }
            if(newValue.find(el=> el === value)){
                newValue = newValue.filter(el=>el !==value);
            }else{
                newValue.push(value);
            }
            value = newValue;
        }

        this.setState({ value:value, touched: true }, ()=>{
             this.validateAndUpdateForm();
        });
        if(this.props.onChange){ this.props.onChange(value); }
    }

    //Valide la valeur du champ et la remonte au parent Form
    validateAndUpdateForm = ()=>{
        //Validation
        let retour = Validator(this.champType, this.state.value, this.props);
        this.setState({
            error: retour.error,
            errorMsg: retour.errorMsg,
            errorDisplay: this.state.touched && retour.error ? true : false
        },()=>{
            this.setClassAndStyles();
            this.redrawChildren();
        });

        //Remonter au parent Form
        if(this.props.updateForm){
            this.props.updateForm({
                name: this.props.name,
                value: this.state.value,
                valid: !retour.error
            });
        }
    }

    //Ajouter les nouvelles props aux children
    addNewPropsToChildren = (child) => {
        
        //Par defaut ajouter la valeur actuel du parent et methode de maj du parent
        let addProps = {};
        addProps["updateParent"] = this.updateValue;
        addProps["parentValue"] = this.state.value;

        //Ajouter "Block", "Disabled", "Readonly", "Rounded", "RoundedMax"
        if(this.props["block"]){ addProps["block"] = true; }
        if(this.props["disabled"]){ addProps["disabled"] = true; }
        if(this.props["readonly"]){ addProps["readonly"] = true; }
        if(this.props["rounded"]){ addProps["rounded"] = true; }
        if(this.props["roundedmax"]){ addProps["roundedmax"] = true; }

        //Ajouter les couleurs
        Utils.colors.forEach((color)=>{
            if( this.props[color.toLowerCase()] ){
                addProps[color.toLowerCase()] = true;
            }
        });

        //Ajouter les tailles
        Utils.sizes.forEach((size)=>{
            if( this.props[size.toLowerCase()] ){
                addProps[size.toLowerCase()] = true;
            }
        });

        //Traiter les enfants
        if(child.type === this.childType){
            return React.cloneElement(child, addProps);
        }else{
            return child;
        }
    }

    //Redessiner les enfants (si champ contient des enfants)
    redrawChildren = (child) => {
        this.setState({
            children: Utils.recursiveReactClone(this.props.children, this.addNewPropsToChildren)
        });
    }

    //Afficher le champ
    render(){
        return(
            <div></div>
        );
    }
}