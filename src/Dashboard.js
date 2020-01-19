import React, {Component} from 'react';
import { Text, StyleSheet} from 'react-native';
import Leaderboard from "./Leaderboard.js";
import RecentActivity from "./RecentActivity.js";
import MaarsCalendar from "./MaarsCalendar.js";
import Metrics from "./Metrics.js";
import LinearGradient from 'react-native-linear-gradient';
import InlineBlock from 'react-inline-block';
import { LineChart, PieChart } from 'react-chartkick'
import 'chart.js'
import axios from 'axios';
import "./Dashboard.css"

const USER_API_BASE_URL = 'http://localhost:8080/Users';

export default class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state ={
            inData : null,
            canShowCreateAppointment: false
        };
        this.metricsHandler = this.metricsHandler.bind(this);
        this.showCreateAppointment = this.showCreateAppointment.bind(this);
    }
    
    showCreateAppointment(){
        console.log("Ready to show create appointment");
        /*
        var len = this.state.inData;
        for (var i = 0; i < len; i++){

        }
        */
       this.setState({canShowCreateAppointment : !this.canShowCreateAppointment});
    }
    metricsHandler(valFromMetrics){
        console.log("valFRomMetricsIs" + valFromMetrics);
            this.closeDashboard(valFromMetrics);
    }
    closeDashboard(valFromMetrics){
        this.props.callBack_appDashboardData(valFromMetrics);
    }

    componentDidUpdate(){
        console.log("dashboard updated, and token is " + this.props.access);
        if (this.props.access != null)
        {
        const AuthStr = 'Bearer '.concat(this.props.access);
        console.log("AuthStr is " + AuthStr);

        axios.get(USER_API_BASE_URL + "/dates",{ headers: { Authorization: AuthStr } })
        .then(res => {
            console.log("response in dashboard is " + res.data.result.result);
            if (res.data != null)
            {
                var endDateIndex = res.data.result.length;
                var myArray = new Array();

                console.log("length is " + res.data.length);
                if (endDateIndex > 10){
                    var startDateIndex = res.data.result.length - 10;
                    for (var i = 0; i < 10; i++)
                    {
                        myArray[i] = res.data.result[(startDateIndex - 1)]
                        startDateIndex++;
                    }
                    console.log("starting at" + startDateIndex);
                }
                console.log("final state: " + myArray);
                //this.setState({inData : res.data.result});
            }
        })
    }
    }
    
    componentDidMount(){
        console.log("dashboard mounted, and token is " + this.props.access);
        if ((this.props.access != null) && (this.state.inData === null))
        {
           const AuthStr = 'Bearer '.concat(this.props.access);
           console.log("AuthStr is " + AuthStr);
   
           axios.get(USER_API_BASE_URL + "/dates",{ headers: { Authorization: AuthStr } })
           .then(res => {
               console.log("response in dashboard is " + res.data.result);
               if (res.data != null)
               {
                var endDateIndex = res.data.result.length;
                var myArray = new Array();

                console.log("length is " + res.data.length);
                if (endDateIndex > 10){
                    var startDateIndex = res.data.result.length - 10;
                    for (var i = 0; i < 10; i++)
                    {
                        myArray[i] = res.data.result[(startDateIndex)]
                        startDateIndex++;
                    }
                    console.log("starting at" + startDateIndex);
                }
                console.log("final state: " + myArray);
                this.setState({inData : myArray});
               }
           })
       }
    }
    displayDashboard(){
        return(                    <>
            <td width="35%" height="100%">
                <div style={Object.assign({backgroundColor: "white", height: "100%", width: "100%"})}>
                    <div height="50%">
                    <LinearGradient 
                        start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                        //locations={[0,0.5,0.6]}
                        colors={['#DEFAF9', '#DEFAF9', '#008080']}
                        >
                                <span className="background" style={{position:"relative"}}>
                                    <Leaderboard access={this.props.access}/>  
                                </span>
                                <span className="background" style={{position:"relative"}}>
                                    <RecentActivity access={this.props.access}/> 
                                </span>
                    </LinearGradient>
                    </div>
                    <div height="55%" style={Object.assign({ width: "100%", position: "relative", marginTop: "5%", verticalAlign: "bottom"})}>
                        <LineChart height="55%" colors={["#185b5b"]} 
                        label="All Activity"
                      //  xTitle="Test"
                      discrete={true}
                        lengend={true}
                        legend="bottom"
                        yTitle="Count"
                        curve={true}
                        style={{position: "absolute"}} 
                        data={this.state.inData} />
                    </div>
                </div>
            </td>
            <td width="65%" height="100%">
                <div style={Object.assign({ backgroundColor: "white", width: "100%", height: "100%"})}>
                    <Text style={{color: "red"}}>
                       <Metrics callBack_dashboardMetricsData={this.metricsHandler} />        
                    </Text>                
                </div>
            </td>
            </>
            );
    }
    displayAll(showCreateAppointment){
        console.log("in displayAll(), canShowCreateAppointment is " + showCreateAppointment);
        return (  
            <table height="100%" width="100%" style={{position: "relative", overFlowX: "hidden", opacity: ".55"}}>
                <tr height="5%">
                    <td width="35%">
                        <div style={Object.assign({backgroundColor: "black", width: "100%", height: "100%"})}>
                            <Text tabindex="0" style={{float:"left", fontSize:".8em", color:"#eaeaea", marginLeft: "4px", cursor: "pointer"}} numberOfLines={1}
                                    onClick={() => this.closeDashboard("logout")} 
                                    onPress={() => this.closeDashboard("logout")}        
                                     >
                                    MAARS
                            </Text>
                        </div> 
                    </td>
                    <td width="65%">
                        <div style={Object.assign({backgroundColor: "black", width: "100%", height: "100%"})}>
                            <Text tabindex="0" style={{float:"right", fontSize:".8em", color:"#eaeaea", marginRight: "4px", cursor: "pointer"}}
                                onClick={() => this.closeDashboard("dashboard")} 
                                onPress={() => this.closeDashboard("dashboard")} 
                                >
                                    Account Management
                            </Text>    
                        </div>
                    </td>
                </tr>
                <tr height="90%">
                    {showCreateAppointment ? <><div backgroundColor= "green" height="100px" width="100px"></div></> : <>{this.displayDashboard(showCreateAppointment)}</>}
                </tr>
                <tr height="5%">
                    <td width="35%">
                        <div style={Object.assign({backgroundColor:"black", width: "100%", height: "100%"})}>
                            <Text tabindex="0" style={{color: "red", float: "left", color:"#eaeaea", verticalAlign: "bottom", marginRight: "4px", cursor: "pointer"}}
                                onClick={() => this.showCreateAppointment()} 
                                onPress={() => this.showCreateAppointment()} >
                                Appointments
                            </Text>
                        </div> 
                    </td>
                    <td width="65%">
                        <div style={Object.assign({backgroundColor: "black", width: "100%", height: "100%"})}>
                            <Text tabindex="0" style={{color: "red", float: "right", color:"#eaeaea", verticalAlign: "bottom", marginRight: "4px", cursor: "pointer"}}
                            onClick={() => this.closeDashboard("logout")} 
                            onPress={() => this.closeDashboard("logout")} >
                                Logout           
                            </Text>
                        </div> 
                    </td>
                </tr>
            </table>
        );
            
    }
    render(){
        return(
            <>
                {this.displayAll(this.canShowCreateAppointment)}
            </>
        );
    }
}
