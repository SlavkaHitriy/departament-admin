import { makeAutoObservable } from 'mobx'

class Routing {
    activePage = '/news'
    activeName = 'Управління новинами'

    constructor() {
        makeAutoObservable(this)
    }

    changeActivePage(routeInfo) {
        this.activePage = routeInfo.route
        this.activeName = routeInfo.name
    }
}

export default new Routing()
