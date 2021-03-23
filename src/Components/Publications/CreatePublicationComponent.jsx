import React, { Component } from 'react';

class CreatePublicationComponent extends Component {

    constructor(props){
        super(props)

        this.state={
            username:'',
            image:'',
            text:'',
            userPicture:''
            
        }
        this.savePublication=this.savePublication.bind(this);
        this.changeUsernameHandler=this.changeUsernameHandler.bind(this);
        this.changeImageHandler=this.changeImageHandler.bind(this);
        this.changeTextHandler=this.changeTextHandler.bind(this);
    }
    cancel(){
        this.props.history.push('/publication-List');

    }
    changeUsernameHandler=(event)=>{
        this.setState({username:event.target.value});

    }
    changeImageHandler=(event)=>{
        this.setState({Image:event.target.value});

    }
    changeTextHandler=(event)=>{
        this.setState({text:event.target.value});
    }
    savePublication= (e)=>{

    }

    render() {
        return (
            <div>
                <br></br>
                <br></br>
                <form>
                 <div className="form-group">
                      <label>User name</label>
                      <input placeholder="Username" name="username" className="form-control" value={this.state.username} onChange={this.changeUsernameHandler} />
                </div> 
                    <div className="form-group">
                      <label>Text</label>
                        <textarea placeholder="Text" name="text" type="text-box" className="form-control" value={this.state.text} onChange={this.changeTextHandler} />
                    </div>
                    <div className="form-group">
                        <input name="userPicture" type="hidden" className="form-control" value={this.state.userPicture} />
                    </div>
                    <div className="form-group">
                    <label>Image</label>
                    <input placeholder="Image" name="image" className="form-control" value={this.state.image} onChange={this.changeImageHandler} />
                    </div>
                    <button className="btn btn-success" onClick={this.savePublication}>Crear publicación</button>
                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button>   
                    </form> 
            </div>
        );
    }
}

export default CreatePublicationComponent;