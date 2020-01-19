import React, {Component} from 'react';
import { Text, StyleSheet} from 'react-native';
import axios from 'axios';
import { TextInput} from 'react-native';
const USER_API_BASE_URL = 'http://localhost:8080/Users';


export default class CreateAppointments extends Component{
    constructor(props){
        super(props);

        this.state ={
            inData : null
        };
        this.displayCreateAppointments = this.displayCreateAppointments.bind(this);
        this.closeCreateAppointments = this.closeCreateAppointments.bind(this);
        this.displayFinalData = this.displayFinalData.bind(this);
    }
    displayFinalData(){
        console.log("number of rows is " + this.state.inData.length);
        var returnStr = [];
        for (var i = 0; i < this.state.inData.length; i++){
            returnStr.push(
            <tr style={{fontSize: ".325em"}}>
                <td style={{textAlign: "left"}}>                                
                {
                    this.state.inData[i][0]
                }
                &nbsp;
                {
                    this.state.inData[i][1]
                }
                </td>
                <td style={{textAlign: "left"}}>                                         
                {
                    this.state.inData[i][2]
                }
                </td>
                <td style={{textAlign: "left"}}>                                         
                {
                    this.state.inData[i][3]
                }     
                </td>    
                <td style={{textAlign: "left"}}>                                         
                {
                    this.state.inData[i][4]
                }     
                </td>   
                <td style={{textAlign: "left"}}>                                         
                {
                    this.state.inData[i][5]
                }     
                </td>   
                <td style={{textAlign: "left"}}>                                         
                {
                    this.state.inData[i][6]
                }     
                </td>        
                <td style={{textAlign: "left"}}>                                         
                {
                    this.state.inData[i][7]
                }     
                </td>    
            </tr> 
            );
        }
        return (
            returnStr
        );  
    }

   closeCreateAppointments(valFromCreateAppointments){
    this.props.callBack_appCreateAppointments(valFromCreateAppointments);
    }
    componentDidUpdate(){
        console.log("updating in procgen. access is : "+  this.props.access);

    }
    
    componentDidMount(){
        console.log("procgen component mounted. state is now " + this.state.inData);
        console.log("and access is " + this.props.access);
        if ((this.props.access != null) && (this.state.inData === null))
        {
           const AuthStr = 'Bearer '.concat(this.props.access);
           console.log("AuthStr is " + AuthStr);
   
           axios.get(USER_API_BASE_URL + "/procgen",{ headers: { Authorization: AuthStr } })
           .then(res => {
               console.log("response in procGen is " + res.data.result);
               this.setState({inData : res.data.result});
           })
       }
    }
    
   createAppointments(){
    var appointmentStyle = {
        width:"120%",
        height:"75%",
        backgroundColor:"white",
        marginLeft: "90%",
        marginTop: "9%",
        borderRadius: "1%",
        opacity: ".8",
    //    position: "absolute"
    };
    var myBorderStyle = {
        borderWidth: "3px", 
        borderColor: "black", 
        borderStyle: "solid",
        position: "absolute"
    };
        return (  
                <table height="100%" width="100%" style={{position: "relative", overFlowX: "hidden", opacity: ".55", overflow: "hidden",whiteSpace: "nowrap"}}>
                    <tr height="5%">
                        <td width="35%">
                            <div style={Object.assign({backgroundColor: "black", width: "100%", height: "100%"})}>
                                <Text tabindex="0" style={{float:"left", fontSize:".8em", color:"#eaeaea", marginLeft: "4px", cursor: "pointer"}} numberOfLines={1}
                                        onClick={() => this.closeCreateAppointments("dBoard")} 
                                        onPress={() => this.closeCreateAppointments("dBoard")}        
                                         >
                                        MAARS
                                </Text>
                            </div> 
                        </td>
                        <td width="65%">
                            <div style={Object.assign({backgroundColor: "black", width: "100%", height: "100%"})}>
                                <Text tabindex="0" style={{float:"right", fontSize:".8em", color:"#eaeaea", marginRight: "4px", cursor: "pointer"}}
                                    onClick={() => this.closeCreateAppointments("dBoard")} 
                                    onPress={() => this.closeCreateAppointments("dBoard")} 
                                    >
                                        Account Management
                                </Text>    
                            </div>
                        </td>
                    </tr>
                    <tr height="90%" colspan="2">
                        <div style={appointmentStyle}>

                        </div>
                    </tr>
                    <tr height="5%">
                        <td width="35%">
                            <div style={Object.assign({backgroundColor:"black", width: "100%", height: "100%"})}>
                            </div> 
                        </td>
                        <td width="65%">
                            <div style={Object.assign({backgroundColor: "black", width: "100%", height: "100%"})}>
                                <Text tabindex="0" style={{color: "red", float: "right", color:"#eaeaea", verticalAlign: "bottom", marginRight: "4px", cursor: "pointer"}}
                                onClick={() => this.closeCreateAppointments("logout")} 
                                onPress={() => this.closeCreateAppointments("logout")} >
                                    Logout           
                                </Text>
                            </div> 
                        </td>
                    </tr>
                </table>
        );
            
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
            return (
            <>
                {this.displayCreateAppointments()}
            </>);
          }

    }
}
