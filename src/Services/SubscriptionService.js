import axios from 'axios';
import { UrlProvider } from  '../providers/UrlProvider';
import { AuthService } from './AuthService';

export const SubscriptionService={

    async checkHasSubscription(){
        return AuthService.getToken().then(token=>{
            return axios.get(UrlProvider.getSubscriptionUrl()+"/isPremium",{
                headers:{
                    'Authorization':'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res=>res.data).catch(error=>{return error})
        })
    },

    async checkHasSubscriptionById(profileId){
        return AuthService.getToken().then(token=>{
            return axios.get(UrlProvider.getSubscriptionUrl()+"/checkSubscription/" + profileId,{
                headers:{
                    'Authorization':'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res=>res.data).catch(error=>{return error})
        })
    },

    async buySubscription(){
        return AuthService.getToken().then(token=>{
            return axios.post(UrlProvider.getSubscriptionUrl()+"/buy",[],{
                headers:{
                    'Authorization':'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res=>res.data).catch(error=>{return error})
        })
    },
    async getSubscription(DevId){
        return AuthService.getToken().then(token=>{
            return axios.get(UrlProvider.getSubscriptionUrl()+"/get/"+DevId,{
                headers:{
                    'Authorization':'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res=>res.data).catch(error=>{return error})
        })
    }
}