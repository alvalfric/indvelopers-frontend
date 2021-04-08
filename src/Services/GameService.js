import axios from 'axios';
import { AuthService } from './AuthService';
import { UrlProvider } from '../providers/UrlProvider';

export const GameService = {

    async findVerified(){
        return axios.get(UrlProvider.getGameUrl()+"/findVerified").then(res=>res.data)
        .catch(error=>{return error.response.status})
    },
    async findAll() {
            //return axios.get( UrlProvider.getGamesUrl + `/findAll`).then(res => res.data)
            return axios.get(UrlProvider.getGameUrl() + '/findAll').then(res => res.data)
            .catch(error => {return error.response.status})
    },

    async getGameById(id) {
        return AuthService.getToken().then(token=>{
            return axios.get(UrlProvider.getGameUrl()+ "/" + id, {
                headers:{
                    'Authorization':'Bearer '+token,
                    'Accept': '*/*'
                }
            }).catch(error => {return error.response.status})
        })
    },

    async addGame(game) {
        return AuthService.getToken().then(token=>{
            return axios.post(UrlProvider.getGameUrl()+"/add",game,{
                headers:{
                    'Authorization':'Bearer '+token,
                    'Accept': '*/*'
                }
            }).then(res => res.data)
            .catch(error=>{return error})
        })
    },

    async updateGame(game, id) {
        return AuthService.getToken().then(token=>{
            return axios.put(UrlProvider.getGameUrl() + "/edit/" + id, game,{
                headers:{
                    'Authorization':'Bearer '+token,
                    'Accept': '*/*'
                }
            }).then(res => res.data)
            .catch(error=>{return error})
        });
    },
    
    async deleteGame(id) {
        return AuthService.getToken().then(token=>{
            return axios.delete(UrlProvider.getGameUrl()+"/delete/"+id,{
                headers:{
                    'Authorization':'Bearer '+token,
                    'Accept': '*/*'
                }
            })
        })
    }
}