import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { AdminDashboardService } from '../../Services/AdminDashboardService';
import Chart from "react-apexcharts";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Col, FormText, Row,ListGroup } from 'react-bootstrap';

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
                <Form className="FormStyle">
                <h1>My admin dashboard</h1>
                <br/>
                
                <div >
                
                    <div >
                    <Row>
                        <div >
                            <br/>
                            <header  >
                                <h5>General data</h5>
                            </header>
                            <br/>
                            {/* <div className="w3-container">
                                <p>Games created: {this.state.totalGamesCreated}</p>
                            </div> */}
                          
                            <Col xs="7">
                            <Row md="5">
                               <Form.Label row>Games created: {this.state.totalGamesCreated}</Form.Label>
                            </Row>
                            {/* <div className="w3-container">
                                <p>Publications posted: {this.state.totalPublicationsCreated}</p>
                            </div> */}
                            <Row md="5">
                               <Form.Label row>Publications posted: {this.state.totalPublicationsCreated}</Form.Label>
                            </Row>
                            {/* <div className="w3-container">
                                <p>Reviews created: {this.state.totalReviewsCreated}</p>
                            </div> */}
                            <Row md="5">
                               <Form.Label row>Reviews created: {this.state.totalReviewsCreated}</Form.Label>
                            </Row>
                            {/* <div className="w3-container">
                                <p>Games purchased: {this.state.totalGamesPurchased}</p>
                            </div> */}
                            <Row md="5">
                               <Form.Label row>Games purchased: {this.state.totalGamesPurchased}</Form.Label>
                            </Row>
                            {/* <div className="w3-container">
                                <p>Money earned by Developers: {this.state.totalMoneyEarnedByDevelopers}</p>
                            </div> */}
                            <Row md="5">
                               <Form.Label row>Money earned by Developers: {this.state.totalMoneyEarnedByDevelopers}</Form.Label>
                            </Row>
                            {/* <div className="w3-container">
                                <p>Developers: {this.state.totalDevelopers}</p>
                            </div> */}
                            <Row md="5">
                               <Form.Label row>Developers: {this.state.totalDevelopers}</Form.Label>
                            </Row>
                            {/* <div className="w3-container">
                                <p>Incidents: {this.state.totalIncident}</p>
                            </div> */}
                            <Row md="5">
                               <Form.Label row>Incidents: {this.state.totalIncident}</Form.Label>
                            </Row>
                            </Col>
                        </div>
                        
                        <Col >
                        <div >
                            <br/>
                            
                            <header >
                                <h5>Chart data about games</h5>
                            </header> 
                            <Row md="5">
                            <Chart options={this.state.optionsGame} series={this.state.seriesGame} labels={this.state.labels} colors={this.state.colors} type="pie" width="480" />
                            </Row>
                            <br/>
                            
                            <header >
                                <h5>Chart data about incidents</h5>
                            </header> 
                            <Row md="5">
                            <Chart options={this.state.optionsIncidents} series={this.state.seriesIncidents} labels={this.state.labels} type="pie" width="480" />
                            
                            </Row>
                            <br/>
                            
                            <header >
                                <h5>Chart data about premium users</h5>
                            </header> 
                            <Row md="5">
                            <Chart options={this.state.optionsPremium} series={this.state.seriespremium} labels={this.state.labels} type="pie" width="480" />
                            
                            </Row>
                        </div>
                        </Col>
                        </Row>
                    </div>
                </div>
                
                <br/>
                <div className="w3-container">
                    <Button variant="outline-danger" onClick={this.goBack} >Go back</Button> 
                </div>
                </Form>
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