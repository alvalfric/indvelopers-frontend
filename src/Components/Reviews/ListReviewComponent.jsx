import React, {Component} from 'react';
import UserLogo from '../../assets/userExample.png';
import ReviewService from '../../Services/ReviewService';
import ReactPaginate from 'react-paginate';


class ListReviewComponent extends Component{
	
	constructor(props){

	super(props)

	this.state={
		reviews:[],
		perPage:5,
		pageCount:0,
		currentPage:0
	}
	
	this.handlePageClick = this.handlePageClick
	}

	handlePageClick= (e)=>{
      const selectedPage=e.selected;
      const offset=selectedPage*this.state.perPage;
      this.setState({
        currentPage:selectedPage,
        offset: offset
      },()=>{
        this.loadMoreData()
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

	render(){

		return (
            <div>
                <br></br>
                <br></br>
               
     
     

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
     activeClassName={"active"}/>
                
            </div>
        );
	}
}

export default ListReviewComponent; 


