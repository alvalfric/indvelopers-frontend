import axios from 'axios';
import { UrlProvider } from '../providers/UrlProvider'
import { AuthService } from './AuthService';

class PublicationService{

    ListPublication(){
        return axios.get(UrlProvider.getPublicationUrl()+"/findAll")

    }
    AddPublication(publication){
        return AuthService.getToken().then(token=>{
            return axios.post(UrlProvider.getPublicationUrl()+"/add",publication,{
                headers:{
                    'Authorization':'Bearer '+token,
                    'Accept': '*/*'
                }
            }).catch(error=>{return error})
        })
        //return axios.post(UrlProvider.getPublicationUrl()+"/add",publication)
    }
}
export default new PublicationService();
