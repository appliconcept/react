import React , { Component } from "react";
import ReactDOM from 'react-dom';
import { App, Container, Button, Input, Row, Icon, Column, Router, Route, Menu, Logo, Navigation, Link, Slider, Slide } from "./index";
import { User, Product } from "./tools/Database";

import { Home, Contacts } from "./components";
import Produits from "./pages/Produits";

class Root extends Component{

    constructor(props){
        super(props);
    }
    
    render(){
        return(                       
            <Router>
                <App>
                    
                    <Container fluid style={{ backgroundColor: "#efefef" }}>
                        <Container>
                            <Row>
                                <Column small="6">
                                    <Input type="text" name="search" rounded />
                                    <Button icon="search" rounded></Button>
                                </Column>
                                <Column small="6">
                                    <Icon name="user" primary/> mon compte
                                    <Icon name="shopping-cart" primary/> mon panier
                                </Column>
                            </Row>                            
                        </Container>
                    </Container>

                    <Container fluid className="apcCard">
                        <Container>
                            <Menu mobile="small" primary>
                                <Logo src="https://www.supercasino.fr/wp-content/themes/super/assets/img/logo.svg"/>
                                <Navigation style={{paddingLeft:"100px"}}>
                                    <Link to="/" label="Accueil" icon="home" large />
                                    <Link to="/produits" icon="tags" label="Produits" large />
                                    <Link to="/contacts" icon="envelope" label="Contacts" large />
                                </Navigation>
                            </Menu>
                        </Container>
                    </Container>
                    
                    <Container fluid style={{ backgroundColor: "#efefef" }}>
                        <Container>
                            <Route path="/" exact component={Produits}/>
                            <Route path="/produits" component={Home}/>
                            <Route path="/contacts" component={Contacts}/>
                        </Container>
                    </Container>

                </App>
            </Router>
        );
    }
}
ReactDOM.render(<Root />, document.getElementById('root'));