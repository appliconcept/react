import React, {Component} from "react";
import Utils from "../tools/Utils";
import {Sizes, Screens} from "../tools/Settings";
import "../styles/App.scss";

export default class App extends Component{
    
    //Context params types declaration for children
    static childContextTypes = {        
        apcHeight: React.PropTypes.number,
        apcIndex: React.PropTypes.number,
        apcScreen: React.PropTypes.number,
        apcSize: React.PropTypes.string,        
        apcWidth: React.PropTypes.number
    };

    //Define default state
    constructor(props){
        super(props);
        this.state = {
            apcHeight: 0,
            apcIndex: 0,
            apcScreen: 992,
            apcSize: "Large",            
            apcWidth: 0
        }
    }

    //Pass context to children
    getChildContext = ()=>{
        return {            
            apcHeight: this.state.apcHeight,
            apcIndex: this.state.apcIndex,            
            apcScreen: this.state.apcScreen,
            apcSize: this.state.apcSize,
            apcWidth: this.state.apcWidth            
        }
    }

    //Get dimensions when component is first loaded and add event listner
    componentDidMount = ()=>{
        //MOBILE: TO CHANGE
        window.addEventListener("resize", this.getContainerSize);

        //OK TO KEEP
        this.getContainerSize();
    }

    //Get container sizes (body on windows, something else on mobile)
    getContainerSize = ()=>{
        //MOBILE: TO CHANGE
        let apcWidth = document.body.clientWidth;
        let apcHeight = document.body.clientHeight;

        //OK TO KEEP
        let apcIndex = Screens.findIndex((el, i)=>{
            let min = el;
            let max = Screens[i+1] ? Screens[i+1] : 10000000;
            return apcWidth >= min && apcWidth < max;
        });
        let apcSize = Sizes[apcIndex];
        let apcScreen = Screens[apcIndex];
        this.setState({
            apcWidth,
            apcHeight,
            apcSize,
            apcScreen,
            apcIndex
        });
    }
    
    //Default rendering component
    render(){
        return(
            <div>{this.props.children}</div>
        );
    }
}