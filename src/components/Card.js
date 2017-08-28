import React, {Component} from "react";
import Base from "./Base";
import {Row, Column, Button} from "../index";
import "../styles/Card.scss";

export default class Card extends Component{
    constructor(props){
        super(props);
        this.state = {
            prixleft: "0",
            prixright: "00"
        }
    }

    componentDidMount = ()=>{
        let prix = this.props.prix.split(".");
        if(!prix[1]){
            prix[1] = "00";
        }
        if(prix[1].length < 2){
            prix[1] += "0";
        }
        this.setState({prixleft: prix[0], prixright: prix[1]});
    }

    render(){
        return(
            <div className="apcCard">

                <div className="apcCardHeader">
                    <div className="apcCardHeaderLeft">
                        {this.props.category}
                    </div>
                    <div className="apcCardHeaderRight">
                        stock {this.props.stock}
                    </div>
                </div>

                <div className="apcCardImg">
                    <img src={this.props.image} alt=""/>
                </div>

                <div className="apcCardSep"></div>

                <div className="apcCardTitre">
                    {this.props.titre}
                </div>

                <div className="apcCardFooter">
                    <div className="apcCardFooterLeft">
                        <div className="apcCardPrix">
                            <div className="apcCardPrixLeft">{this.state.prixleft}</div>
                            <div className="apcCardPrixRight">
                                <div>{this.state.prixright}</div>
                                <div>euros</div>
                            </div>
                        </div>
                    </div>
                    <div className="apcCardFooterRight">
                        <div className="apcCardPanier">
                            <Button primary rounded xsmall icon="cart-plus">Panier</Button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}