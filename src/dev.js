import React , { Component } from "react";
import ReactDOM from 'react-dom';
import moment from "moment";
import { Calendar, Button, Container, Row, Column, Input, Submit, Form, RadioGroup, Radio, CheckboxGroup, Checkbox } from "./index";

class App extends Component{


    submit = (isValid, values)=>{
        console.log(isValid, values);
    }

    render(){
        return(
            <Container fluid style={styles.containerFluid}>
                <Container>
                    <Row>
                        <Column medium="6">
                            <Calendar />
                            <br/><br/><br/><br/><br/><br/>
                            {moment().format()}
                            <Form onSubmit={this.submit}>
                                <Input type="mail" name="mail" label="Email" icon="at" block required rounded primary/>
                                <RadioGroup name="avis" label="Avis" icon="file-o" block required>
                                    <Radio value="pas-satisfait" label="Pas satisfait"/>
                                    <Radio value="moyen-satisfait" label="Moyennent satisfait"/>
                                    <Radio value="satisfait" label="Satisfait"/>
                                    <Radio value="tres-satisfait" label="Très satisfait"/>
                                </RadioGroup>
                                <CheckboxGroup name="hobbies" label="Hobbies" icon="book" block required>
                                    <Checkbox value="lecture" label="Lecture"/>
                                    <Checkbox value="basket" label="Baskett"/>
                                    <Checkbox value="cinema" label="Cinéma"/>
                                    <Checkbox value="randonnee" label="Randonnee"/>
                                </CheckboxGroup>
                                <Submit block primary rounded>Valider</Submit>
                            </Form>
                        </Column>
                        <Column medium="6">
                        </Column>
                    </Row>
                </Container>
            </Container>
        );
    }
}

const styles = {
    containerFluid: {
        backgroundColor: "#efefef",
        padding: "30px 0",
        minHeight: "500px"
    }
}

ReactDOM.render(<App />, document.getElementById('root'));