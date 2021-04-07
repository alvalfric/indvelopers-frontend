const DEPLOYED_URL="https://continuous-indvelopers-backend.herokuapp.com"
const BASE_URL = "http://localhost:8080"
const DEVELOPERS = "/developers"
const GAMES = "/games"
const ME = '/me'
const PUBLICATIONS="/publications"
const OWNEDGAMES="/ownedGames"
const REVIEWS="/reviews"


export const UrlProvider={

    getDeveloperUrl(){
        return DEPLOYED_URL + DEVELOPERS;
    },

    getGameUrl(){
        return DEPLOYED_URL + GAMES;
    },

    getPublicationUrl(){
        return DEPLOYED_URL + PUBLICATIONS;
    },

    getMeUrl(){
        return DEPLOYED_URL + DEVELOPERS + ME;
    },
    
    getOwnedGamesUrl(){
        return DEPLOYED_URL + OWNEDGAMES;
    },

    getReviewUrl(){
        return DEPLOYED_URL + REVIEWS;
    }
}