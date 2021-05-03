import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { DeveloperService } from '../../Services/DeveloperService';
import ReactPaginate from 'react-paginate';

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
                                <div>
                                    <br />
                                    <div className="w3-card-4" >
                                        <header className="w3-container">
                                            <h5>{user.username}</h5>
                                        </header>
                                        <div className="w3-container">
                                            <p>Roles: {user.roles.join(', ')} {user.roles.indexOf('ADMIN') == -1 ?
                                                <button className="AdminButton" style={{ float: "right" }} onClick={() => this.changeToAdmin(user.id)}>Change user to admin</button>
                                                :
                                                null
                                            }</p>
                                        </div>
                                        <div>
                                        <button className="AdminButton" onClick={() => this.getUserDetails(user)}>User Details</button>
                                        </div>    
                                    </div>
                                </div>
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
            </div >
        );
    }
}

export default ListUsersComponent;