import React , { Component } from "react";
import ReactDOM from 'react-dom';

class App extends Component{
    render(){
        return(
            <div>Environnement de dev ok !!</div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));