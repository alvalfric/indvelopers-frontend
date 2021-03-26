const BASE_URL="http://localhost:8080"
const USERS="/users"

export const UrlProvider={

    getUserUrl(){
        return BASE_URL+USERS;
    }
}