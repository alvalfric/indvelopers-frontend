import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { DeveloperService } from '../../Services/DeveloperService';
import ReactPaginate from 'react-paginate';

class ListUsersComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            users: null,
            rawUsers: null,
            offset: 0,
            perPage: 5,
            pageCount: 0,
            currentPage: 0
        }

        this.handlePageClick = this.handlePageClick.bind(this);
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

    loadMoreData() {
        const data = this.state.rawUsers;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            users: slice
        })
    }

    componentDidMount() {
        if (AuthService.getUserData()['roles'].indexOf('ADMIN') == -1) {
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

    showList() {
        return (
            <div>
                { !this.state.users ? null :
                    this.state.users.map(
                        user => {
                            return (
                                <div>
                                    <br />
                                    <div className="w3-card-4" >
                                        <header className="w3-container">
                                            <h5>{user.username}</h5>
                                        </header>
                                        <div className="w3-container">
                                            <p>Roles: {user.roles.join(', ')}</p>
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