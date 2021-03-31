import axios from 'axios';
import { UrlProvider } from '../providers/UrlProvider';

const AUTH_TOKEN_KEY = 'authToken'
const USER_ID_KEY = 'userId'
const USER_DATA_KEY = 'userData'
const AUTHENTICATED_FLAG_KEY = 'isAuthenticated'
const EXPIRATION_MOMENT_KEY = 'expirationMoment'
const CREDENTIALS_KEY = 'credentials'
const ROLE_KEY = 'role'

const USER_ROLE = 'ROLE_USER'

export const AuthService = {

    isAuthenticated() {
        let authenticated = (sessionStorage.getItem(AUTHENTICATED_FLAG_KEY) === "true") && (this.getUserData() !== "" && this.getUserData() !== null)

        return authenticated;
    },

    isUser() {
        return this.getRole() === USER_ROLE;
    },

    async authenticate(username, password, token) {
        sessionStorage.setItem(AUTHENTICATED_FLAG_KEY, 'true')
        let tokenData = JSON.parse(atob(token.split('.')[1]))

        this.setToken(token)
        this.setUserId(tokenData.userId)
        this.setCredentials(username, password)
        this.setExpirationMoment(tokenData.exp)
        this.setRole(tokenData.auth[0].authority)

        this.loadUserData()

        this.setAuthenticationFlag('true')

        return this.isAuthenticated();
    },

    logout() {
        sessionStorage.removeItem(AUTH_TOKEN_KEY)
        sessionStorage.removeItem(USER_ID_KEY)
        sessionStorage.removeItem(USER_DATA_KEY)
        sessionStorage.removeItem(AUTHENTICATED_FLAG_KEY)
        sessionStorage.removeItem(EXPIRATION_MOMENT_KEY)
        sessionStorage.removeItem(CREDENTIALS_KEY)
        sessionStorage.removeItem(ROLE_KEY)        
    },

    setAuthenticationFlag(flag) {
        sessionStorage.setItem(AUTHENTICATED_FLAG_KEY, flag)
    },

    getExpirationMoment() {
        return sessionStorage.getItem(EXPIRATION_MOMENT_KEY)
    },

    setExpirationMoment(expirationMoment) {
        sessionStorage.setItem(EXPIRATION_MOMENT_KEY, expirationMoment)
    },

    getRole() {
        return sessionStorage.getItem(ROLE_KEY)
    }, 

    setRole(role) {
        sessionStorage.setItem(ROLE_KEY, role)
    },

    getCredentials() {
        return JSON.parse(atob(sessionStorage.getItem(CREDENTIALS_KEY)))
    },

    setCredentials(username, password) {
        let credentials = { 
            username: username,
            password: password,
        }
        sessionStorage.setItem(CREDENTIALS_KEY, btoa(JSON.stringify(credentials)))
    },

    async getToken() {
        if (this.isTokenExpired()) {
            return this.refreshToken().then(() => {
                return sessionStorage.getItem(AUTH_TOKEN_KEY)
            })
        } else {
            return sessionStorage.getItem(AUTH_TOKEN_KEY)
        }
    },

    async refreshToken() {
        let username = this.getCredentials().username
        let password = this.getCredentials().password
        return await this.login(username, password).then((token) => {
            let tokenData = JSON.parse(atob(token.split('.')[1]))
            this.setToken(token)
            this.setExpirationMoment(tokenData.exp)
        })
    },

    setToken(token) {
        sessionStorage.setItem(AUTH_TOKEN_KEY, token)
    },

    isTokenExpired() {
        let moment = Math.round(Date.now() / 1000);
        return (moment >= this.getExpirationMoment());
    },

    getUserData() {
        return JSON.parse(sessionStorage.getItem(USER_DATA_KEY))
    },

    setUserData(userData) {
        sessionStorage.setItem(USER_DATA_KEY, userData)
    },

    getUserId() {
        return sessionStorage.getItem(USER_ID_KEY)
    },

    setUserId(userId) {
        sessionStorage.setItem(USER_ID_KEY, userId)
    },

    async getCurrentUser() {
        return this.getToken().then(token => {
            return axios.get(UrlProvider.getMeUrl(), {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data)
        })
    },

    async loadUserData() {
        return this.getCurrentUser().then(data => {
            this.setUserData(JSON.stringify(data))
            this.setAuthenticationFlag('true')
        })
    }


}
