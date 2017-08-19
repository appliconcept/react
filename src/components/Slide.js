import React, {Component} from "react";

export default class Slide extends Component{

    defaultStyle = {
        position: "absolute",
        display: "block",
        width: "100%",
        height: "100%",
        top: "0px",
        left: "0px",
        WebkitTransition: "all",
        transition: "all"
    };
    interval = null;
    position = 0;

    constructor(props){
        super(props);
        this.state = { style: this.defaultStyle };
    }

    //Action when component is mounted
    componentDidMount = ()=>{
        this.start(this.props);
    }

    //Action when component received new props
    componentWillReceiveProps = (nextProps)=>{
        this.start(nextProps);
    }

    //Start / Stop animation 
    start = (props)=>{

        //Clear interval
        clearInterval(this.interval);

        //Set default position depending on animation
        if(props.animation == "slide"){ this.slideDefaultPosition(props); }
        if(props.animation == "fade"){ this.fadeDefaultPosition(props); }

        //If not paused
        if(!props.paused){

            //Lancer l'animation
            this.interval = setInterval(()=>{
                this.animate(props);
            }, props.animationdelay);
        }
    }

    //Animate slide
    animate = (props)=>{

        //Default style for animation
        let finalStyles = { ...this.state.style };

        //Get slide styles dependings on animation type (slide, fade ....)
        if(props.animation === "slide"){ finalStyles = this.slide(props, finalStyles); }
        if(props.animation === "fade"){ finalStyles = this.fade(props, finalStyles); }

        //Set style
        this.setState({ style: finalStyles });        
    }

    //Slide animation
    slideDefaultPosition = (props)=>{
        //Default styles
        let styles = { ...this.defaultStyle };

        //Prop to modify
        let prop = props.direction ? props.direction : "left";
        prop = props.direction && props.direction === "right" ? "left" : prop;
        prop = props.direction && props.direction === "bottom" ? "top" : prop;

        //Get sign
        let sign = "-";
        if(props.direction && (props.direction !== "left" && props.direction !== "top")){
            sign = "+";
        }

        //Get position using props.cle && props.index
        this.position = props.cle - props.index;
        if(sign === "+"){
            this.position = this.position * -1;
            if(props.cle < props.index){
                this.position = this.position - props.nbChildren;
            }
        }else{
            if(props.cle < props.index){
                this.position = this.position + props.nbChildren;
            }
        }

        //Change position in styles
        styles[prop] = (this.position * 100) + "%";
        styles["WebkitTransitionDuration"] = "0ms";
        styles["transitionDuration"] = "0ms";

        //Update state so default styles apply onload
        this.setState({style: styles});
    }
    slide = (props, styles)=>{

        //Prop to modify
        let prop = props.direction ? props.direction : "left";
        prop = props.direction && props.direction === "right" ? "left" : prop;
        prop = props.direction && props.direction === "bottom" ? "top" : prop;

        //Get sign
        let sign = "-";
        if(props.direction && (props.direction !== "left" && props.direction !== "top")){
            sign = "+";
        }

        //Get new position
        styles["zIndex"] = 100;
        if(sign === "+"){
            this.position++;
            if(this.position > 1){
                this.position = (props.nbChildren - 2) * -1;
                styles["zIndex"] = 50;
            }
        }else{
            this.position--;
            if(this.position < -1){
                this.position = (props.nbChildren - 2);
                styles["zIndex"] = 50;
            }
        }

        //Change position in styles
        styles[prop] = (this.position * 100) + "%";
        styles["WebkitTransitionDuration"] = props.animationduration + "ms";
        styles["transitionDuration"] = props.animationduration + "ms";

        //Update index parent
        if(this.position == 0){
            this.props.updateIndex(props.cle);
        }
        //Return final styles
        return styles;
    }

    //Fade animation
    fadeDefaultPosition = (props)=>{
        let styles = {...this.defaultStyle};
        styles["zIndex"] = 50;
        styles["opacity"] = 0;
        styles["WebkitTransitionDuration"] = "0ms";
        styles["transitionDuration"] = "0ms";

        this.position = props.cle - props.index;
        this.position = this.position * -1;
        if(props.cle < props.index){
            this.position = this.position - props.nbChildren;
        }
                
        if(this.position == 0){
            styles["zIndex"] = 100;
            styles["opacity"] = 1;
        }
        this.setState({style: styles});
    }
    fade = (props, styles)=>{
        
        //Get new position and styles
        styles["zIndex"] = 50;
        styles["opacity"] = 0;
        styles["WebkitTransitionDuration"] = props.animationduration + "ms";
        styles["transitionDuration"] = props.animationduration + "ms";
        this.position++;
        if(this.position > 1){
            this.position = (props.nbChildren - 2) * -1;
        }
        
        //Update parent and change opacity for position 0
        if(this.position == 0){
            styles["zIndex"] = 100;
            styles["opacity"] = 1;
            this.props.updateIndex(props.cle);
        }

        //Return final styles
        return styles;
    }

    //Display slider
    render(){
        return(
            <div className="apcSlide" style={{
                ...this.state.style,
                ...this.props.style ? this.props.style : {}
            }}>
                {this.props.children}
            </div>
        );
    }
}