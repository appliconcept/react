import React , { Component } from "react";
import ReactDOM from 'react-dom';
import moment from "moment";
import { Calendar, Textarea, Datepicker, Button, Container, Row, Column, Input, Submit, Form, RadioGroup, Radio, CheckboxGroup, Checkbox } from "./index";

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
                            <Form onSubmit={this.submit}>
                                <Row>
                                    <Column medium="6">
                                        <Input iconprimary clear type="text" label="Nom" name="nom" icon="user" rounded required style={styles.mb} />
                                    </Column>
                                    <Column medium="6">
                                        <Input iconprimary clear type="text" label="Prénom" name="prenom" icon="user" rounded required style={styles.mb} />                                
                                    </Column>
                                </Row>
                                <Input iconprimary clear type="mail" name="mail" label="E-mail" icon="at" rounded required style={styles.mb} />
                                <Input iconprimary clear type="password" name="password" label="Password" icon="lock" rounded required style={styles.mb} />
                                <Row>
                                    <Column medium="3">
                                        <Input iconprimary  type="text" label="Rue" name="rue" icon="map-marker" rounded required style={styles.mb} />
                                    </Column>
                                    <Column medium="9">
                                        <Input iconprimary  type="text" name="adresse" label="Adresse" icon="map-marker" rounded required style={styles.mb} />                                
                                    </Column>
                                </Row>
                                <Textarea iconprimary clear rounded name="comment" label="Commentaire" icon="comment" required style={styles.mb}/>
                                <CheckboxGroup iconprimary clear name="hobbies" label="Vos Hobbies" icon="list" rounded required  minlength="2" maxlength="3" style={styles.mb}>
                                    <Row>
                                        <Column medium="6">
                                            <Checkbox value="lecture" label="Lecture"/>
                                        </Column>
                                        <Column medium="6">
                                            <Checkbox value="sports" label="Sports"/>
                                        </Column>
                                    </Row>
                                    <Row>
                                        <Column medium="6">
                                            <Checkbox value="cinema" label="Cinéma"/>
                                        </Column>
                                        <Column medium="6">
                                            <Checkbox value="randonnee" label="Randonnée"/>
                                        </Column>
                                    </Row>
                                </CheckboxGroup>
                                <RadioGroup iconprimary clear name="avis" label="Votre avis" icon="file" rounded required style={styles.mb}>
                                    <Row>
                                        <Column medium="6">
                                            <Radio value="pas satisfait" label="Pas satisfait"/>
                                        </Column>
                                        <Column medium="6">
                                            <Radio value="moyennement satisfait" label="Moyennement satisfait"/>
                                        </Column>
                                    </Row>
                                    <Row>
                                        <Column medium="6">
                                            <Radio value="satisfait" label="Satisfait"/>
                                        </Column>
                                        <Column medium="6">
                                            <Radio value="tres satisfait" label="Très satisfait"/>
                                        </Column>
                                    </Row>
                                </RadioGroup>
                                
                                <Submit hollow info rounded >Valider</Submit>
                            </Form>
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
        marginBottom: "20px"
    }
}

ReactDOM.render(<App />, document.getElementById('root'));