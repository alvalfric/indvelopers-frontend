import axios from 'axios';
import { UrlProvider } from '../providers/UrlProvider'
import { AuthService } from './AuthService';

class OwnedGameService{

   async findAllMyOwnedGames(){
        return AuthService.getToken().then(token=>
            {
                return axios.get(UrlProvider.getOwnedGamesUrl()+"/findOwnedGames",{
                    headers:{
                        'Authorization':'Bearer '+token,
                        'Accept': '*/*'
                    }
                }).catch(error=>{return error})
            })
    }
   async buyGame(gameId){
        return AuthService.getToken().then(token=>{
            return axios.post(UrlProvider.getOwnedGamesUrl()+"/buy/"+gameId,[],{
                headers:{
                    'Authorization':'Bearer '+token,
                    'Accept': '*/*'
                }
            })
        })
    }

}
export default new OwnedGameService();
