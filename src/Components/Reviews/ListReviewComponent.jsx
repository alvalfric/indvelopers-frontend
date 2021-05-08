import React, { Component } from 'react';
import UserLogo from '../../assets/userExample.png';
import { ReviewService } from '../../Services/ReviewService';
import ReactPaginate from 'react-paginate';
import StarRatings from 'react-star-ratings';
import { AuthService } from '../../Services/AuthService';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class ListReviewComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      reviews: null,
      rawReviews: null,
      offset: 0,
      perPage: 2,
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
    const data = this.state.rawReviews;
    const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      reviews: slice
    })
  }

  componentDidMount() {
    ReviewService.getbyGame(this.props.gameId).then(res => {
      var slice = res.slice(this.state.offset, this.state.offset + this.state.perPage)
      this.setState({
        reviews: slice,
        pageCount: Math.ceil(res.length / this.state.perPage),
        rawReviews: res
      })
    })
  }

  editReview(gameId) {
    this.props.history.push(`/editReview/${gameId}`)
  }
  deleteReview = (reviewId, e) => {
    e.preventDefault()
    ReviewService.deleteReview(reviewId).then(() => {
      window.location.reload();
      this.props.history.push(`/game-View/${this.props.gameId}`);
    })
  }

  showList() {
    return (
      <div>
        { !this.state.reviews ? null :
          this.state.reviews.map(
            review => {
              return (
                <div>
                  <br />
                  {/* <div className="w3-card-4" >
                    <br />
                    <header className="w3-container ">
                      <h5>
                        {review.developer.username}<StarRatings rating={review.score} starDimension="20px" starSpacing="1px" starRatedColor="yellow" numberOfStars={5} name="score" />
                        {review.edited ? <h9> (Edited review)</h9> : null}
                        {(AuthService.isAuthenticated() && AuthService.getUserData()['username'] === review.developer.username) ?
                        <button className="DeleteButton" style={{ float: "right" }} onClick={(e) => this.deleteReview(review.id, e)}>Delete review</button>
                          : null}
                        {(AuthService.isAuthenticated() && AuthService.getUserData()['username'] === review.developer.username) ?
                          <button className="Button" style={{ float: "right" }} onClick={() => this.editReview(this.props.gameId)}>Edit review</button>
                          : null}
                      </h5>
                    </header>
                    <div className="w3-container">
                      <p>{review.text}</p>

                      <p></p>
                    </div>
                  </div> */}
                  <Card style={{backgroundColor:"#222933",border: "3px solid rgb(93, 92, 102)"}}>
                    <Card.Header>
                    {review.developer.username}<StarRatings rating={review.score} starDimension="20px" starSpacing="1px" starRatedColor="yellow" numberOfStars={5} name="score" />
                        {review.edited ? <h9> (Edited review)</h9> : null}
                        {(AuthService.isAuthenticated() && AuthService.getUserData()['username'] === review.developer.username) ?
                        <Button variant="outline-danger" style={{ float: "right" }} onClick={(e) => this.deleteReview(review.id, e)}>Delete review</Button>
                          : null}
                        {(AuthService.isAuthenticated() && AuthService.getUserData()['username'] === review.developer.username) ?
                          <Button variant="outline-info" style={{ float: "right" }} onClick={() => this.editReview(this.props.gameId)}>Edit review</Button>
                          : null}
                    </Card.Header>
                    <Card.Body>
                    <p>{review.text}</p>
                    </Card.Body>
                  </Card>

                </div>
              )
            }
          )
        }
      </div >
    )
  }

  render() {

    return (
      <div>
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

export default ListReviewComponent;