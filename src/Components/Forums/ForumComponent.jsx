import React, { Component } from 'react';
import ForumLogo from '../../assets/comment-discussion-512.png';
import {ForumService} from '../../Services/ForumService';
import ReactPaginate from 'react-paginate';
import { AuthService } from '../../Services/AuthService';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Col, FormText, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'

class ForumComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      forums: [],
      rawForums: [],
      offset: 0,
      perPage: 5,
      pageCount: 0, 
      currentPage: 0
    }
    this.handlePageClick = this.handlePageClick.bind(this);
    this.createForum = this.createForum.bind(this);
    this.deleteForum = this.deleteForum.bind(this);
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
    const data = this.state.rawForums;

    const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      forums: slice
    })
  }

  componentDidMount() {
    ForumService.getForums().then((res) => {
      console.log(res)
      var slice = res.slice(this.state.offset, this.state.offset + this.state.perPage)


      this.setState({
        forums: slice,
        pageCount: Math.ceil(res.length / this.state.perPage),
        rawForums: res
      });
    })
  }
  createForum() {
    if (AuthService.isAuthenticated()) {
      this.props.history.push("/create-forum")
    } else {
      this.props.history.push('/login')
    }

  }

  deleteForum(id){
    ForumService.deleteForum(id).then(() => {
      window.location.reload()
    })
  }


  render() {

    return (
      <div>
        <br></br>
        <br></br>
        <h2 className="text-center">Forums</h2>
        <div className="row">
          <Button className="ButtonRes" variant="outline-primary" onClick={this.createForum}>New Forum</Button>
        </div>
        <br />
        {this.state.forums.map(
          forum =>
            <div>
              <br />
                
                <Card style={{backgroundColor:"#222933",border: "3px solid rgb(93, 92, 102)"}} >
                <a href={"/posts/"+forum.id} style={{textDecoration:"none",color:"white"}}>
                  <Card.Header>
                    <Image src={ForumLogo} className="inDvelopers-logo" width="3%" height="3%"  />
                    <h6 className="TextRes" style={{float:"right",marginTop:"1rem"}}>{forum.developerCreatorUsername}</h6>
                  <h5 className="TextRes" style={{marginLeft:"2rem", marginTop:"2rem"}}>{forum.title}</h5>
                  <h6 className="TextRes" style={{float:"right"}}>{forum.creationDate.slice(0,10)}</h6>
                  </Card.Header>
                  </a>
                  {AuthService.isAuthenticated() ?
                    AuthService.getUserData()['username'] === forum.developerCreatorUsername ?
                    <Card.Body> 
                      <Button className="ButtonRes" variant="outline-danger" style={{float:"right"}} onClick={() => this.deleteForum(forum.id)}>Delete Forum</Button>
                    </Card.Body>
                    :null
                  :null
                }
                </Card>

                

              
            </div>
        )
        }
        <br />
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
      </div>
    );
  }
}

export default ForumComponent;