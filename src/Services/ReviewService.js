import axios from 'axios';
import UrlProvider from  '../providers/UrlProvider';
import { AuthService } from './AuthService';

//Buscar reviews por juego -> No funciona
export const ReviewService ={

	async getbyGame(){
		return AuthService.getToken().then(token => {
			return axios.get(UrlProvider.getGameUrl.concat(``).then(res = res.data)
			.catch(error => {return error.response.status}))
		})
	}
}