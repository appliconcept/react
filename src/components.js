import React, {Component} from "react";

class Home extends Component{
    render(){
        return(
            <div>
                <h2>Home</h2>
            </div>
        );
    }
}

class Produits extends Component{
    render(){
        return(
            <div>
                <h2>Produits</h2>
            </div>
        );
    }
}

class Contacts extends Component{
    render(){
        return(
            <div>
                <h2>Contacts</h2>
            </div>
        );
    }
}

export {
    Home,
    Produits,
    Contacts
};