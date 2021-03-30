
const BASE_URL = "http://localhost:8080"
const DEVELOPERS = "/developers"
const GAMES = "/games"
const ME = '/me'
const PUBLICATIONS="/publications"


export const UrlProvider={

    getDeveloperUrl(){
        return BASE_URL + DEVELOPERS;
    },

    getGameUrl(){
        return BASE_URL + GAMES;
    },

    getPublicationUrl(){
        return BASE_URL + PUBLICATIONS;
    },


    getMeUrl(){
        return BASE_URL + DEVELOPERS + ME;
    }
}