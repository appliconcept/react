import React from "react";
import Champ from "./Champ";
import Icon from "./Icon";
import Utils from "../tools/Utils";
import "../styles/Textarea.scss";

export default class Input extends Champ{

    //Definir le type de champ
    constructor(props){
        super(props);
        this.champType = "Textarea";
        this.classes = ["", "Container", "Wrapper", "LabelWrapper", "Label", "Icon", "FillerFlex", "Clear", "ErrorBox" ];
    }

    //Dessiner le champ
    render(){
        return(
            <div
                className={this.displayClass("Container")}
                    style={this.displayStyle("Container")}
            >
                <div
                    className={this.displayClass("LabelWrapper")}
                        style={this.displayStyle("LabelWrapper")}
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
                        className={this.displayClass("FillerFlex")}
                            style={this.displayStyle("FillerFlex")}
                    >                        
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
                </div>

                <div
                    className={this.displayClass("Wrapper")}
                        style={this.displayStyle("Wrapper")}
                >
                    <textarea
                        className={this.state.display.champClass ? this.state.display.champClass : ""}
                        disabled={(this.props.disabled | this.props.readonly) ? "disabled" : ""}
                        onBlur={this.handleBlur}
                        onClick={this.handleClick}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        placeholder={this.props.placeholder}
                        readOnly={(this.props.disabled | this.props.readonly | this.props.nouserinput) ? "readonly" : ""}
                        style={this.state.display.champStyle ? this.state.display.champStyle : {}}
                        value={this.state.display.value}
                    >                    
                    </textarea>
                </div>

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