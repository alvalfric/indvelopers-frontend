import React, { Component } from 'react';
import UserLogo from '../../assets/userExample.png';
import { PublicationService } from '../../Services/PublicationService';
import ReactPaginate from 'react-paginate';
import { AuthService } from '../../Services/AuthService';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import { Col, FormText, Row } from 'react-bootstrap';

class ListPublicationComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      publications: [],
      rawPublications: [],
      offset: 0,
      perPage: 5,
      pageCount: 0,
      currentPage: 0
    }
    this.handlePageClick = this.handlePageClick.bind(this);
    this.createPublication = this.createPublication.bind(this);
    this.editPublication = this.editPublication.bind(this);
    this.deletePublication = this.deletePublication.bind(this);
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
    const data = this.state.rawPublications;

    const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      publications: slice
    })
  }

  componentDidMount() {
    PublicationService.ListPublication().then((res) => {
      var data = res.data;
      var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)


      this.setState({
        publications: slice,
        pageCount: Math.ceil(data.length / this.state.perPage),
        rawPublications: res.data
      });
    })
  }
  createPublication() {
    if (AuthService.isAuthenticated()) {
      this.props.history.push('/publication-Create')
    } else {
      this.props.history.push('/login')
    }

  }

  editPublication(id) {
    PublicationService.GetPublicationById(id).then(res => {
      this.props.history.push(`/publication-edit/${id}`)
    })
    console.log('publicacion => ' + JSON.stringify(id))
  }

  deletePublication(id) {
    PublicationService.deletePublication(id).then(res => {
      window.location.reload()
    })
  }


  render() {

    return (
      <div>
        <br></br>
        <br></br>
        <h2 className="text-center">Publications of the community</h2>
        <div className="row">
          <Button variant="outline-info" size="lg" onClick={this.createPublication}> Publish</Button>
        </div>
        <br />
        {this.state.publications.map(
          publication =>
            <React.Fragment>
              <Card style={{ backgroundColor: "#222933", border: "3px solid rgb(93, 92, 102)" }} >
                <Card.Header style={{ backgroundColor: "#222933" }}>
                  {publication.developer.userImage != null ?
                    <Image variant="left" src={"data:image/png;base64," + publication.developer.userImage} style={{ maxWidth: "50px", maxHeight: "50px" }} roundedCircle />
                    :
                    <Image variant="left" src={UserLogo} style={{ maxWidth: "50px", maxHeight: "50px" }} roundedCircle />
                  }
                  {publication.username}</Card.Header>
                <Card.Body style={{ backgroundColor: "#222933" }}>
                  <Card.Text>
                    {publication.text}
                  </Card.Text>
                  <Col>
                  </Col>
                  <Col sm={5} md={4} style={{ justifyContent: "center", display: "flex" }}>
                    {publication.imagen !== "" ?
                      <Card.Img src={"data:image/png;base64," + publication.imagen} style={{ flexDirection: "column", maxWidth: '500px', maxHeight: '500px' }} />
                      :
                      null
                    }
                  </Col>
                </Card.Body>
                {AuthService.isAuthenticated() ?
                  AuthService.getUserData()['username'] === publication.developer.username ?
                    <div>
                      <Button variant="danger" style={{ float: "left", marginLeft: "5px" }} onClick={() => this.deletePublication(publication.id)}> Delete publication</Button>
                      <Button variant="info" style={{ float: "left" }} onClick={() => this.editPublication(publication.id)}> Edit publication</Button>
                    </div>
                    : null
                  : null
                }
              </Card>
              <br />
            </React.Fragment>


        )
        }
        <br />
        <div style={{ justifyContent: "center", display: "flex" }}>
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

export default ListPublicationComponent;