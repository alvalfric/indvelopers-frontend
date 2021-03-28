import React, { Component } from 'react';



class CreatePublicationComponent extends Component {

    constructor(props){
        super(props)

        this.state={
            username:"",
            usernameError:"",
            image:"",
            text:"",
            textError:"",
            userPicture:""
            
        }
        this.savePublication=this.savePublication.bind(this);
        this.changeUsernameHandler=this.changeUsernameHandler.bind(this);
        this.changeImageHandler=this.changeImageHandler.bind(this);
        this.changeTextHandler=this.changeTextHandler.bind(this);
    }
    validate =()=>{
        let usernameError="";
        let textError="";
        if(this.state.username.length===0){
            usernameError="Cannot be empty";
        }
        if(this.state.text.length===0){
            textError="You must write something"
        }
            this.setState({usernameError});
        
            this.setState({textError});
        if(usernameError || textError){
            return false;
        }else{
            return true;
        }
        
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
        e.preventDefault();
        const isValid=this.validate();
        if(isValid){
            //Change it when connect to the back end
            this.props.history.push('/publication-List');
        }
    }

    render() {
        return (
            <div>
                <br></br>
                <br></br>
                <form>
                 <div className="form-group">
                      <label>User name</label>
                      <input placeholder="Username"  name="username" className="form-control" value={this.state.username} onChange={this.changeUsernameHandler} />
                      
                      {this.state.usernameError?(<div className="ValidatorMessage">
                         {this.state.usernameError} 
                      </div>):null} 
                </div> 
                    <div className="form-group">
                      <label>Text</label>
                        <textarea placeholder="Text"  name="text" type="text-box" className="form-control" value={this.state.text} onChange={this.changeTextHandler} />
                       {this.state.textError ?( <div className="ValidatorMessage">
                            {this.state.textError}
                        </div> ): null}
                    </div>
                    <div className="form-group">
                        <input name="userPicture" type="hidden" className="form-control" value={this.state.userPicture} />
                    </div>
                    <div className="form-group">
                    <label>Image:</label>
                    <input placeholder="Image" type="file" name="image" className="ButtonFileLoad" value={this.state.image} onChange={this.changeImageHandler} />
                    </div>
                    <button className="AceptButton" onClick={this.savePublication}>Crear publicación</button>
                    <button className="CancelButton" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button>   
                    </form> 
            </div>
        );
    }
}

export default CreatePublicationComponent;