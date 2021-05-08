const DEPLOYED_URL="https://level3-indvelopers-backend.herokuapp.com"
const BASE_URL = "http://localhost:8080"
const DEVELOPERS = "/developers"
const GAMES = "/games"
const ME = '/me'
const PUBLICATIONS = "/publications"
const OWNEDGAMES = "/ownedGames"
const REVIEWS = "/reviews"
const SUBSCRIPTION = "/subscription"
const CLOUD = "/file"
const PAYMENT = "/payments"
const DEVDASHBOARD="/developerDashboard"
const ADMDASHBOARD="/adminDashboard"
const FOLLOWEDGAMES = "/findGamesByFollowedDeveloper"
const CATEGORY="/categories"
const SPAM="/spam"
const FORUM="/forums"
const POST="/comments"


export const UrlProvider = {

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
    },
    getCloudUrl(){
        return BASE_URL + CLOUD
    },
    getPaymentUrl(){
        return BASE_URL + PAYMENT;
    },
    getDeveloperDashboardUrl(){
        return BASE_URL + DEVDASHBOARD;
    },
    getAdminDashboardUrl(){
        return BASE_URL + ADMDASHBOARD;
    },
    getFollowedGames(){
        return BASE_URL + GAMES + FOLLOWEDGAMES;
    },
    getCategoriesUrl(){
        return BASE_URL + CATEGORY;
    },
    getSpamUrl(){
        return BASE_URL + SPAM;
    },
    getForumUrl(){
        return BASE_URL + FORUM;
    },
    getPostUrl(){
        return BASE_URL + POST;
    }

}
