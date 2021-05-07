import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { ForumService } from '../../Services/ForumService';
import { SpamService } from '../../Services/SpamService';

class CreateForumComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: "",
            title: "",
            titleError: "",
            spamError:""
        }

        this.saveForum = this.saveForum.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
    }
    validate = () => {
        let titleError = "";

        if (this.state.title.trim().length === 0) {
            titleError = "You must type something to publish!"
        }

        this.setState({ titleError });
        if (titleError) {
            return false;
        } else {
            return true;
        }

    }
    changeTitleHandler = (event) => {
        this.setState({ title: event.target.value });
    }

    saveForum = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            let forum = {//aqui lo siguiente es crear el foro dto
                title: this.state.title.trim(), creationDate: null, developerCreatorId: AuthService.getUserData()['id'], developerCreatorUsername: AuthService.getUserData()['username'],
            }
            console.log('forum=>' + JSON.stringify(forum));
            SpamService.checkForum(forum).then((data)=>{
                if(data === false){
                    ForumService.addForum(forum).then(res => {
                        this.props.history.push('/forums');
                    })
                }else{
                    this.setState({spamError:"This form contains spam words! 😠"})
                }
            })
            //Change it when connect to the back end
        }
    }

    render() {
        return (
            <div>
                <br></br>
                <br></br>
                <h2>Create Forum</h2>
                <form>
                    <div className="form-group">
                        <label>Title</label>
                        <textarea placeholder="Title" name="title" type="text-box" className="form-control" value={this.state.title} onChange={this.changeTitleHandler} />
                        {this.state.titleError ? (<div className="ValidatorMessage">
                            {this.state.titleError}
                        </div>) : null}
                    </div>
                    <button className="AceptButton" onClick={this.saveForum}>Create Forum</button>
                    {this.state.spamError?(<p className="text-danger">{this.state.spamError}</p>):null}
                </form>
            </div>
        );
    }
}

export default CreateForumComponent;