const BASE_URL = "http://localhost:8080"
const DEVELOPERS = "/developers"
const ME = '/me'

export const UrlProvider={

    getDeveloperUrl(){
        return BASE_URL + DEVELOPERS;
    },

    getMeUrl(){
        return BASE_URL + ME
    }
}