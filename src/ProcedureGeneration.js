import React, {Component} from 'react';
import { Text, StyleSheet} from 'react-native';
import axios from 'axios';
const USER_API_BASE_URL = 'http://localhost:8080/Users';


export default class ProcedureGeneration extends Component{
    constructor(props){
        super(props);

        this.state ={
            inData : null
        };
        this.displayProcGen = this.displayProcGen.bind(this);
        this.closeProcGen = this.closeProcGen.bind(this);
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
                    this.state.inData[i][3] + " sec"
                }     
                </td>    
                <td style={{textAlign: "left"}}>                                         
                {
                    this.state.inData[i][4] + " sec"
                }     
                </td>   
                <td style={{textAlign: "left"}}>                                         
                {
                    this.state.inData[i][5] + " sec"
                }     
                </td>   
                <td style={{textAlign: "left"}}>                                         
                {
                    this.state.inData[i][6] + " sec"
                }     
                </td>        
                <td style={{textAlign: "left"}}>                                         
                {
                    this.state.inData[i][7] + " sec"
                }     
                </td>    
            </tr> 
            );
        }
        return (
            returnStr
        );  
    }

   closeProcGen(valFromProcGen){
    this.props.callBack_appProcGen(valFromProcGen);
    }
    componentDidUpdate(){
        console.log("updating in procgen. access is : "+  this.props.access);
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
    
   displayProcGen(){
        return (  
                <table height="100%" width="100%" style={{position: "relative", overFlowX: "hidden", opacity: ".55", overflow: "hidden",whiteSpace: "nowrap"}}>
                    <tr height="5%">
                        <td width="35%">
                            <div style={Object.assign({backgroundColor: "black", width: "100%", height: "100%"})}>
                                <Text tabindex="0" style={{float:"left", fontSize:".8em", color:"#eaeaea", marginLeft: "4px", cursor: "pointer"}} numberOfLines={1}
                                        onClick={() => this.closeProcGen("dBoard")} 
                                        onPress={() => this.closeProcGen("dBoard")}        
                                         >
                                        MAARS
                                </Text>
                            </div> 
                        </td>
                        <td width="65%">
                            <div style={Object.assign({backgroundColor: "black", width: "100%", height: "100%"})}>
                                <Text tabindex="0" style={{float:"right", fontSize:".8em", color:"#eaeaea", marginRight: "4px", cursor: "pointer"}}
                                    onClick={() => this.closeProcGen("dBoard")} 
                                    onPress={() => this.closeProcGen("dBoard")} 
                                    >
                                        Account Management
                                </Text>    
                            </div>
                        </td>
                    </tr>
                    <tr height="90%" colspan="2">
                        <div style={{position:"absolute", color:"white", backgroundColor: "white", height: "90%", width: "100%"}}>
                            <h1 style={{paddingLeft:"20px", marginTop: 0}}>
                                <Text style={{fontFamily:"Titillium Web", fontSize: ".8em", }}
                                >
                                Procedure Generation
                                </Text>
                                <table height="75%" width="67%" style={{fontFamily:"Titillium Web", color: "black", 
                                marginLeft: "auto", marginRight:"auto", borderWidth: "3px",
                                    borderStyle:"solid", borderColor: "gray", borderRadius:"1px"}}>
                                    <tr>
                                        <th style={{fontSize: ".5em", textAlign: "left"}}>
                                            User
                                        </th>
                                        <th style={{fontSize: ".5em", textAlign: "left"}}>
                                            Date
                                        </th>
                                        <th style={{fontSize: ".5em", textAlign: "left"}}>
                                            Bolt
                                        </th>
                                        <th style={{fontSize: ".5em", textAlign: "left"}}>
                                            Safety Wire
                                        </th>
                                        <th style={{fontSize: ".5em", textAlign: "left"}}>
                                            Adhesive
                                        </th>
                                        <th style={{fontSize: ".5em", textAlign: "left"}}>
                                            PPE
                                        </th>     
                                        <th style={{fontSize: ".5em", textAlign: "left"}}>
                                            Total Time
                                        </th>                                                                                                                                                         
                                    </tr>
                                        {this.displayFinalData()}
                                </table>
                            </h1>
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
                                onClick={() => this.closeProcGen("logout")} 
                                onPress={() => this.closeProcGen("logout")} >
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
                {this.displayProcGen()}
            </>);
          }

    }
}
