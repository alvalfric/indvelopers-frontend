const DEPLOYED_URL="https://level4-indvelopers-backend.herokuapp.com"
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
    },
    getSubscriptionUrl(){
        return DEPLOYED_URL + SUBSCRIPTION;
    },
    getCloudUrl(){
        return DEPLOYED_URL + CLOUD
    },
    getPaymentUrl(){
        return DEPLOYED_URL + PAYMENT;
    },
    getDeveloperDashboardUrl(){
        return DEPLOYED_URL + DEVDASHBOARD;
    },
    getAdminDashboardUrl(){
        return DEPLOYED_URL + ADMDASHBOARD;
    },
    getFollowedGames(){
        return DEPLOYED_URL + GAMES + FOLLOWEDGAMES;
    },
    getCategoriesUrl(){
        return DEPLOYED_URL + CATEGORY;
    },
    getSpamUrl(){
        return DEPLOYED_URL + SPAM;
    },
    getForumUrl(){
        return DEPLOYED_URL + FORUM;
    },
    getPostUrl(){
        return DEPLOYED_URL + POST;
    }

}
