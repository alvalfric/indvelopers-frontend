import axios from 'axios';
import { UrlProvider } from  '../providers/UrlProvider';
import { AuthService } from './AuthService';

export const ReviewService = {

	async getbyGame(gameId) {
		return AuthService.getToken().then(token => {
            return axios.get(UrlProvider.getReviewUrl() + "/game/" + gameId, {
                headers:{
                    'Authorization':'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data).catch(error=>{return error})
        })
	}
}