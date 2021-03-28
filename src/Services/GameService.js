import axios from 'axios';
import { AuthService } from './AuthService';
import { UrlProvider } from '../providers/UrlProvider';

export const GameService = {

    async addGame(){
        return axios.post(UrlProvider.getGameUrl() + '/add').then(res => res.data)
        .catch(error => {return error.response.status})
    },


}