const BASE_URL="http://localhost:8080"
const DEVELOPERS="/developers"

export const UrlProvider={

    getDeveloperUrl(){
        return BASE_URL+DEVELOPERS;
    }
}