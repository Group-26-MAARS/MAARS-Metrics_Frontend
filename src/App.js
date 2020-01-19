import React, {Component} from 'react';
import MyBackground from "./images/Atlas-V_2.jpg"
import Login from "./Login.js"
import Dashboard from "./Dashboard.js"
import ProcedureGeneration from "./ProcedureGeneration.js"
import Maintenance from "./Maintenance.js"
import Training from "./Training.js"
import Design from "./Design.js"
import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/token';



export default class App extends Component{
  constructor(props){
    super(props);

    this.state ={
        canShowDashboard: false,
        canShowProcGen: false,
        canShowMaintenance: false,
        canShowTraining: false,
        canShowDesign: false,
        isCreateAccntBtnHighlighted: false,
        haveToken: false,
        usernameAttempt: "",
        passwordAttempt: "",
    };
    this.callBack_appDashboardDataHandler = this.callBack_appDashboardDataHandler.bind(this);
    this.callBack_appProcGenHandler = this.callBack_appProcGenHandler.bind(this);
    this.callBack_appMaintenanceHandler = this.callBack_appMaintenanceHandler.bind(this);
    this.callBack_appTrainingHandler = this.callBack_appTrainingHandler.bind(this);
    this.callBack_appDesignHandler = this.callBack_appDesignHandler.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
  }

  loginHandler(usernameFromLogin, passwordFromLogin){
    console.log("in loginhandler(), values are: " + usernameFromLogin + " " + passwordFromLogin);
    
      this.setState({usernameAttempt : usernameFromLogin});
      this.setState({passwordAttempt : passwordFromLogin});
    
    // If both attempts are not "" then, pass them into the 

  }
  componentDidUpdate(prevState){
    if ((prevState.canShowDashboard !== this.state.canShowDashboard) && (this.state.canShowDashboard)){
      console.log("toggling off dashboard");
      return;
    }
    console.log("in componentDidUpdate, vals are: " + this.state.usernameAttempt + " " + this.state.passwordAttempt);
    console.log("also, token is " + this.state.haveToken);
    console.log("finally, canShowDash is " + this.state.canShowDashboard);
    if((this.state.haveToken == false)
    && (this.state.usernameAttempt != "") && (this.state.passwordAttempt != "")){
      axios.post(USER_API_BASE_URL + "/generate-token", {
        "username": this.state.usernameAttempt,
        "password": this.state.passwordAttempt
    })
      .then(res => {
        if (res.data.result != null){
          console.log("haveToken is " + res.data.result.token);
          if (res.data.result.token == null)
            this.setState({haveToken : false});
          else // if token is received
          {
            this.setState({haveToken : res.data.result.token});
            this.setState({canShowDashboard : !this.state.canShowDashboard})
          }

        }
      });
    }
  }

  callBack_appProcGenHandler(valFromProcGen){
    
    if (this.state.canShowProcGen){
      this.setState({canShowProcGen : !this.state.canShowProcGen})
    }
    
    if (valFromProcGen == "dBoard"){
      this.setState({canShowDashboard : !this.state.canShowDashboard})
    }
    else if (valFromProcGen == "logout"){
      //logout
      if (this.state.canShowProcGen)
        this.setState({canShowProcGen : !this.state.canShowProcGen,
        haveToken: false,
        usernameAttempt: "",
        passwordAttempt: ""
        
        })
      console.log("Attempting to logout");
      axios.post(USER_API_BASE_URL + "/logout")
      .then(res => {
        console.log("logging out: " + res.data.result);
      })
    }
  }
  callBack_appMaintenanceHandler(valFromMaintenance){
    if (this.state.canShowMaintenance){
      this.setState({canShowMaintenance: !this.state.canShowMaintenance})
    }
    if (valFromMaintenance == "dBoard"){
      this.setState({canShowDashboard : !this.state.canShowDashboard})
    }
    else if (valFromMaintenance == "logout"){
      //logout
      if (this.state.canShowMaintenance)
        this.setState({canShowMaintenance : !this.state.canShowMaintenance,
        haveToken: false,
        usernameAttempt: "",
        passwordAttempt: ""
        
        })
      console.log("Attempting to logout");
      axios.post(USER_API_BASE_URL + "/logout")
      .then(res => {
        console.log("logging out: " + res.data.result);
      })
    }
  }
  
  callBack_appTrainingHandler(valFromTraining){
    if (this.state.canShowTraining){
      this.setState({canShowTraining: !this.state.canShowTraining})
    }
    if (valFromTraining == "dBoard"){
      this.setState({canShowDashboard : !this.state.canShowDashboard})
    }
    else if (valFromTraining == "logout"){
      //logout
      if (this.state.canShowTraining)
        this.setState({canShowTraining : !this.state.canShowTraining,
        haveToken: false,
        usernameAttempt: "",
        passwordAttempt: ""
        
        })
      console.log("Attempting to logout");
      axios.post(USER_API_BASE_URL + "/logout")
      .then(res => {
        console.log("logging out: " + res.data.result);
      })
    }
  }
  callBack_appDesignHandler(valFromDesign){
    if (this.state.canShowDesign){
      this.setState({canShowDesign: !this.state.canShowDesign})
    }
    if (valFromDesign == "dBoard"){
      this.setState({canShowDashboard : !this.state.canShowDashboard})
    }
    else if (valFromDesign == "logout"){
      //logout
      if (this.state.canShowDesign)
        this.setState({canShowDesign : !this.state.canShowDesign,
        haveToken: false,
        usernameAttempt: "",
        passwordAttempt: ""
        
        })
      console.log("Attempting to logout");
      axios.post(USER_API_BASE_URL + "/logout")
      .then(res => {
        console.log("logging out: " + res.data.result);
      })
    }
  }
  callBack_appDashboardDataHandler(dataFromDashboard){
    if (dataFromDashboard == null){
      // If null, The logout or back button was clicked in Dashboard
      this.setState({canShowDashboard : !this.state.canShowDashboard})
    }

    else if(dataFromDashboard == "procedureGen"){
      console.log("ready to render procedureGen");
      // If user wants to navigate to Procedure Generation by clicking a link in dashboard
      if (this.state.canShowDashboard == true)
      {
        // Close Dashboard
        this.setState({canShowDashboard : !this.state.canShowDashboard})
      }
      // Open Procedure Generation
      this.setState({canShowProcGen : !this.state.canShowProcGen})
    }
    else if(dataFromDashboard == "maintenance"){
      console.log("ready to render maintenance");
      // Close Dashboard if open, and open Procedure Generation Metrics
      if (this.state.canShowDashboard == true)
      {
        // Close Dashboard
        this.setState({canShowDashboard : !this.state.canShowDashboard})
      }
      // Open Maintenance
      this.setState({canShowMaintenance : !this.state.canShowMaintenance})
    }
    else if(dataFromDashboard == "training"){
      console.log("ready to render training");
      // Close Dashboard if open, and open Procedure Generation Metrics
      if (this.state.canShowDashboard == true)
      {
        // Close Dashboard
        this.setState({canShowDashboard : !this.state.canShowDashboard})
      }
      // Open Training
      this.setState({canShowTraining : !this.state.canShowTraining})
    }
    else if(dataFromDashboard == "design"){
      console.log("ready to render design");
      // Close Dashboard if open, and open Procedure Generation Metrics
      if (this.state.canShowDashboard == true)
      {
        // Close Dashboard
        this.setState({canShowDashboard : !this.state.canShowDashboard})
      }
      // Open Design
      this.setState({canShowDesign : !this.state.canShowDesign})
    }  
    else if(dataFromDashboard == "createAccnt"){
      
      // Open "Create Account"
      this.setState({canShowCreateAccnt : !this.state.canShowCreateAccnt})
    }
    else if (dataFromDashboard == "logout"){
      //logout
      console.log("Attempting to logout");
      axios.post(USER_API_BASE_URL + "/logout")
      .then(res => {
        console.log("logging out: " + res.data.result);
        this.setState({haveToken : false,
          usernameAttempt : "",
          canShowDashboard : !this.state.canShowDashboard
        });
      })
    }
  }

  renderChild(){
    if (this.state.canShowDashboard){
      return(
        <div style={{
          backgroundSize: "cover", 
          height: "100%", 
          width: "100%",
          position:  ((this.state.canShowDashboard) ? "absolute" : "relative"),
          top: "100", 
          backgroundImage: `url(${MyBackground})`,
          margin: "auto",
          backgroundPosition: "center -60px",
          backgroundColor: "rgba(204, 204, 204, 0.5)", 
          }}
        >
          <Dashboard callBack_appDashboardData={this.callBack_appDashboardDataHandler} access={this.state.haveToken} />
        </div>
      );
    }

    else if(this.state.canShowProcGen){
      return(
        <div style={{
          backgroundSize: "cover", 
          height: "100%", 
          width: "100%",
          position:  ((this.state.canShowProcGen) ? "absolute" : "relative"),
          top: "100", 
          backgroundImage: `url(${MyBackground})`,
          margin: "auto",
          backgroundPosition: "center -60px",
          backgroundColor: "rgba(204, 204, 204, 0.5)", 
          }}
        >
          <ProcedureGeneration callBack_appProcGen={this.callBack_appProcGenHandler} access={this.state.haveToken}  />
        </div>
      );
    }
    else if(this.state.canShowMaintenance){
      return(
        <div style={{
          backgroundSize: "cover", 
          height: "100%", 
          width: "100%",
          position:  ((this.state.canShowMaintenance) ? "absolute" : "relative"),
          top: "100", 
          backgroundImage: `url(${MyBackground})`,
          margin: "auto",
          backgroundPosition: "center -60px",
          backgroundColor: "rgba(204, 204, 204, 0.5)", 
          }}
        >
          <Maintenance callBack_appMaintenance={this.callBack_appMaintenanceHandler} access={this.state.haveToken} /> 
        </div>
      );
    }
    else if(this.state.canShowTraining){
      return(
        <div style={{
          backgroundSize: "cover", 
          height: "100%", 
          width: "100%",
          position:  ((this.state.canShowTraining) ? "absolute" : "relative"),
          top: "100", 
          backgroundImage: `url(${MyBackground})`,
          margin: "auto",
          backgroundPosition: "center -60px",
          backgroundColor: "rgba(204, 204, 204, 0.5)", 
          }}
        >
          <Training callBack_appTraining={this.callBack_appTrainingHandler} access={this.state.haveToken}  /> 
        </div>
      );
    }
    else if(this.state.canShowDesign){
      return(
        <div style={{
          backgroundSize: "cover", 
          height: "100%", 
          width: "100%",
          position:  ((this.state.canShowDesign) ? "absolute" : "relative"),
          top: "100", 
          backgroundImage: `url(${MyBackground})`,
          margin: "auto",
          backgroundPosition: "center -60px",
          backgroundColor: "rgba(204, 204, 204, 0.5)", 
          }}
        >
          <Design callback_appDesign={this.callBack_appDesignHandler} access={this.state.haveToken} /> 
        </div>
      );
    }
    else{
      return (
        <div style={{
          backgroundSize: "cover", 
          height: "100%", 
          width: "100%",
          position: ((this.state.canShowDashboard) ? "relative" : "absolute"),
          backgroundImage: `url(${MyBackground})`,
          backgroundPosition: "center -60px",
          opacity: 1
                }}>
                <Login usernamepasswordprops={this.loginHandler} createAccntProps={this.createAccntHandler}/> 
        </div>
      );
    }
  }
  render(
  ){
    return(
      <div height="100%" width="100%">
        {this.renderChild()}
      </div>
    );
  }
}