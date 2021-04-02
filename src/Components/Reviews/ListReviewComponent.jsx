import React, { Component } from 'react';
import UserLogo from '../../assets/userExample.png';
import { ReviewService } from '../../Services/ReviewService';
import ReactPaginate from 'react-paginate';


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

  showList() {
    return (
      <div>
        { !this.state.reviews ? null :
          this.state.reviews.map(
            review => {
              return (
                <div>
                  <br />
                  <div className="w3-card-4" >
                    <header className="w3-container ">
                      <h5>{review.developer.username}</h5>
                    </header>
                    <div className="w3-container">
                      <p>{review.text}</p>
                      <p>{review.score}/5</p>
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

export default ListReviewComponent;


