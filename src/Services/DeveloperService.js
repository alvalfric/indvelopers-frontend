import axios from 'axios';
import { AuthService } from './AuthService';
import { UrlProvider } from '../providers/UrlProvider';

export const DeveloperService = {

    async signup(user) {
        return axios.post(UrlProvider.getDeveloperUrl() + '/sign-up', user).then(res => res.data)
        .catch(error => {return error.response.status})
    },

    async login(username, password) {
        return axios.post(UrlProvider.getDeveloperUrl() + '/login?username='+ username +'&password=' + password)
        .then(res => res.data)
        .catch(error => { return error.response.status })
    },
    
    // async changePropic(propic) {
    //     return AuthService.getToken().then(token => { 
    //         return axios.patch(UrlProvider.getMeUrl() + '/propic', propic, {
    //             headers: {
    //                 'Authorization': 'Bearer ' + token,
    //                 'Content-Type': 'text/plain'
    //             }
    //         }).then(res => res.data)
    //         .catch(error => {return error})
    //     })
    // },

    async getAll() {
        return AuthService.getToken().then(token => {
            return axios.get(UrlProvider.getDeveloperUrl(), {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(res => res.data).catch(error => {return error.response.status})
        })
    },

    async getByUsername(username) {
        return AuthService.getToken().then(token => {
            return axios.get(UrlProvider.getDeveloperUrl().concat(`/${username}`), {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(res => res.data)
        })
    }, 

    async updateProfile(profileId, profiledto) {
        return AuthService.getToken().then(token => {
            return axios.put(UrlProvider.getDeveloperUrl().concat(`/edit/${profileId}`), profiledto, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(res => res.data)
        })
    },

    async changeToAdmin(userId) {
        return AuthService.getToken().then(token => {
            return axios.put(UrlProvider.getDeveloperUrl().concat(`/changeToAdmin/${userId}`), {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(res => res.data)
        })
    }

}