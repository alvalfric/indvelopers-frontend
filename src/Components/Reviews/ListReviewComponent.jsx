import React, {Component} from 'react';
import UserLogo from '../../assets/userExample.png';
import ReviewService from '../../Services/ReviewService';
import ReactPaginate from 'react-paginate';


class ListReviewComponent extends Component{
	
	constructor(props){

	super(props)

	this.state={
		text:"",
		score:""
	}
	
	}
}