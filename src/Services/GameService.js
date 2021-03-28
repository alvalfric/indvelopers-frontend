import axios from 'axios';
import { AuthService } from './AuthService';
import { UrlProvider } from '../providers/UrlProvider';

export const GameService = {

    async addGame(game){
        return axios.post(UrlProvider.getGameUrl() + "/add", game).then(res => res.data)
        .catch(error => {return error})
    },


}