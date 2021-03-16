import axios from 'axios';
import { AuthService } from './AuthService';
import { UrlProvider } from './../providers/UrlProvider';


// TODO: REVISAR
export const UserService = {

    async signup(user){
        return axios.post(UrlProvider.getUserUrl() + '/signup', user).then(res => res.data)
        .catch(error => {return error.response.status})
    },

    async login(user, pass) {
        return axios.post(UrlProvider.getUserUrl() + '/login?username='+ user +'&secret=' + pass).then(res => res.data)
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
            return axios.get(UrlProvider.getUserUrl(), {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(res => res.data)
        })
    },

    async getByUsername(username) {
        return AuthService.getToken().then(token => {
            return axios.get(UrlProvider.getUserUrl().concat(`/${username}`), {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(res => res.data)
        })
    } 

}