import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import PublicationService from '../../Services/PublicationService';



class CreatePublicationComponent extends Component {

    constructor(props){
        super(props)

        this.state={
            username:"",
            imagen:null,
            text:"",
            textError:"",
            userPicture:null
            
        }
        this.savePublication=this.savePublication.bind(this);
        this.changeImagenHandler=this.changeImagenHandler.bind(this);
        this.changeTextHandler=this.changeTextHandler.bind(this);
    }
    validate =()=>{
        let textError="";
        if(this.state.text.length===0){
            textError="Debes escribir algo para publicar"
        }
        
            this.setState({textError});
        if(textError){
            return false;
        }else{
            return true;
        }
        
    }

    cancel(){
        this.props.history.push('/publication-List');

    }
    changeImagenHandler=(event)=>{
        this.setState({imagen:event.target.value});

    }
    changeTextHandler=(event)=>{
        this.setState({text:event.target.value});
    }
    savePublication= (e)=>{
        e.preventDefault();
        const isValid=this.validate();
        if(isValid){
            let publication={username:AuthService.getUserData()['username'],userPicture:null,
            text:this.state.text,imagen:this.state.imagen,developer:null}
            console.log('Publication=>' + JSON.stringify(publication));
            PublicationService.AddPublication(publication).then(res=>{
                this.props.history.push('/publication-List');
            })
            //Change it when connect to the back end
        }
    }

    render() {
        return (
            <div>
                <br></br>
                <br></br>
                <form> 
                    <div className="form-group">
                      <label>Descripción</label>
                        <textarea placeholder="Descripción"  name="text" type="text-box" className="form-control" value={this.state.text} onChange={this.changeTextHandler} />
                       {this.state.textError ?( <div className="ValidatorMessage">
                            {this.state.textError}
                        </div> ): null}
                    </div>
                    <div className="form-group">
                        <input name="userPicture" type="hidden" className="form-control" value={this.state.userPicture} />
                    </div>
                    <div className="form-group">
                    <label>Image:</label>
                    <input placeholder="Image" type="file" name="image" className="ButtonFileLoad" value={this.state.imagen} onChange={this.changeImagenHandler} />
                    </div>
                    <button className="AceptButton" onClick={this.savePublication}>Crear publicación</button>
                    <button className="CancelButton" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button>   
                    </form> 
            </div>
        );
    }
}

export default CreatePublicationComponent;