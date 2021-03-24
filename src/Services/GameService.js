import axios from 'axios';
import { AuthService } from './AuthService';
import { UrlProvider } from '../providers/UrlProvider';

export const GameService = {

    async findAll(){
        return AuthService.getToken().then(token => {
            return axios.get(UrlProvider.getGamesUrl + '/findAll', { 
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(res => res.data)
        });    
    },


}