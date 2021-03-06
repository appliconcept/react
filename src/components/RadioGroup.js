import React from "react";
import Champ from "./Champ";
import Icon from "./Icon";
import Radio from "./Radio";
import Utils from "../tools/Utils";
import "../styles/RadioGroup.scss";

export default class RadioGroup extends Champ{
    
    //State par default
    constructor(props){
        super(props);
        this.champType = "RadioGroup";
        this.childTypes = [Radio];
    }

    //Afficher le composant
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
                    {this.state.children}
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