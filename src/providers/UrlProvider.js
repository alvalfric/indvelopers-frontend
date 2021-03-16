const BASE_URL="http://localhost:8080"
const USERS="/users"

class UrlProvider{

    getUserUrl(){
        return BASE_URL+USERS;
    }
}

export default new UrlProvider();