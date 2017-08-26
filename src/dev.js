import React , { Component } from "react";
import ReactDOM from 'react-dom';
import { Home, Produits, Contacts } from "./components";
import { App, Container, Input, Row, Icon, Column, Router, Route, Menu, Logo, Navigation, Link, Slider, Slide } from "./index";
import { User, Product } from "./tools/Database";

const styles = {
    containerFluid: {
        backgroundColor: "#efefefef",
        paddingTop: "20px",
        paddingBottom: "20px"
    },
    container: {
        backgroundColor: "transparent"
    },
    row: {
        backgroundColor: "#ff00ff",
        marginBottom: "20px",
        height: "100px"
    },
    column: {
        backgroundColor: "#00ffff",
        alignContent: "center"
    },
    blue: {
        backgroundColor: "#0000ff" 
    },
    red: {
        backgroundColor: "#ff0000"
    },
    green: {
        backgroundColor: "#00ff00"
    }
};

class Root extends Component{

    constructor(props){
        super(props);
        this.state = {
            mail: "natio.jerome@gmail.com",
            pass: "123456",
            produit: {
                nom: "Banane rapée",
                desc: "Mange pas ça lé pas bon",
                prixHT: 20,
                prixTTC: 20*1.085,
                tva: 8.5
            },
            products:[]
        }
    }

    componentDidMount = ()=>{
        Product.search().then((data)=>{
            console.log(data);
            this.setState({products: data.response});
        });
    }

    register = ()=>{
        User.create({
            mail:{
                value : this.state.mail,
                unique : "true" 
            }
        }).then((data)=>{
            console.log(data);
        })
    }

    createProduct = ()=>{
        Product.create(this.state.produit).then((data)=>{
            console.log(data);
            
        })
    }

    login = ()=>{
        User.login({mail:"natio.jerome@gmail.com", password: "CTpTbM72"}).then((data)=>{
            console.log(data)
        });
    }

    logout = ()=>{
        User.logout();
    }

    render(){
        return(                       
            <Router>
                <App>
                    <Container fluid style={{ backgroundColor: "#efefef" }}>
                        <Container style={{
                            height: "50px",
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center"
                        }}><Icon name="user" primary/> mon compte <Icon name="shopping-cart" primary/> mon panier</Container>
                    </Container>
                    <Container fluid style={{...styles.containerFluid}}>
                        <Container style={styles.container}>
                            <Menu mobile="small" primary>
                                <Logo src="https://www.supercasino.fr/wp-content/themes/super/assets/img/logo.svg"/>
                                <Navigation style={{paddingLeft:"100px"}}>
                                    <Link to="/" label="Accueil" icon="home" large/>
                                    <Link to="/produits" icon="tags" label="Produits" large/>
                                    <Link to="/contacts" icon="envelope" label="Contacts" large/>
                                </Navigation>
                            </Menu>
                        </Container>
                    </Container>
                    <Container>
                        <Slider controls animation="fade" animationduration="500" animationdelay="5000" style={{width: "100%", height: "300px"}}>
                            <Slide style={{width: "100%", height: "100%"}}><img style={{width: "100%"}} src="http://lorempixel.com/800/300/sports/2/"/></Slide>
                            <Slide style={{width: "100%", height: "100%"}}><img style={{width: "100%"}} src="http://lorempixel.com/800/300/sports/3/"/></Slide>
                            <Slide style={{width: "100%", height: "100%"}}><img style={{width: "100%"}} src="http://lorempixel.com/800/300/sports/5/"/></Slide>
                            <Slide style={{width: "100%", height: "100%"}}><img style={{width: "100%"}} src="http://lorempixel.com/800/300/sports/1/"/></Slide>
                        </Slider>
                    </Container>
                    <Container fluid style={styles.containerFluid}>
                        <Container style={styles.container}>
                            <Route path="/" exact component={Home}/>
                            <Route path="/produits" component={Produits}/>
                            <Route path="/contacts" component={Contacts}/>
                            <Input type="text" name="nom" icon="user" label="Nom" iconprimary rounded/>
                            <input type="text" value={this.state.mail} onChange={(event)=>{this.setState({mail: event.target.value})}} />
                            <br/>
                            <button onClick={this.register}>s'inscrire</button>
                            <br/><br/><br/>
                            <button onClick={this.login}>connexion</button>
                            <br/><br/><br/>
                            <button onClick={this.createProduct}>creer produit</button>
                            <br/><br/><br/>
                            <button onClick={this.logout}>deconnexion</button>
                            {
                                this.state.products.map((product,i)=>{
                                    return(
                                        <div key={i}>
                                        Nom : {product.metas.nom}<br/>
                                        Prix HT : {product.metas.prixHT}<br/>
                                        Prix TTC : {product.metas.prixTTX}<br/>
                                        Tva : {product.metas.tva}<br/>
                                        desc : {product.metas.desc}<br/>
                                        </div>
                                    );
                                })
                            }
                        </Container>
                    </Container>

                </App>
            </Router>
        );
    }
}
ReactDOM.render(<Root />, document.getElementById('root'));