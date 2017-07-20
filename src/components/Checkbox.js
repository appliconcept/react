import React, { Component } from "react";
import Icon from "./Icon";
import Utils from "../tools/Utils";
import "../styles/Checkbox.css";

export default class Checkbox extends Component{
    constructor(props){
        super(props);
        this.state = {
            checked: this.isChampChecked(this.props),
            champClass: "",
            champClassDot: ""
        };
    }

    //Verifier si champ checked
    isChampChecked(props){
        if(props.parentValue && props.parentValue !== ""){
            return props.parentValue.find(el=>el === props.value);
        }
        return false;
    }

    //Action quand le composant est "Mounted" la 1ere fois
    componentDidMount(){
        this.setClassName();
    }

    //Action quand Checkbox recoit "NewProps"
    componentWillReceiveProps = (nextProps)=>{
        this.setState({
            checked: this.isChampChecked(nextProps)
        },()=>{
            this.setClassName();
        });
    }

    //Action quand Checkbox est "Clicked"
    handleClick = (evt)=>{
        if(this.props.updateParent && !this.props.disabled){
            this.props.updateParent(this.props.value);
        }
    }

    //Definir classes du Checkbox
    setClassName = ()=>{
        let champClass = Utils.applyClass("apcCheckbox", this.props, this.state, true);
        let champClassDot = Utils.applyClass("apcCheckboxDot", this.props, this.state);
        let champContainerClass = Utils.applyClass("apcCheckboxContainer", this.props, this.state);
        let champClassLabel = Utils.applyClass("apcCheckboxLabel", this.props, this.state);

        //Si pas checked mettre la couleur Default
        if(!this.state.checked){
            Utils.colors.forEach((color)=>{
                champClass = champClass.replace("apcCheckbox"+color, "apcCheckboxDefault");
                champClassDot = champClassDot.replace("apcCheckboxDot"+color, "apcCheckboxDotDefault");
            });
        }else{
            //Si pas de couleur utilisateur appliquer la coleur primaire
            let nocolor = true;
            Utils.colors.forEach((color)=>{
                if(this.props[color.toLowerCase()]){
                    nocolor = false;
                }
            });
            if(nocolor){
                champClass = champClass.replace("apcCheckboxDefault", "apcCheckboxPrimary");
                champClassDot = champClassDot.replace("apcCheckboxDotDefault", "apcCheckboxDotPrimary");
            }
        }

        //Mettre a jour les classes dans le state
        this.setState({
            champClass,
            champClassDot,
            champContainerClass,
            champClassLabel
        });
    }
    
    //Dessiner le composant
    render(){
        return(
            <label
                className={ this.state.champContainerClass }
                style={ this.props.style ? this.props.style : {} }
                onClick={ this.handleClick }
            >
                <span className={ this.state.champClass }>
                    {
                        this.state.checked &&
                        <Icon className={this.state.champClassDot} name="check"/>
                    }
                </span>
                <span className={this.state.champClassLabel}>{this.props.label}</span>
            </label>
        );  
    }
}