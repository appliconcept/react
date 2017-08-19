import React , { Component } from "react";
import ReactDOM from 'react-dom';
import moment from "moment";
import { Slide, Slider, Calendar, Textarea, Datepicker, Button, Container, Row, Column, Input, Submit, Form, RadioGroup, Radio, CheckboxGroup, Checkbox, Select, Option } from "./index";
import "./app.scss";

class App extends Component{

    constructor(props){
        super(props);
        this.state = {
            nom: "Natio",
            slidermode: "slide",
            sliderdirection: "left",
            slidercontrols: true,
            valeurs: []
        }
    }

    handleChange = (value)=>{
        this.setState({nom : value});
    }

    handleSliderMode = (value)=>{
        this.setState({slidermode: value}, ()=>{
            //console.log(this.state);
        });
    }

    handleSliderControls = (value)=>{
        this.setState({slidercontrols: value}, ()=>{
            //console.log(this.state);
        });
    }

    handleSliderDirection = (value)=>{
        this.setState({sliderdirection: value}, ()=>{
            //console.log(this.state);
        });
    }

    handleValeurs = (value)=>{
        this.setState({valeurs: value});        
    }

    submit = (isvalid, values)=>{
        console.log(isvalid, values);
    }

    render(){
        return(
            <Container fluid style={styles.containerFluid}>
                <Container>
                    
                        <Row>                        
                            <Column medium="6">
                                <Row>
                                    <Column medium="6">
                                        <Slider animation={this.state.slidermode} controls={this.state.slidercontrols} style={styles.slider} animationduration="500" animationdelay="3000" direction={this.state.sliderdirection}>
                                            <Slide style={{...styles.slide, ...{backgroundColor: "blue"}}}></Slide>
                                            <Slide style={{...styles.slide, ...{backgroundColor: "green"}}}></Slide>
                                            <Slide style={{...styles.slide, ...{backgroundColor: "red"}}}></Slide>
                                            <Slide style={{...styles.slide, ...{backgroundColor: "orange"}}}></Slide>
                                            <Slide style={{...styles.slide, ...{backgroundColor: "yellow"}}}></Slide>
                                        </Slider>
                                    </Column>
                                    <Column medium="6">
                                        <RadioGroup clear icon="cog" label="Slider mode" name="slidermode" value={this.state.slidermode} onChange={this.handleSliderMode} rounded required iconprimary style={styles.mb}>
                                            <Row>
                                                <Column medium="6">
                                                    <Radio value="slide" label="slide"/>
                                                </Column>
                                                <Column medium="6">
                                                    <Radio value="fade" label="fade"/>
                                                </Column>
                                            </Row>
                                        </RadioGroup>
                                        <RadioGroup clear icon="cog" label="Slider direction" name="sliderdirection" value={this.state.sliderdirection} onChange={this.handleSliderDirection} rounded required iconprimary style={styles.mb}>
                                            <Row>
                                                <Column medium="6">
                                                    <Radio value="top" label="top"/>
                                                    <Radio value="right" label="right"/>
                                                </Column>
                                                <Column medium="6">
                                                    <Radio value="bottom" label="bottom"/>
                                                    <Radio value="left" label="left"/>
                                                </Column>
                                            </Row>
                                        </RadioGroup>
                                        <RadioGroup clear icon="cog" label="Slider controls" name="slidercontrols" value={this.state.slidercontrols} onChange={this.handleSliderControls} rounded required iconprimary style={styles.mb}>
                                            <Row>
                                                <Column medium="6">
                                                    <Radio value="true" label="afficher"/>
                                                </Column>
                                                <Column medium="6">
                                                    <Radio value="false" label="masquer"/>
                                                </Column>
                                            </Row>
                                        </RadioGroup>
                                    </Column>
                                </Row>
                                <Input clear type="text" name="nom" value={this.state.slidermode} onChange={this.handleSliderMode} label="Nom" icon="user" rounded required iconprimary  style={styles.mb}/>  
                               
                                <CheckboxGroup clear icon="tags" label="Valeurs" name="valeurs" value={this.state.valeurs} onChange={this.handleValeurs} rounded required iconprimary minlength="2" maxlength="3" style={styles.mb}>
                                    <Checkbox value="1" label="value 1"/>
                                    <Checkbox value="2" label="value 2"/>
                                    <Checkbox value="3" label="value 3"/>
                                    <Checkbox value="4" label="value 4"/>
                                </CheckboxGroup>
                                <Submit clear icon="check" primary rounded block style={styles.mb}>Valider</Submit>
                            </Column>
                        </Row>
                    
                </Container>
            </Container>
        );
    }
}

const styles = {
    containerFluid: {
        boxSizing: "border-box",
        backgroundColor: "#efefef",
        padding: "30px 0",
        minHeight: "500px",
        padding: "20px"
    },
    mb: {
        marginBottom: "15px"
    },
    slider: {
        height: "250px",
        marginBottom: "15px"
    }
}

ReactDOM.render(<App />, document.getElementById('root'));