import React, { Component} from 'react';
import UserLogo from '../../assets/userExample.png';
import PublicationService from '../../Services/PublicationService';
import ReactPaginate from 'react-paginate';
import { AuthService } from '../../Services/AuthService';
class ListPublicationComponent extends Component {

    constructor(props){
        super(props)

        this.state={
            publications:[],
            rawPublications:[],
            offset:0,
            perPage:5,
            pageCount:0,
            currentPage:0   
        }
    this.handlePageClick=this.handlePageClick.bind(this);
    this.createPublication=this.createPublication.bind(this);
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
    loadMoreData(){
      const data = this.state.rawPublications;

      const slice=data.slice(this.state.offset,this.state.offset + this.state.perPage)
      this.setState({
        pageCount: Math.ceil(data.length/this.state.perPage),
        publications:slice
      })
    }

    componentDidMount(){
      PublicationService.ListPublication().then((res)=>{
        var data =res.data;
        var slice=data.slice(this.state.offset,this.state.offset + this.state.perPage)


        this.setState({publications:slice,
        pageCount: Math.ceil(data.length/this.state.perPage),
        rawPublications:res.data});
      })
    }
    createPublication(){
      if(AuthService.isAuthenticated()){
        this.props.history.push('/publication-Create')
      }else{
        this.props.history.push('/login')
      }

    }

    render() {
        
        return (
            <div>
                <br></br>
                <br></br>
               <h2 className="text-center">Publicaciones de la comunidad</h2> 
               <div className="row">
                    <button className="Button" onClick={this.createPublication}>Publicar</button>
                </div>
                <br/>
     {/* Generate diferent for each publication */}
     {this.state.publications.map(
       publication=>
       <div>
         <br/>
       <div className="w3-card-4" >
    <header className="w3-container ">
        <img/>
        <img src={UserLogo} className="inDvelopers-logo" width="3%" height="3%"  />
      <h5>{publication.username}</h5>
    </header>
    <div className="w3-container">
      <p>{publication.text}</p>
    </div>
    <div className="w3-container">
      <img src={"data:image/png;base64,"+publication.imagen} />
    </div>
  </div>
  </div>
     )
     }
     <br/>
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

export default ListPublicationComponent;