const BASE_URL="https://indvelopers-level-1.herokuapp.com"
const USERS="/users"

class UrlProvider{

    getUserUrl(){
        return BASE_URL+USERS;
    }
}

export default new UrlProvider();