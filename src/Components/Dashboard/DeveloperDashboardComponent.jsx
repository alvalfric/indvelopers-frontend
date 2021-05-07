import React, { Component } from 'react';
import {AuthService} from '../../Services/AuthService';
import {DashBoardService} from '../../Services/DashboardService';
import Chart from "react-apexcharts";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Col, FormText, Row,ListGroup } from 'react-bootstrap';

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
                options:{labels:['My games verified', 'My games not verified'], subtitle:{style:{fontSize:'25'}},theme:{mode:'dark'}}
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
                <Form className="FormStyle">
                <h1>My dashboard</h1>
                <br/>
                <div >
                <div className="w3-container">
                <div >
                <br/>
                <Form.Group as={Col} md="4">
                <header className="w3-container " >
                  <h5>General data</h5>
                </header>
                
                <br/>
                {/* <div className="w3-container">
                  <p>Games created: {this.state.numGamesCreated}</p>
                </div> */}
                <Row md="5">
                <Form.Label row>Games created: {this.state.numGamesCreated}</Form.Label>
                </Row>
                {/* <div className="w3-container">
                  <p>Reviews created: {this.state.numReviewsCreated}</p>
                </div> */}
                <Row md="5">
                <Form.Label row>Reviews created: {this.state.numReviewsCreated}</Form.Label>
                </Row>
                {/* <div className="w3-container">
                  <p>Publications posted: {this.state.numPublicationsCreated}</p>
                </div> */}
                <Row md="5">
                <Form.Label row>Publications posted: {this.state.numPublicationsCreated}</Form.Label>
                </Row>
                {/* <div className="w3-container">
                  <p>Games owned: {this.state.numGamesOwned}</p>
                </div> */}
                <Row md="5">
                <Form.Label row>Games owned: {this.state.numGamesOwned}</Form.Label>
                </Row>
                {/* <div className="w3-container">
                  <p>Money earned: {this.state.moneyEarned}</p>
                </div> */}
                <Row md="5">
                <Form.Label row>Money earned: {this.state.moneyEarned}</Form.Label>
                </Row>
                {/* <div className="w3-container">
                  <p>Followers: {this.state.totalFollowers}</p>
                </div> */}
                <Row md="5">
                <Form.Label row>Followers: {this.state.totalFollowers}</Form.Label>
                </Row>
                {/* <div className="w3-container">
                  <p>Average of review's score: {this.state.reviewsMean}</p>
                </div> */}
                <Row md="5">
                <Form.Label row>Average of review's score: {this.state.reviewsMean}</Form.Label>
                </Row>
                </Form.Group>
              </div>
              <Form.Group as={Col}  md="5">
              
                  
                  <Row md="5">
              <header >
                  <h5>Chart data about games</h5>
                </header> 
                
                  <Chart options={this.state.options} series={this.state.series} labels={this.state.labels} type="pie" width="480" />
                  </Row>
                 
              
              </Form.Group>
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