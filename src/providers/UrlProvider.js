const BASE_URL="http://localhost:8080"
const DEPLOY_URL="(Used when we deploy on heroku)"
const USERS="/users"
const PUBLICATIONS="/publications"

class UrlProvider{

    getUserUrl(){
        return BASE_URL+USERS;
    }
    getPublicationUrl(){
        return BASE_URL+PUBLICATIONS;
    }
}

export default new UrlProvider();