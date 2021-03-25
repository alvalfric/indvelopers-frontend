import axios from 'axios';
import { AuthService } from './AuthService';
import { UrlProvider } from '../providers/UrlProvider';

export const GameService = {

    async findAll(){
            //return axios.get( UrlProvider.getGamesUrl + `/findAll`).then(res => res.data)
            return axios.get( `http://localhost:8080/Game/findAll`).then(res => res.data)
            .catch(error => {return error.response.status})
       
    },


}