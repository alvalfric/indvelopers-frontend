import axios from 'axios';
import { AuthService } from './AuthService';
import { UrlProvider } from '../providers/UrlProvider';
import UpdateGameComponent from '../Components/Games/UpdateGameComponent';

export const GameService = {

    async findAll(){
            //return axios.get( UrlProvider.getGamesUrl + `/findAll`).then(res => res.data)
            return axios.get(UrlProvider.getGameUrl() + '/findAll').then(res => res.data)
            .catch(error => {return error.response.status})
       
    },

    async getGameById(gameId){
        return axios.get(UrlProvider.getGameUrl() + '/edit/' + gameId).then(res => res.data)
    }


}