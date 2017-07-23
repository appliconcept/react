import React, { Component } from "react";

export default class Modal extends Component{
  render(){
        return(
            <div>
                {
                    this.props.isOpen &&
                    <div
                        className={}
                        style={}
                    >
                        <div
                            className={}
                            style={}
                        ></div>
                       
                        <div
                            className={}
                            style={}
                        >
                            <div
                                className={}
                                style={}
                            >
                                <a
                                    className={}
                                    href="javascript:void(0)"
                                    onClick={this.closeModal}
                                    style={}
                                >
                                    X
                                </a>
                                {this.props.title}
                            </div>

                            <div
                                className={}
                                style={}
                            >
                            {this.props.children}
                            </div>                        
                        
                        </div>
                    </div>
                }
            </div>
        );
    }
}