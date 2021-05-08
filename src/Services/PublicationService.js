import axios from 'axios';
import { UrlProvider } from '../providers/UrlProvider'
import { AuthService } from './AuthService';

export const PublicationService = {

    async ListPublication() {
        return axios.get(UrlProvider.getPublicationUrl() + "/findAll")

    },

    async AddPublication(publication) {
        return AuthService.getToken().then(token => {
            return axios.post(UrlProvider.getPublicationUrl() + "/add", publication, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).catch(error => { return error })
        })
        //return axios.post(UrlProvider.getPublicationUrl()+"/add",publication)
    },

    async deletePublication(publicationId) {
        return AuthService.getToken().then(token => {
            return axios.delete(UrlProvider.getPublicationUrl().concat(`/delete/${publicationId}`), {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data)
        })
    },

    async updatePublication(id, publication) {
        return AuthService.getToken().then(token => {
            return axios.put(UrlProvider.getPublicationUrl() + "/edit/" + id, publication, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data)
                .catch(error => { return error })
        });
    },

    async GetPublicationById(id){
        return axios.get(UrlProvider.getPublicationUrl() + "/findById/" + id)
        .then(res =>res.data).catch(error => {return error.response.status})
    },

    async findPublicationsByDevelopersFollowed(){
        return AuthService.getToken().then(token => {
            return axios.get(UrlProvider.getFollowedPublications(),{
                headers:{
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).catch(error => {return error})
        })
    }

}
