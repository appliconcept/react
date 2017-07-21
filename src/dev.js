import React , { Component } from "react";
import ReactDOM from 'react-dom';
import { Button, Container, Row, Column, Input } from "./index";

class App extends Component{
    render(){
        return(
            <Container fluid style={styles.containerFluid}>
                <Container>
                    <Row>
                        <Column medium="6">
                            <Input type="mail" name="mail" label="Email" icon="at" block rounded primary/>
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