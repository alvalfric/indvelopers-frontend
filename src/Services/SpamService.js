import axios from 'axios';
import { UrlProvider } from '../providers/UrlProvider';

export const SpamService = {

    async checkGame(game) {
        return axios.post(UrlProvider.getSpamUrl() + "/game", game)
            .then(res => res.data).catch(error => { return error })
    },

    async checkPublication(publication) {
        return axios.post(UrlProvider.getSpamUrl() + "/publication", publication)
            .then(res => res.data).catch(error => { return error })
    },

    async checkReview(review) {
        return axios.post(UrlProvider.getSpamUrl() + "/review", review)
            .then(res => res.data).catch(error => { return error })
    },

    async checkDeveloper(developer) {
        return axios.post(UrlProvider.getSpamUrl() + "/signupDeveloper", developer)
            .then(res => res.data).catch(error => { return error })
    },

    async checkDeveloperDto(developerDTO) {
        return axios.post(UrlProvider.getSpamUrl() + "/editDeveloper", developerDTO)
            .then(res => res.data).catch(error => { return error })
    },

    async checkForum(forumDTO) {
        return axios.post(UrlProvider.getSpamUrl() + "/forum", forumDTO)
            .then(res => res.data).catch(error => { return error })
    },

    async checkPost(postDTO) {
        return axios.post(UrlProvider.getSpamUrl() + "/post", postDTO)
            .then(res => res.data).catch(error => { return error })
    },

}