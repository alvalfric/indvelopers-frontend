import axios from 'axios';
import { AuthService } from './AuthService';
import { UrlProvider } from '../providers/UrlProvider';

export const DashBoardService={

    async getDeveloperDashboard(){
        return AuthService.getToken().then((token)=>{
            return axios.get(UrlProvider.getDeveloperDashboardUrl()+"/show",{
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res=>res.data).catch(error=>{return error.response.status})
        })
    }
}