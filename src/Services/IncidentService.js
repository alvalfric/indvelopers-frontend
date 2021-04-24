import axios from 'axios';
import { UrlProvider } from '../providers/UrlProvider'
import { AuthService } from './AuthService';

export const IncidentService = {

	async listUnsolvedIncidents(){
		return axios.get(UrlProvider.getIncidentUrl() + "/notSolved")
	},

	async addIncident(incident){
		return AuthService.getToken().then(token => {
			return axios.post(UrlProvider.getIncidentUrl() + "/add", incident, {
				headers: {
					'Autorization' : 'Bearer' + token,
					'Accept': '*/*'
				}
			}).then(res => res.data)
				.catch(error => {return error})
		})
	}, 

	async deleteIncident(id){
		return AuthService.getToken().then(token => {
			return axios.delete(UrlProvider.getIncidentUrl() + "delete" + id, {
				headers: {
					'Authorization': 'Bearer' + token,
					'Accept': '*/*'
				}
			})
		})
	}

}
