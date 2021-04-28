import axios from 'axios';
import { AuthService } from './AuthService';
import { UrlProvider } from '../providers/UrlProvider';

export const GameService = {

    async findVerified() {
        return axios.get(UrlProvider.getGameUrl() + "/findVerified").then(res => res.data)
            .catch(error => { return error.response.status })
    },

    async getGameById(id) {
        return axios.get(UrlProvider.getGameUrl() + "/" + id, {
        }).catch(error => { return error.response.status })
    },
    
    async findAll() {
        return AuthService.getToken().then(token => {
            return axios.get(UrlProvider.getGameUrl() + "/findAll", {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data)
                .catch(error => { return error })
        })
    },

    async addGame(game) {
        return AuthService.getToken().then(token => {
            return axios.post(UrlProvider.getGameUrl() + "/add", game, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data)
                .catch(error => { return error })
        })
    },

    async updateGame(game, id) {
        return AuthService.getToken().then(token => {
            return axios.put(UrlProvider.getGameUrl() + "/edit/" + id, game, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data)
                .catch(error => { return error })
        });
    },

    async deleteGame(id) {
        return AuthService.getToken().then(token => {
            return axios.delete(UrlProvider.getGameUrl() + "/delete/" + id, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            })
        })
    },

    async findGamesToRevise() {
        return AuthService.getToken().then(token => {
            return axios.get(UrlProvider.getGameUrl() + '/findNotRevised', {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data)
                .catch(error => { return error.response.status })
        })
    },

    async findAllMyCreatedGames() {
        return AuthService.getToken().then(token => {
            return axios.get(UrlProvider.getGameUrl() + "/findMyGames", {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).catch(error => { return error })
        })
    },

    async getTopGames() {
        return axios.get(UrlProvider.getGameUrl() + '/findByTopSellers').then(res => res.data)
            .catch(error => { return error.response.status })
    },

    async getNewGames() {
        return axios.get(UrlProvider.getGameUrl() + '/findByNew').then(res => res.data)
            .catch(error => { return error.response.status })
    },
    async findGamesWithDiscount(){
        return axios.get(UrlProvider.getGameUrl()+"/findAllWithDiscount").then(res=>res.data)
        .catch(error=>{return error.response.status})
    }

}