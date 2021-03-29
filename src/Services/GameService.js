import axios from 'axios';
import { AuthService } from './AuthService';
import { UrlProvider } from '../providers/UrlProvider';

export const GameService = {

    async findAll(){
            //return axios.get( UrlProvider.getGamesUrl + `/findAll`).then(res => res.data)
            return axios.get(UrlProvider.getGameUrl() + '/findAll').then(res => res.data)
            .catch(error => {return error.response.status})
       
    },

    async addGame(game){
        return AuthService.getToken().then(token=>{
            return axios.post(UrlProvider.getGameUrl()+"/add",game,{
                headers:{
                    'Authorization':'Bearer '+token
                }
            }).catch(error=>{return error})
        })
    }

}