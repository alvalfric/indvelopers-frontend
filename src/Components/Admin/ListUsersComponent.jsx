import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { DeveloperService } from '../../Services/DeveloperService';
import ReactPaginate from 'react-paginate';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Col, FormText, Row } from 'react-bootstrap';

class ListUsersComponent extends Component {

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
            user : null
        }

        this.handlePageClick = this.handlePageClick.bind(this);
        this.getUserDetails = this.getUserDetails.bind(this);
    }

    componentDidMount() {
        if (!AuthService.isAuthenticated() || AuthService.getUserData()['roles'].indexOf('ADMIN') == -1) {
            this.props.history.push('/')
        }
        DeveloperService.getAll().then(res => {
            var slice = res.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                users: slice,
                pageCount: Math.ceil(res.length / this.state.perPage),
                rawUsers: res
            })
        })
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

    changeToAdmin(id) {
        DeveloperService.changeToAdmin(id).then(() => 
        AuthService.loadUserData().then(()=>{window.location.reload()}))
    }

    getUserDetails(user) {
        if (AuthService.getUserData()['roles'].indexOf('ADMIN') == -1) {
            this.props.history.push('/')
        }else{
                this.props.history.push({
                    pathname:`/admin/edit/` + user.id,
                    state: { profile: user }
                })
        }
    }

    showList() {
        return (
            <div>
                { !this.state.users ? null :
                    this.state.users.map(
                        user => {
                            this.usuario = user
                            return (
                                <React.Fragment>
                                    <br/>
                                <Card style={{backgroundColor:"#222933",border: "3px solid rgb(93, 92, 102)"}} >
                                <Card.Header style={{backgroundColor:"#222933"}}>{user.username}</Card.Header>
                                <Card.Body style={{backgroundColor:"#222933"}}>
                                  <Card.Text>
                                  <p>Roles: {user.roles.join(', ')} {user.roles.indexOf('ADMIN') == -1 ?
                                                <Button variant="outline-warning" style={{ float: "right" }} onClick={() => this.changeToAdmin(user.id)}>Change user to admin</Button>
                                                :
                                                null
                                            }</p>
                                  </Card.Text>

                                </Card.Body>
                                <div>
                                <Button className="ButtonRes" variant="outline-warning" onClick={() => this.getUserDetails(user)}>User Details</Button>
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
                    </div>
            </div >
        );
    }
}

export default ListUsersComponent;