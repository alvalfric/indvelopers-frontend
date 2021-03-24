const BASE_URL="http://localhost:8080"
const USERS="/users"
const GAMES="/Game"

export const UrlProvider = {

    getUserUrl(){
        return BASE_URL+USERS;
    },

    getGamesUrl(){
        return BASE_URL+GAMES;
    }
}