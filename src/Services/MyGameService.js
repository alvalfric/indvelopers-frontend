import axios from 'axios';
import { UrlProvider } from '../providers/UrlProvider'
import { AuthService } from './AuthService';

class MyGameService{

    async findAllMyCreatedGames() {
        return AuthService.getToken().then(token=>{
            return axios.get(UrlProvider.getGameUrl() + "/findMyGames",{
                headers:{
                    'Authorization':'Bearer '+token,
                    'Accept': '*/*'
                }
            }).catch(error=>{return error})
        })
    }
}

export default new MyGameService();