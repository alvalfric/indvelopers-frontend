import axios from 'axios';
import { AuthService } from './AuthService';
import { UrlProvider } from '../providers/UrlProvider';

export const CloudService={

    async uploadFile(zipGame){
        let formData=new FormData()
        formData.append('file',zipGame)
        return AuthService.getToken().then((token)=>{
            return axios.post(UrlProvider.getCloudUrl()+"/upload",formData,{
                headers:{
                    'Authorization':'Bearer '+token,
                    'Accept': '*/*',
                    "Content-type": "multipart/form-data"
                },
                data:formData
            }).then(res=>res.data).catch(error=>{return error})
        })
    },
    async downloadFile(idCloud){
        return AuthService.getToken().then((token)=>{
            return axios.get(UrlProvider.getCloudUrl()+"/download/"+idCloud,{
                headers:{
                    'Authorization':'Bearer '+token,
                    'Accept': '*/*'
                }
            }).then(res=>res.data).catch(error=>{return error})
        })

    },
    async deleteFile(idCloud){
        return AuthService.getToken().then((token)=>{
            return axios.delete(UrlProvider.getCloudUrl()+"/delete/"+idCloud,{
                headers:{
                    'Authorization':'Bearer '+token,
                    'Accept': '*/*'
                }
            }).then(res=>res.data).catch(error=>{return error})
        })
    }
}