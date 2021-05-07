import axios from 'axios';
import { AuthService } from './AuthService';
import { UrlProvider } from '../providers/UrlProvider';

export const PostService={

    async getByForum(id) {
        return axios.get(UrlProvider.getPostUrl() + `/findByForum/${id}`, {
        }).then(res => res.data).catch(error => { return error.response.status })
    },
    
    async getPostById(id) {
        return AuthService.getToken().then(token => {
            return axios.get(UrlProvider.getPostUrl() + "/findById/" + id, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).catch(error => { return error.response.status })
        })
    },

    async addPostToForum(forumId, post) {
        return AuthService.getToken().then(token => {
            return axios.post(UrlProvider.getPostUrl() + `/add/`+ forumId, post, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data)
                .catch(error => { return error })
        })
    },
    
    async updatePost(id, post) {
        return AuthService.getToken().then(token => {
            return axios.put(UrlProvider.getPostUrl() + "/edit/" + id, post, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data)
                .catch(error => { return error })
        });
    },

    async deletePostFromForum(id){
        return AuthService.getToken().then((token)=>{
            return axios.delete(UrlProvider.getPostUrl()+`/delete/${id}`,{
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res=>res.data).catch(error=>{return error.response.status})
        })
    }
}