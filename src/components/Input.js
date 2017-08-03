import React from "react";
import Champ from "./Champ";
import Icon from "./Icon";
import "../styles/Input.scss";

export default class Input extends Champ{

    //Definir le type de champ
    constructor(props){
        super(props);
        this.champType = "Input";
        this.classes = ["", "Container", "Wrapper", "LabelWrapper", "Label", "Icon", "Clear", "ErrorBox" ];
    }

    //Dessiner le champ
    render(){
        return(
            <div
                className={this.displayClass("Container")}
                    style={this.displayStyle("Container")}
            >
                {
                    this.props.icon &&
                    <Icon name={this.props.icon} className={this.displayClass("Icon")} style={this.displayStyle("Icon")} />
                }

                {
                    this.props.label &&
                    <div
                        className={this.displayClass("Label")}
                            style={this.displayStyle("Label")}
                    >
                        {this.props.label}
                    </div>
                }

                <div
                    className={this.displayClass("Wrapper")}
                        style={this.displayStyle("Wrapper")}
                >
                    <input
                        className={this.displayClass("")}
                            style={this.displayStyle("")}

                        disabled={(this.props.disabled | this.props.readonly) ? "disabled" : ""}
                        onBlur={this.handleBlur}
                        onClick={this.handleClick}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        placeholder={this.props.placeholder}
                        readOnly={(this.props.disabled | this.props.readonly | this.props.nouserinput) ? "readonly" : ""}
                        type={(this.props.type && this.props.type === "password") ? "password" : "text"}
                        value={this.state.display.value}
                    />
                </div>

                {
                    this.props.clear &&
                    <div
                        className={this.displayClass("Clear")}
                            style={this.displayStyle("Clear")}
                        onClick={this.handleClear}
                    >
                        x
                    </div>
                }

                {
                    this.state.display.errorDisplay &&
                    <div
                        className={this.displayClass("ErrorBox")}
                            style={this.displayStyle("ErrorBox")}
                    >
                        {this.state.display.errorMsg}
                    </div>
                }
            </div>
        );
    }
}