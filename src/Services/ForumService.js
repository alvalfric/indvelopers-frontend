import axios from 'axios';
import { AuthService } from './AuthService';
import { UrlProvider } from '../providers/UrlProvider';

export const ForumService={

    async getForums() {
        return axios.get(UrlProvider.getForumUrl() + "/findAll", {
        }).then(res => res.data).catch(error => { return error.response.status })
    },

    async getForumByTitle(title) {
        return AuthService.getToken().then(token => {
            return axios.get(UrlProvider.getForumUrl() + "/findByTitle" + title, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data).catch(error => { return error.response.status })
        })
    },

    async addForum(forum) {
        return AuthService.getToken().then(token => {
            return axios.post(UrlProvider.getForumUrl() + "/add", forum, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data)
                .catch(error => { return error })
        })
    },

    async deleteForum(id){
        return AuthService.getToken().then((token)=>{
            return axios.delete(UrlProvider.getForumUrl()+`/delete/${id}`,{
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res=>res.data).catch(error=>{return error.response.status})
        })
    }
}