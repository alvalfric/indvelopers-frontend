import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { DeveloperService } from '../../Services/DeveloperService';
import ReactPaginate from 'react-paginate';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, FormText, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';

class FollowListComponent extends Component {

    constructor(props) {
        super(props)
        this.usuario = null
        this.state = {
            users: null,
            rawUsers: null,
            offset: 0,
            perPage: 5,
            pageCount: 0,
            currentPage: 0,
            user : null,
            followers: this.props.location.state.followers,
            following: this.props.location.state.following,
            mouseover: true
        }
        this.handlePageClick = this.handlePageClick.bind(this);
        this.unfollow = this.unfollow.bind(this);
    }

    componentDidMount() {
        if (!AuthService.isAuthenticated()) {
            this.props.history.push('/login')
        } else {
            var res;
            if (this.state.followers) {
                res = this.state.followers
            } else {
                res = this.state.following
            }
            var slice = res.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                users: slice,
                pageCount: Math.ceil(res.length / this.state.perPage),
                rawUsers: res
            })
        }
    }

    loadMoreData() {
        const data = this.state.rawUsers;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            users: slice
        })
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        })
    }

    unfollow(username) {
        DeveloperService.unfollowDeveloper(username).then((data) => {
        alert(data);
        const newFollowers = this.state.rawUsers.filter(allusers => allusers.username !== username);
        this.setState({followers: newFollowers})
        }).then(() =>{this.props.history.push("/me")});
    
    }

    goBack(){
        this.props.history.push("/me");
    }

    showList() {
        return (
            <div>
                { !this.state.users ? null :
                    this.state.users.map(
                        user => {
                            this.usuario = user
                            return (
                                // <div>
                                //     <br />
                                //     <div className="p-4 w3-card-4" >
                                //         <header className="w3-container">
                                //             <h5 >{user.username}</h5>
                                //         </header>
                                //         <div className="w3-container">
                                //             {this.props.location.state.following?
                                //             this.props.location.state.following.includes(user)?
                                //             <button className="Button" style={{ float: "right" }} 
                                //             onMouseEnter={() => this.setState({mouseover : false })}
                                //             onMouseLeave={() => this.setState({mouseover : true })}
                                //             onClick={() => this.unfollow(user.username)}>{this.state.mouseover?
                                //             "❤"
                                //             :
                                //             "Unfollow"
                                //             }
                                //             </button>  
                                //             :null:null
                                //             }     
                                //         </div>   
                                //     </div>
                                // </div>
                                <React.Fragment>
                                    <br/>
                                    <Card style={{backgroundColor:"#222933",border: "3px solid rgb(93, 92, 102)"}} >
                                <Card.Header style={{backgroundColor:"#222933"}}>{user.username}
                                
                                  
                                  {this.props.location.state.following?
                                            this.props.location.state.following.includes(user)?
                                            <button className="Button" style={{ float: "right" }} 
                                            onMouseEnter={() => this.setState({mouseover : false })}
                                            onMouseLeave={() => this.setState({mouseover : true })}
                                            onClick={() => this.unfollow(user.username)}>{this.state.mouseover?
                                            "❤"
                                            :
                                            "Unfollow"
                                            }
                                            </button>  
                                            :null:null
                                            }   
                                 
                                 </Card.Header>
                                
                                <div>
                                
                                </div>
                              </Card>
                                </React.Fragment>

                            )
                        }
                    )
                }

            </div>
        )
    }

    render() {
        return (
            <div>
                < br />
                < br />
                {this.showList()}
                < br />
                <div style={{justifyContent:"center",display:"flex"}}>
                <ReactPaginate previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
                
                {/* <a href="/me" className="CancelButton" >Back</a> */}
                <div style={{float:"left"}}>
                <Button variant="outline-danger" onClick={()=>this.props.history.push("/me")}>Back</Button>
                </div>
                </div>
            </div >
        );
    }
}

export default FollowListComponent;