import axios from 'axios';
import { AuthService } from './AuthService';
import { UrlProvider } from '../providers/UrlProvider';

export const AdminDashboardService={

    async getAdminDashboard() {
        return AuthService.getToken().then((token)=>{
            return axios.get(UrlProvider.getAdminDashboardUrl()+"/show",{
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res=>res.data).catch(error=>{return error.response.status})
        })
    }
}