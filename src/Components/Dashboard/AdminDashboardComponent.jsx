import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { AdminDashboardService } from '../../Services/AdminDashboardService';
import Chart from "react-apexcharts";

class AdminDashboardComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            totalGamesCreated:0,
            totalPublicationsCreated:0,
            totalReviewsCreated:0,
            totalGamesPurchased:0,
            totalMoneyEarnedByDevelopers:0.0,
            totalDevelopers:0,
            gamesVerified:0,
            gamesNotVerified:0,
            totalIncident:0,
            incidentsSolved:0,
            incidentsNotSolved:0,
            totalPremiumUsers:0,
            totalNotPremiumUsers:0,
            optionsGame: {},
            seriesGame: [],
            optionsIncidents: {},
            seriesIncidents: [],
            optionsPremium: {},
            seriespremium: []
        }

        this.goBack=this.goBack.bind(this);
    }

    componentDidMount(){
        AdminDashboardService.getAdminDashboard().then(res=>{
            this.setState({
                totalGamesCreated: res.totalGamesCreated,
                totalPublicationsCreated: res.totalPublicationsCreated,
                totalReviewsCreated: res.totalReviewsCreated,
                totalGamesPurchased: res.totalGamesPurchased,
                totalMoneyEarnedByDevelopers: res.totalMoneyEarnedByDevelopers,
                totalDevelopers: res.totalDevelopers,
                gamesVerified: res.gamesVerified,
                gamesNotVerified: res.gamesNotVerified,
                totalIncident: res.totalIncident,
                incidentsSolved: res.incidentsSolved,
                incidentsNotSolved: res.incidentsNotSolved,
                totalPremiumUsers: res.totalPremiumUsers,
                totalNotPremiumUsers: res.totalNotPremiumUsers,
                seriesGame: [res.gamesVerified, res.gamesNotVerified],
                optionsGame: {labels:['My games verified', 'My games not verified'], colors:['#3675f4', '#E91E63'] ,subtitle:{style:{fontSize:'25'}},theme:{mode:'dark'}},
                seriesIncidents: [res.incidentsSolved, res.incidentsNotSolved],
                optionsIncidents: {labels:['Incidents solved', 'Incidents not solved'],colors:['#38ff9f', '#ffcd38'] ,subtitle:{style:{fontSize:'25'}},theme:{mode:'dark'}},
                seriespremium: [res.totalPremiumUsers, res.totalNotPremiumUsers],
                optionsPremium: {labels:['Premium developers', 'Normal developers'], colors:['#af8cff', '#cded5a'] ,subtitle:{style:{fontSize:'25'}},theme:{mode:'dark'}}
            })
        })
    }

    goBack(){
        this.props.history.push("/me");
    }

    getAdminDetails=()=>{
        return (
            <React.Fragment>
                <br/>
                <br/>
                <br/>
                <h1>My admin dashboard</h1>
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
                                <p>Games created: {this.state.totalGamesCreated}</p>
                            </div>
                            <div className="w3-container">
                                <p>Publications posted: {this.state.totalPublicationsCreated}</p>
                            </div>
                            <div className="w3-container">
                                <p>Reviews created: {this.state.totalReviewsCreated}</p>
                            </div>
                            <div className="w3-container">
                                <p>Games purchased: {this.state.totalGamesPurchased}</p>
                            </div>
                            <div className="w3-container">
                                <p>Money earned by Developers: {this.state.totalMoneyEarnedByDevelopers}</p>
                            </div>
                            <div className="w3-container">
                                <p>Developers: {this.state.totalDevelopers}</p>
                            </div>
                            <div className="w3-container">
                                <p>Incidents: {this.state.totalIncident}</p>
                            </div>
                        </div>
                        <div className="sidenav2">
                            <br/>
                            <header >
                                <h5>Chart data about games</h5>
                            </header> 
                            <div>
                            <Chart options={this.state.optionsGame} series={this.state.seriesGame} labels={this.state.labels} colors={this.state.colors} type="pie" width="480" />
                            </div>
                            <br/>
                            <header >
                                <h5>Chart data about incidents</h5>
                            </header> 
                            <div>
                            <Chart options={this.state.optionsIncidents} series={this.state.seriesIncidents} labels={this.state.labels} type="pie" width="480" />
                            </div>
                            <br/>
                            <header >
                                <h5>Chart data about premium users</h5>
                            </header> 
                            <div>
                            <Chart options={this.state.optionsPremium} series={this.state.seriespremium} labels={this.state.labels} type="pie" width="480" />
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
                    {AuthService.isAuthenticated() && AuthService.getUserData().roles.includes("ADMIN")?
                     this.getAdminDetails()   
                     :
                     this.props.history.push('/login')
                    }           
            </React.Fragment>
        );
    }
}

export default AdminDashboardComponent;