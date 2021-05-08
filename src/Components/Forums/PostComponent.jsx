import React, { Component } from 'react';
import UserLogo from '../../assets/userExample.png';
import {PostService} from '../../Services/PostService';
import ReactPaginate from 'react-paginate';
import { AuthService } from '../../Services/AuthService';
import { ForumService } from '../../Services/ForumService';

class PostComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      rawposts: [],
      offset: 0,
      perPage: 5,
      pageCount: 0, 
      currentPage: 0
    }
    this.handlePageClick = this.handlePageClick.bind(this);
    this.createPost = this.createPost.bind(this);
    this.editPost = this.editPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
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
    const data = this.state.rawPosts;

    const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      posts: slice
    })
  }

  componentDidMount() {
    let id = this.props.match.params.id
    PostService.getByForum(id).then((res) => {
      var slice = res.slice(this.state.offset, this.state.offset + this.state.perPage)


      this.setState({
        posts: slice,
        pageCount: Math.ceil(res.length / this.state.perPage),
        rawPosts: res
      });
    })
  }
  createPost() {
    if (AuthService.isAuthenticated()) {
      this.props.history.push('/'+ this.props.match.params.id +'/post-create-edit')
    } else {
      this.props.history.push('/login')
    }

  }

  editPost(id){
    PostService.getPostById(id).then(() =>{
      this.props.history.push({
        pathname: "/"+ this.props.match.params.id +"/post-create-edit",
        state: { postId: id}
      })
    })
  }

  deletePost(id){
    PostService.deletePostFromForum(id).then(() => {
      window.location.reload()
    })
  }


  render() {

    return (
      <div>
        <br></br>
        <br></br>
        <h2 className="text-center">Posts</h2>
        <div className="row">
          <button className="Button" onClick={this.createPost}>New Post</button>
        </div>
        <br />
        {/* Generate diferent for each publication */}
        {this.state.posts.map(
          post =>
            <div>
                <div className="w3-card-4" >
                <header className="w3-container ">
                  <img />
                  <img style={{marginTop:"1rem"}} src={UserLogo} className="inDvelopers-logo" width="6%" height="6%" />
                  <h6 style={{float:"right",marginTop:"1rem"}}>{post.developerCreatorUsername}</h6>
                  <h5 style={{ marginTop:"2rem"}}>{post.description} {post.edited?"(edited)":null}</h5>
                  <h6 style={{float:"right"}}>{post.creationDate.slice(0,10)}</h6>
                </header>
                {AuthService.isAuthenticated() ?
                    AuthService.getUserData()['username'] === post.developerCreatorUsername ?
                    <React.Fragment> 
                      <button className="Button" style={{float:"right"}} onClick={() => this.editPost(post.id)}>Edit Post</button>
                      <button className="CancelButton" style={{float:"right"}} onClick={() => this.deletePost(post.id)}>Delete Post</button>
                    </React.Fragment>
                    :null
                  :null
                }
                </div>
              </div>
        )
        }
        <br />
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
    );
  }
}

export default PostComponent;