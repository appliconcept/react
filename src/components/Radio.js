import React, { Component } from "react";
import Utils from "../tools/Utils";
import "../styles/Radio.css";

export default class Radio extends Component{
    constructor(props){
        super(props);
        this.state = {
            checked: this.props.parentValue && this.props.parentValue === this.props.value ? true: false,
            champClass: "",
            champClassDot: ""
        };
    }

    //Action quand le composant est "Mounted" la 1ere fois
    componentDidMount(){
        this.setClassName();
    }

    //Action quand Radio recoit "NewProps"
    componentWillReceiveProps = (nextProps)=>{
        this.setState({
            checked: nextProps.parentValue && nextProps.parentValue === nextProps.value ? true: false
        },()=>{
            this.setClassName();
        });
    }

    //Action quand Radio est "Clicked"
    handleClick = (evt)=>{
        if(this.props.updateParent && !this.props.disabled){
            this.props.updateParent(this.props.value);
        }
    }

    //Definir classes du Radio
    setClassName = ()=>{
        let champClass = Utils.applyClass("apcRadio", this.props, this.state, true);
        let champClassDot = Utils.applyClass("apcRadioDot", this.props, this.state);
        let champContainerClass = Utils.applyClass("apcRadioContainer", this.props, this.state);
        let champClassLabel = Utils.applyClass("apcRadioLabel", this.props, this.state);

        //Si pas checked mettre la couleur Default
        if(!this.state.checked){
            Utils.colors.forEach((color)=>{
                champClass = champClass.replace("apcRadio"+color, "apcRadioDefault");
                champClassDot = champClassDot.replace("apcRadioDot"+color, "apcRadioDotDefault");
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
                champClass = champClass.replace("apcRadioDefault", "apcRadioPrimary");
                champClassDot = champClassDot.replace("apcRadioDotDefault", "apcRadioDotPrimary");
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
                    { this.state.checked && <span className={this.state.champClassDot}></span> }
                </span>
                <span className={this.state.champClassLabel}>{this.props.label}</span>
            </label>
        );  
    }
}