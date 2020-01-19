import React, {Component} from 'react';
import { Text, StyleSheet} from 'react-native';
import axios from 'axios';
const USER_API_BASE_URL = 'http://localhost:8080/Users';

export default class RecentActivity extends Component{
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
        for (var i = 0; i < 3; i++){
            returnStr.push(
            <tr>
                <td>
                    <Text
                        style={{fontSize:".9em"}}
                    >
                        {
                            this.state.inData[i][0]
                        }
                        &nbsp;
                        {
                            this.state.inData[i][1]
                        }
                    </Text>
                </td>
                <td>
                    <Text
                        style={{fontSize:".9em"}}
                    >
                        {
                            this.state.inData[i][3]
                        }
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
           console.log("AuthStr is " + AuthStr);
   
           axios.get(USER_API_BASE_URL + "/recent",{ headers: { Authorization: AuthStr } })
           .then(res => {
               console.log("response in recentActivity is " + res.data.result);
               this.setState({inData : res.data.result});
           })
       }
    }
    componentDidMount(){
        console.log("recentactivity component mounted. state is now " + this.state.inData);
        console.log("and access is " + this.props.access);
        if ((this.props.access != null) && (this.state.inData === null))
        {
           const AuthStr = 'Bearer '.concat(this.props.access);
           console.log("AuthStr is " + AuthStr);
   
           axios.get(USER_API_BASE_URL + "/recent",{ headers: { Authorization: AuthStr } })
           .then(res => {
               console.log("response in recentactivity is " + res.data.result);
               this.setState({inData : res.data.result});
           })
       }
    }
    render(){
        if (this.state.inData === null) {
            // Render loading state ...
            return (
                <>
                </>
            );
         } else {
            // Render real UI ...
            return(
                <>
                <div style={{color: "red"}}>
                    Recent Activity <div></div>
                    <table>
                        {this.displayFinalData()}
                    </table>
                </div>
                </>
            );
          }

    }
}