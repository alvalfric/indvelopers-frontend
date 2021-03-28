const BASE_URL="http://localhost:8080"
const DEVELOPERS="/developers"
const GAMES="/Game"

export const UrlProvider={

    getDeveloperUrl(){
        return BASE_URL+DEVELOPERS;
    },

    getGameUrl(){
        return BASE_URL+GAMES;
    }
}