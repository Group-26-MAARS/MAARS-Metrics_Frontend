import React, {Component} from 'react';
import Calendar from 'react-calendar'

export default class MaarsCalendar extends Component{
    constructor(props){
        super(props);

        this.state ={
        };
    }

    render(){
        return(
            <div style={{paddingLeft: "30px", paddingRight: "30px", paddingBottom:"120px", backgroundColor: "#6acccb", width: "100%", height: "5%"}}>
                <Calendar width="5%" />
            </div>

        );
    }

}