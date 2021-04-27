import axios from 'axios';
import { AuthService } from './AuthService';
import { UrlProvider } from '../providers/UrlProvider';

export const CategoryService = {
  
    async findAll() {
        return AuthService.getToken().then(token => {
            return axios.get(UrlProvider.getCategoriesUrl() + "/findAll", {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data)
                .catch(error => { return error })
        })
    },
    async addCategory(category) {
        return AuthService.getToken().then(token => {
            return axios.post(UrlProvider.getCategoriesUrl() + "/add", category, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data)
                .catch(error => { return error })
        })
    },

    async deleteCategory(categoryId) {
        return AuthService.getToken().then(token => {
            return axios.delete(UrlProvider.getCategoriesUrl() + `/delete/${categoryId}`, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data)
                .catch(error => { return error })
        })
    }

}