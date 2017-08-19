import React, {Component} from "react";
import Button from "./Button";
import Icon from "./Icon";
import Utils from "../tools/Utils";
import Slide from "./Slide";

export default class Slider extends Component{

    index = 0;
    nbChildren = 0;
    cle = 0;
    paused = false;
    childTypes = [Slide];
    defaultStyle = {
        boxSizing: "border-box",
        display: "block",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        width: "100%"
    };
    defaultControlsStyle = {
        alignItems: "center",
        bottom: "0px",
        display: "flex",
        height: "40px",
        justifyContent: "center",
        left: "0px",
        position: "absolute",
        right: "0px",
        zIndex: "9999"
    }

    constructor(props){
        super(props);
        this.state = { children: [] };
    }

    componentDidMount(){
        this.play();
    }

    componentWillReceiveProps = (nextProps)=>{
        this.drawChildren();
    }

    play = ()=>{
        this.paused = false;

        //Draw children
        this.drawChildren();
    }

    pause = ()=>{
        this.paused = true;

        //Draw children
        this.drawChildren();
    }

    prev = ()=>{
        this.index--;
        if(this.index < 0){
            this.index = this.nbChildren - 1;
        }

        //Draw children
        this.drawChildren();
    }

    next = ()=>{
        this.index++;
        if(this.index > this.nbChildren - 1){
            this.index = 0;
        }

        //Draw children
        this.drawChildren();
    }

    updateIndex = (index)=>{
        this.index = index;
    }

    drawChildren = ()=>{
        this.nbChildren = React.Children.count(this.props.children);
        this.cle = 0;
        this.setState({
            children: Utils.recursiveReactClone(this.props.children, this.addPropsToChildren)
        });
    }

    addPropsToChildren = (child)=>{
        if(this.childTypes.find(ch=>ch === child.type)){
            let newProps = {
                animation: this.props.animation,
                animationduration: this.props.animationduration,
                animationdelay: this.props.animationdelay,
                cle: this.cle,
                direction: this.props.direction,
                index: this.index,
                paused: this.paused,
                nbChildren: this.nbChildren,
                updateIndex: this.updateIndex
            }
            this.cle++;
            return React.cloneElement(child, newProps);
        }else{
            return child;
        }
    }

    render(){
        return(
            <div
                style={{
                    ...this.defaultStyle,
                    ...this.props.style ? this.props.style : {}
                }}>
                {this.state.children}
                {
                    (this.props.controls && (this.props.controls === true || this.props.controls === "true")) &&
                    <div style={{
                        ...this.defaultControlsStyle
                    }}>
                        <Button roundedmax onClick={this.prev} style={{marginRight: "5px", marginLeft: "5px", width: "30px", height: "30px", padding: "0px"}}><Icon name="chevron-left"></Icon></Button>
                        <Button roundedmax onClick={this.pause} style={{marginRight: "5px", marginLeft: "5px", width: "30px", height: "30px", padding: "0px"}}><Icon name="pause"></Icon></Button>
                        <Button roundedmax onClick={this.play} style={{marginRight: "5px", marginLeft: "5px", width: "30px", height: "30px", padding: "0px"}}><Icon name="play"></Icon></Button>
                        <Button roundedmax onClick={this.next} style={{marginRight: "5px", marginLeft: "5px", width: "30px", height: "30px", padding: "0px"}}><Icon name="chevron-right"></Icon></Button>
                    </div>
                }
            </div>
        );
    }


}
