import { makeAutoObservable } from 'mobx'

class Auth {
    isAuth = false

    constructor() {
        makeAutoObservable(this)
    }

    setIsAuth(isAuth) {
        this.isAuth = isAuth
    }
}

export const AuthStore = new Auth()
