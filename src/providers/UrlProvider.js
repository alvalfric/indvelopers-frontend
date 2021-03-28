const BASE_URL="http://localhost:8080"
const USERS="/users"
const GAMES="/games"

export const UrlProvider={

    getUserUrl(){
        return BASE_URL+USERS;
    },

    getGameUrl(){
        return BASE_URL + GAMES;
    },
}