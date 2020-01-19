import React, {Component} from 'react';
import { Text} from 'react-native';
import "./Leaderboard.css";
//import "./mygradient.css";

import axios from 'axios';
const USER_API_BASE_URL = 'http://localhost:8080/Users';

export default class Leaderboard extends Component{
    constructor(props){
        super(props);

        this.state ={
            inData : null
        };
        this.displayFinalData = this.displayFinalData.bind(this);
    }
    displayFinalData(){
        console.log("number of rows is " + this.state.inData.length);
        var returnStr = [];
        for (var i = 0; i < this.state.inData.length; i++){
            returnStr.push(
            <tr>
                <td style={{textAlign: "left"}}>                                
                    <Text
                        style={{fontSize:".9em"}}>
                        {this.state.inData[i][0]}           
                        &nbsp;
                        {
                            this.state.inData[i][1]
                        }
                    </Text>
                </td>
                <td style={{textAlign: "left"}}>                                
                    <Text
                        style={{fontSize:".9em"}}>
                        {Math.floor(this.state.inData[i][3] / 60)} min,
                        &nbsp;
                        {Math.round(this.state.inData[i][3] % 60)} sec
                    </Text>
                </td>
            </tr> 
            );
        }
        return (
            returnStr
        );  
    }
    componentDidUpdate(){
     if ((this.props.access != null) && (this.state.inData === null))
     {
        const AuthStr = 'Bearer '.concat(this.props.access);
        //console.log("AuthStr is " + AuthStr);

        axios.get(USER_API_BASE_URL + "/mostactive",{ headers: { Authorization: AuthStr } })
        .then(res => {
            //console.log("response in leaderboard is " + res.data.result);
            this.setState({inData : res.data.result});
        })
    }
    //console.log("leaderboard component has now updated. state is now" + this.state.inData);
    //console.log("..and authorization is now " + this.props.access);
    }
    componentDidMount(){
        console.log("leaderboard component mounted. state is now " + this.state.inData);
        console.log("and access is " + this.props.access);
        if ((this.props.access != null) && (this.state.inData === null))
        {
           const AuthStr = 'Bearer '.concat(this.props.access);
           console.log("AuthStr is " + AuthStr);
   
           axios.get(USER_API_BASE_URL + "/mostactive",{ headers: { Authorization: AuthStr } })
           .then(res => {
               console.log("response in leaderboard is " + res.data.result);
               this.setState({inData : res.data.result});
           })
       }
    }

    render(){
        if (this.state.inData === null) {
            return (
                <>
                </>
            );
         } else {
            // Render real UI ...
            return(
                <div style={{color: "red"}}>
                    Leaderboard <div></div>
                    <table style={{marginTop: "3px"}}>
                        {this.displayFinalData()}
                    </table>
                </div>
            );
          }

    }
}