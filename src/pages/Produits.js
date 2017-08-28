import React, {Component} from "react";
import {Product, Category} from "../tools/Database";
import {Pagination, Row, Column, Icon, Cart, Card} from "../index";
import "./Produits.scss";

export default class Produits extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            categories: [],
            products: [],
            resultsperpage: 20,
            page: 1,
            pages: 0,
            orderby: {
                key: "APC-DATE",
                order: "DESC",
                type: "STRING"
            },
            metas: {},
            quantite: 0
        }
    }

    componentDidMount = ()=>{
        this.search();
        this.getCategories();
    }

    getCategories = (parent = "")=>{
        Category.search({parent: parent}, 14).then((datas)=>{
            this.setState({categories: datas.response});
        })
    }

    getSubCategories = (id)=>{
        Category.search({parent:id}).then((datas)=>{
            console.log("category-container-"+id);
            document.getElementById("category-container-"+id).innerHTML(JSON.stringify(datas.response));
        })
    }
    
    search = ()=>{
        Product.search(
            this.state.metas,
            this.state.resultsperpage,
            this.state.page,
            this.state.orderby
        ).then((datas)=>{
            this.setState({
                products: datas.response,
                pages: datas.pagination.pagetotal
            });
        })
    }

    setPage = (page)=>{
        this.setState({page},()=>{
            this.search();
        })
    }

    setResultsPerPage = (e)=>{
        this.setState({
                page: 1,
                resultsperpage:e.target.value
            },()=>{
                this.search();
            }
        );
    }

    setOrderBy = (e)=>{
        let value = e.target.value;
        value = value.split("-");
        let orderby = {
            key: "APC-DATE",
            order: "DESC",
            type: "STRING"
        };
        if(value[0] == "PRIX"){
            orderby.key = "prixTTC";
            orderby.order = value[1];
            orderby.type = "NUMBER";
        }
        if(value[0] == "NOM"){
            orderby.key = "nom";
            orderby.order = value[1];
            orderby.type = "STRING";
        }
        this.setState({
            page: 1,
            orderby
        },()=>{
            this.search();
        });
    }

    displayPrice(prix){
        return prix;
        prix = prix.split(".");
        if(!prix[1]){
            prix[1] = "00";
        }
        return prix[0] + '<span>'+prix[1]+'</span>';
    }

    addToCart = (id)=>{}
    
    render(){
        return(
            <div className="apcProduitsPage">
                <h1>Nos produits</h1>
                <div className="apcProduitsListe"><Row>
                    <Column small="2">
                    <div style={{width: "100%"}}>
                        <h2 className="apcFiltresCategsH2">Filtres Catégories</h2>
                        <div className="apcBgWhite">
                            {
                                this.state.categories.map((category, index)=>{
                                    return(
                                        <div className="apcCategory" key={index}>
                                            <a onClick={this.getSubCategories.bind(this, category.id)}>{category.metas.nom}</a>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    </Column>
                    <Column small="10">
                        <Row>
                            <Column xsmall="12" style={{minHeight: "40px"}}>
                                <Row style={{width:"100%"}}>
                                    <Column small="4" left>
                                        Afficher &nbsp;
                                        <select style={{height: '20px'}} value={this.state.resultsperpage} onChange={this.setResultsPerPage}>
                                            <option value="2">2</option>
                                            <option value="20">20</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                        &nbsp; par page
                                    </Column>
                                    <Column small="4" center>
                                        Classer par &nbsp;
                                        <select style={{height: '20px'}} onChange={this.setOrderBy}>
                                            <option value="PRIX-ASC">Prix croissant</option>
                                            <option value="PRIX-DESC">Prix décroissant</option>
                                            <option value="NOM-ASC">Nom croissant</option>
                                            <option value="NOM-DESC">Nom décroissant</option>
                                        </select>
                                    </Column>
                                    <Column small="4" right>
                                        <Pagination xsmall page={this.state.page} nbPages={this.state.pages} onClick={this.setPage}/>
                                    </Column>
                                </Row>
                            </Column>
                            {
                                this.state.products.map((product, index)=>{
                                    return(
                                            <Column key={index} small="6" medium="4" large="3">
                                                <Card 
                                                    titre={product.metas.nom}
                                                    category={"Ma super categorie"}
                                                    stock={product.metas.stock}
                                                    image={product.metas.image}
                                                    prix={this.displayPrice(product.metas.prixTTC)}
                                                />
                                            </Column>                                       
                                    );
                                })   
                            }
                        </Row>
                    </Column>
                </Row></div>
            </div>
        );
    }
}