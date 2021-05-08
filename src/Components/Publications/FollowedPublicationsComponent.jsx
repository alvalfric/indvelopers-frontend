import React, { Component } from 'react';
import { PublicationService } from '../../Services/PublicationService';
import UserLogo from '../../assets/userExample.png';

class FollowedPublicationsComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            followedPublications: [],
        }
    }

    componentDidMount() {
        PublicationService.findPublicationsByDevelopersFollowed().then((res)=>{
            console.log(res)
            this.setState({followedPublications:res.data})
        })
    }

    render() {
        return (
            <div>
                <br />
                <br />
                <h1>Following Publications</h1>
                <div>
                    {this.state.followedPublications.map( (publication) =>
                            <div>
                                <br />
                                <div className="w3-card-4">
                                    <header className="w3-container">
                                        <img src={UserLogo} className="inDvelopers-logo" width="3%" height="3%" />
                                    </header>
                                    <div className="w3-container">
                                        <p>{publication.text}</p>
                                    </div>
                                </div>
                            </div>
                    )}

                </div>
            </div>

        );
    }

}
export default FollowedPublicationsComponent;