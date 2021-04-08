const DEPLOYED_BASE_URL="https://indvelopers-level-1.herokuapp.com"
const BASE_URL = "http://localhost:8080"
const DEVELOPERS = "/developers"
const GAMES = "/games"
const ME = '/me'
const PUBLICATIONS="/publications"
const OWNEDGAMES="/ownedGames"
const REVIEWS="/reviews"
const SUBSCRIPTION="/subscription"


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
    },
    
    getOwnedGamesUrl(){
        return BASE_URL + OWNEDGAMES;
    },

    getReviewUrl(){
        return BASE_URL + REVIEWS;
    },
    getSubscriptionUrl(){
        return BASE_URL + SUBSCRIPTION;
    }
}