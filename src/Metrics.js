import React, {Component} from 'react';
import { Text} from 'react-native';
import "./Metrics.css"
import axios from 'axios';
require('typeface-titillium-web')


export default class Metrics extends Component{
    constructor(props){
        super(props);

        this.state ={
            // Temporary state for testing
            username: "alpha",
            password: "bravo",
            firstName: "bravo",
            lastName: "bravo",
            age: 24,
            salary: 12345
        };
        this.openMetricDetails = this.openMetricDetails.bind(this);
        this.addData = this.addData.bind(this); // temporary function for testing purposes

    }
    addData(){
    //    console.log("adding data");
     //   let user = {username: this.state.username, password: this.state.password, 
   //         firstName: this.state.firstName, lastName: this.state.lastName, age: 
   //         this.state.age, salary: this.state.salary};
    //    const USER_API_BASE_URL = 'http://localhost:8080/Users';
//
   //     axios.get(USER_API_BASE_URL)
    //    .then(function(res){
//
   //         const persons = res.data;
    //        console.log(persons.result[0].firstName);
//
       // });  
    }

    openMetricDetails(inVal){
        if (inVal == "procedureGen"){
            console.log("calling addData()");

            this.addData();
        }
        console.log("inVal is " + inVal);
        this.props.callBack_dashboardMetricsData(inVal);
    }
    render(){
        var styles ={
            myH1Class : {
                color: "blue"
            }
        };
        return(
            <>
                <div height="100%" width="100%" style={{position:"absolute"}}>
                    <h2 style={{padding: 0, margin: 0}}>
                        <Text style={{fontFamily:"Titillium Web", color: "gray"}}>
                            Metrics
                        </Text>
                    </h2>
                    <h3>
                        <Text tabindex="0"  style={{fontFamily:"Titillium Web", cursor: "pointer", color: "#185b5b"}}
                            onClick={() => this.openMetricDetails("procedureGen")}
                            onPress={() => this.openMetricDetails("procedureGen")}
                        >
                            Procedure Generation
                            <p style={{fontSize: ".7em", color: "gray", padding: 0, margin: 0, marginRight: "15%"}}>
                                Provides metrics on time to complete tasks for installing safety wire, 
                                bolts, adhesive, and donning personal protective equipment. 
                            </p>
                            <p>{this.addData()}</p>
                        </Text>
                    </h3>
                    <h3>
                        <Text tabindex="0"  style={{fontFamily:"Titillium Web", cursor: "pointer", color: "#185b5b"}}
                                onClick={() => this.openMetricDetails("maintenance")}
                                onPress={() => this.openMetricDetails("maintenance")}
                        >
                            Maintenance
                            <p style={{fontSize: ".7em", color: "gray", padding: 0, margin: 0, marginRight: "15%"}}>
                                Provides date/time metric information for the completion of the maintenance module
                            </p>
                        </Text>

                    </h3>
                    <h3>
                    <Text tabindex="0"  style={{fontFamily:"Titillium Web", cursor: "pointer", color: "#185b5b"}}
                            onClick={() => this.openMetricDetails("design")}
                            onPress={() => this.openMetricDetails("design")}
                    >
                            Design
                            <p style={{fontSize: ".7em", color: "gray", padding: 0, margin: 0, marginRight: "15%"}}>
                                Provides date/time metric information for the completion of the Design module
                            </p>
                        </Text>
                    </h3>
                    <h3>
                    <Text tabindex="0"  style={{fontFamily:"Titillium Web", cursor: "pointer", color: "#185b5b"}}
                            onClick={() => this.openMetricDetails("training")}
                            onPress={() => this.openMetricDetails("training")}
                    >
                            Training
                            <p style={{fontSize: ".7em", color: "gray", padding: 0, margin: 0, marginRight: "15%"}}>
                                Provides date/time metric information for the completion of the Design module as a 
                                whole as well as metrics on accuracy per training event.                            
                            </p>
                        </Text>
                    </h3>
                </div>
            </>
        );
    }
}
