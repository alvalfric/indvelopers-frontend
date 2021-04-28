import React, { Component } from 'react';
import {AuthService} from '../../Services/AuthService';
import {DashBoardService} from '../../Services/DashboardService';
import Chart from "react-apexcharts";

class DeveloperDashboardComponent extends Component {
    constructor(props){
        super(props)

        this.state={
            numGamesCreated:0,
            numReviewsCreated:0,
            numPublicationsCreated:0,
            numGamesOwned:0,
            moneyEarned:0.0,
            totalFollowers:0,
            gamesNotVerified:0,
            gamesVerified:0,
            reviewsMean:0,
            options:{},
            series:[]
        }
        this.goBack=this.goBack.bind(this);
    }
    componentDidMount(){
        DashBoardService.getDeveloperDashboard().then(res=>{
            this.setState({
                numGamesCreated:res.numGamesCreated,
                numReviewsCreated:res.numReviewsCreated,
                numPublicationsCreated:res.numPublicationsCreated,
                numGamesOwned:res.numGamesOwned,
                moneyEarned:res.moneyEarned,
                totalFollowers:res.totalFollowers,
                gamesNotVerified:res.gamesNotVerified,
                gamesVerified:res.gamesVerified,
                reviewsMean:res.reviewsMean,
                series:[res.gamesVerified,
                    res.gamesNotVerified],
                options:{labels:['my games verified', 'my games not verified'], subtitle:{style:{fontSize:'25'}},theme:{mode:'dark'}}
            })
            
        })
    }
    goBack(){
        this.props.history.push("/me");
    }
    getDetails=()=>{
        return (
            <React.Fragment>
                <br/>
                <br/>
                <br/>
                <h1>My dashboard</h1>
                <br/>
                
                <div className="w3-card-4" >
                <div className="w3-container">
                <div className="sidenav">
                <br/>
                <header className="w3-container " >
                  <h5>General data</h5>
                </header>
                <br/>
                <div className="w3-container">
                  <p>Games created: {this.state.numGamesCreated}</p>
                </div>
                <div className="w3-container">
                  <p>Reviews created: {this.state.numReviewsCreated}</p>
                </div>
                <div className="w3-container">
                  <p>Publications posted: {this.state.numPublicationsCreated}</p>
                </div>
                <div className="w3-container">
                  <p>Games owned: {this.state.numGamesOwned}</p>
                </div>
                <div className="w3-container">
                  <p>Money earned: {this.state.moneyEarned}</p>
                </div>
                <div className="w3-container">
                  <p>Followers: {this.state.totalFollowers}</p>
                </div>
                <div className="w3-container">
                  <p>Average of review's score: {this.state.reviewsMean}</p>
                </div>
              </div>
              
              <div className="sidenav2">
                  <br/>
              <header >
                  <h5>Chart data about games</h5>
                </header> 
                <div>
                  <Chart options={this.state.options} series={this.state.series} labels={this.state.labels} type="pie" width="480" />
                 </div>
              </div>
              </div>
              </div>
                <br/>
                <div className="w3-container">
                <button className="CancelButton" onClick={this.goBack} >Go back</button> 
                </div>
            </React.Fragment>
        )
    }
    render() {
        return (
            <React.Fragment>
                    {AuthService.isAuthenticated()?
                     this.getDetails()   
                     :
                     this.props.history.push('/login')
                    }           
            </React.Fragment>
        );
    }
}

export default DeveloperDashboardComponent;