import axios from 'axios';
import SuccessSubscriptionPaymentComponent from '../Components/Paypal/SuccessSubscriptionPaymentComponent';
import { UrlProvider } from '../providers/UrlProvider'
import { AuthService } from './AuthService';

export const PaypalService={

    async summary(gameId){
        return AuthService.getToken().then((token)=>{
            return axios.get(UrlProvider.getPaymentUrl()+"/"+gameId,{
                headers:{
                    'Authorization':'Bearer '+token,
                    'Accept': '*/*'
                }
            }).then(res=>res.data).catch(error=>{return error})
        })
    },
    async payment(order){
        return AuthService.getToken().then(token=>{
            return axios.post(UrlProvider.getPaymentUrl()+"/pay",order,{
                headers:{
                    'Authorization':'Bearer '+token,
                    'Accept': '*/*'
                }
            }).then(res=>res.data).catch(error=>{return error})
        })
    },
    async cancelPay(){
        return AuthService.getToken().then(token=>{
            return axios.get(UrlProvider.getPaymentUrl()+"/cancel",{
                headers:{
                    'Authorization':'Bearer '+token,
                    'Accept': '*/*'
                }
            }).then(res=>res.data).catch(error=>{return error})
        })
    },
    async successPay(paymentId,payerId,gameId){

        return AuthService.getToken().then(token=>{
            return axios.get(UrlProvider.getPaymentUrl()+"/success",{
                headers:{
                    'Authorization':'Bearer '+token,
                    'Accept': '*/*'
                },
                params:{
                    'paymentId':paymentId,
                    'PayerID':payerId,
                    'gameId':gameId
                }
            }).then(res=>res.data).catch(error=>{return error})
        })
    },
    async paySubscription(){
        return AuthService.getToken().then(token=>{
            return axios.post(UrlProvider.getPaymentUrl()+"/subscription",[],{
                headers:{
                    'Authorization':'Bearer '+token,
                    'Accept': '*/*'
                }
            }).then(res=>res.data).catch(error=>{return error})
        })
    },
    async SuccessSubscription(paymentId,payerId){
        return AuthService.getToken().then(token=>{
            return axios.get(UrlProvider.getPaymentUrl()+"/subscriptionSuccess",{
                headers:{
                    'Authorization':'Bearer '+token,
                    'Accept': '*/*'
                },
                params:{
                    'paymentId':paymentId,
                    'PayerID':payerId
                }
            })
        })
    }
}