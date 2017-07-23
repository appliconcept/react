import React, {Component} from "react";
import moment from "moment";

export default class Calendar extends Component{

    constructor(props){
        super(props);
        this.state = {
            date: this.props.value ? this.props.value : moment(),
            days: [],
            daysOffset: [],
            daysHeader: ["L", "M", "M", "J", "V", "S", "D"]
        }
    }

    componentDidMount = ()=>{
       this.setDate(this.state.date);
    }

    //Add/Subtract month
    addMonth = ()=>{ this.setDate(moment(this.state.date).add(1, 'M')); }
    subMonth = ()=>{ this.setDate(moment(this.state.date).subtract(1, 'M')); }
    
    //Add/Subtract year
    addYear = ()=>{ this.setDate(moment(this.state.date).add(1, 'Y')); }
    subYear = ()=>{ this.setDate(moment(this.state.date).subtract(1, 'Y')); }

    //Get moment from year, month, day, timezone
    getMoment(year, month, day, timezone="+04:00"){
        month = month + 1;
        return moment(year + "-" + month + "-" + day + " "+timezone, "YYYY-MM-DD ZZ")
    }

    //Redefine calendar state
    setDate = (date)=>{
        
        //Params
        let daysInMonth = moment(date).daysInMonth();
        let day = moment(date).date();
        let month = moment(date).month();
        let year = moment(date).year();
        let days = [];
        let daysOffset = [];

        //Add days decalage
        let firstDayOfMonth = this.getMoment( year, month, 1 ).weekday();
        let decalage = firstDayOfMonth - 1;
        decalage = decalage < 0 ? 6 : decalage;
        for(let d=1; d<=decalage; d++){
            daysOffset.push("");
        }

        //Add days
        for(let i=1; i<=daysInMonth; i++){
            days.push(i);
        }

        this.setState({
            date,
            daysInMonth,
            firstDayOfMonth,
            day,
            month,
            year,
            daysOffset,
            days
        });
    }

    //Set calendar day
    setDay = (event)=>{
        let chosen = this.getMoment( this.state.year, this.state.month, event.target.value );
        this.setDate( chosen );
    }

    render(){
        return(
            <div>
                <button onClick={this.subYear}>-- year</button>
                {this.state.year}            
                <button onClick={this.addYear}>++ year</button>
                <br/><br/>
                <button onClick={this.subMonth}>-- month</button>
                {moment(this.state.date).format("MMMM").toString()}                
                <button onClick={this.addMonth}>++ month</button>
                <br/><br/>
                {moment(this.state.date).local().format("DD/MM/YYYY").toString()}
                <br/><br/>
                <div style={styles.dayContainer}>                    
                    {
                        this.state.daysHeader.map((header, i)=>{
                            return(
                                <span key={i} style={styles.dayHeader}>{header}</span>
                            );
                        })
                    }                    
                    {
                        this.state.daysOffset.map((day, i)=>{
                            return(
                                <span key={i} style={styles.dayOffset}></span>
                            );
                        })
                    }
                    {
                        this.state.days.map((day, i)=>{
                            return(
                                <input key={i} value={day} readOnly onClick={this.setDay} style={styles.day} />
                            );
                        })
                    }
                    <div style={styles.clear}></div>
                </div>
            </div>            
        );
    }
}

const styles = {
    clear:{
        display: "block",
        width: "100%",
        clear: "both"
    },
    dayContainer: {
        width: "280px",
        boxSizing: "border-box",
        margin: "0 0 0 0"
    },
    dayHeader: {
        display: "block",
        float: "left",
        width: "40px",
        height: "40px",
        textAlign: "center",
        padding: "10px 0 10px",
        fontSize: "15px",
        boxSizing: "border-box",
        border: "1px solid #cccccc",
        color: "#000000",
        fontWeight: "bold",
        margin: "0 0 0 0"
    },
    day: {
        display: "block",
        float: "left",
        width: "40px",
        height: "40px",
        textAlign: "center",
        padding: "10px 0 10px",
        fontSize: "15px",
        boxSizing: "border-box",
        border: "1px solid #cccccc",
        color: "#aaaaaa",
        cursor: "pointer",
        margin: "0 0 0 0"
    }
    ,
    dayOffset: {
        display: "block",
        float: "left",
        width: "40px",
        height: "40px",
        textAlign: "center",
        padding: "10px 0 10px",
        fontSize: "15px",
        boxSizing: "border-box",
        border: "1px solid transparent",
        color: "#aaaaaa",
        cursor: "pointer",
        margin: "0 0 0 0"
    }
}