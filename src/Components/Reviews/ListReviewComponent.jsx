import React, { Component } from 'react';
import UserLogo from '../../assets/userExample.png';
import { ReviewService } from '../../Services/ReviewService';
import ReactPaginate from 'react-paginate';


class ListReviewComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      reviews: null,
      perPage: 5,
      pageCount: 0,
      currentPage: 0
    }

    this.handlePageClick = this.handlePageClick
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

  componentDidMount() {
    ReviewService.getbyGame(this.props.gameId).then(response => {
      this.setState({
        reviews: response
      })
    })
  }

  /* loadMoreData(){
      const data = this.state.rawPublications;

      const slice=data.slice(this.state.offset,this.state.offset + this.state.perPage)
      this.setState({
        pageCount: Math.ceil(data.length/this.state.perPage),
        publications:slice
      })
    }*/

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
                      <h5>{review.text}</h5>
                    </header>
                    <div className="w3-container">
                      <p>{review.score}</p>
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


