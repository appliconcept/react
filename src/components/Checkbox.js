import React, { Component } from "react";
import Icon from "./Icon";
import Utils from "../tools/Utils";
import { Colors } from "../tools/Settings";
import "../styles/Checkbox.scss";

export default class Checkbox extends Component{

    champType = "Checkbox";

    constructor(props){
        super(props);
        this.state = {
            checked: this.isChampChecked(this.props)
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
            if(this.props.onClick){
                this.props.onClick(evt);
            }
        }
    }

    //Definir classes du Checkbox
    setClassName = ()=>{
        let base = "apc"+this.champType;
        let champContainerClass = Utils.applyClass(base+"Container", this.props, false);
        let champClass = Utils.applyClass(base, this.props, false);
        let champDotClass = Utils.applyClass(base+"Dot", this.props, false);
        let champLabelClass = Utils.applyClass(base+"Label", this.props, false);
        
        //Si champ pas coche
        if(!this.state.checked){
            Colors.map((color)=>{
                if(this.props[color.toLowerCase()]){
                    champDotClass = champDotClass.replace(base+"Dot"+color, base+"Dot"+"Default");
                }
            });
        }
        //Mettre la couleur de fond si coche
        else{
            //Si pas de couleur rajoute primary
            let nocolor = true;
            Colors.map((color)=>{
                if(this.props[color.toLowerCase()]){
                    nocolor = false;
                }
            });
            if(nocolor){
                champDotClass = champDotClass.replace(base+"Dot"+"Default", base+"Dot"+"Primary");
            }
        }

        //Mettre a jour le state
        this.setState({
            champContainerClass,
            champClass,
            champDotClass,
            champLabelClass
        })
    }
    
    //Dessiner le composant
    render(){
        return(
            <label
                className={ this.state.champContainerClass ? this.state.champContainerClass : "" }
                style={ this.props.style ? this.props.style : {} }
                onClick={ this.handleClick }
            >
                <span className={ this.state.champClass ? this.state.champClass : "" }>
                    {
                        this.state.checked &&
                        <Icon className={ this.state.champDotClass ? this.state.champDotClass : ""} name="check"/>
                    }
                </span>
                <span className={ this.state.champLabelClass ? this.state.champLabelClass : ""}>{this.props.label}</span>
            </label>
        );  
    }
}