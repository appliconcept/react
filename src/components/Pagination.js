import React, {Component} from "react";
import Icon from "./Icon.js";
import Base from "./Base";
import Utils from "../tools/Utils"
import "../styles/Pagination.scss";

export default class Pagination extends Component{
    constructor(props){
        super(props);
        this.state = {
            page: 1,
            pages: []
        }

    }

    componentWillReceiveProps = (nextProps)=>{
        if(nextProps !== this.props){
            this.setProps(nextProps);
        }
    }

    componentDidMount = ()=>{
        this.setProps(this.props);
    }

    setProps = (props)=>{
        let pages = [];
        let page = props.page;
        for(let i = 1; i <= props.nbPages; i++){
            pages[i-1] = i;            
        };
        this.setState({ page, pages });
    }

    setActualPage = (page) =>{
        this.setState({page},()=>{
            if(this.props.onClick){
                this.props.onClick(this.state.page);
            }
        });
    }

    next = () =>{
        if(this.state.page < this.state.pages.length){
            this.setActualPage(this.state.page+1);
        }
    }

    prev = () =>{
        if(this.state.page > 1){
            this.setActualPage(this.state.page-1);
        }
    }

    defineClass = (base, active)=>{
        let c = base;
        if(active){
            c += " " +  Utils.applyClass("apcPaginationActive", this.props, this.state, true);
        }
        return c;
    }

    render(){
        let paginationClass = Utils.applyClass("apcPagination", this.props, this.state, true);

        let min = this.state.page - 2 > 0 ? this.state.page - 2 : 1;
        let max = min + 4;
        if(max > this.state.pages.length){
            min = this.state.pages.length-4;
            max = this.state.pages.length;
        }
        return(
            <div>
                <span onClick={this.prev} className={paginationClass+" apcPaginationPrev"}><Icon name="step-backward"/></span>
                {
                    (min > 1) &&
                    <span
                        onClick={this.setActualPage.bind(this, this.state.page-5 >= 1 ? this.state.page-5 : 1 )}
                        className={paginationClass}
                    >
                        ...
                    </span>

                }
                {
                    this.state.pages.map((p, index)=>{
                        if(p >= min && p <= max){
                             return(
                                 <span
                                    onClick={this.setActualPage.bind(this, p)}
                                    className={this.defineClass(paginationClass, this.state.page == p)}
                                    key={index}
                                >
                                    {p < 10 ? "0"+p : p}
                                </span>
                            );
                        }
                    })
                }
                {
                    (max < this.state.pages.length) &&
                    <span
                        onClick={this.setActualPage.bind(this, this.state.page*1+5 <= this.state.pages.length ? this.state.page*1+5 : this.state.pages.length )}
                        className={paginationClass}
                    >
                        ...
                    </span>

                }
                <span onClick={this.next} className={paginationClass+" apcPaginationNext"}><Icon name="step-forward"/></span>
            </div>  
        );
    }
}