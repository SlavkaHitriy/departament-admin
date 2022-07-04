import { makeAutoObservable } from 'mobx'

class News {
    news = []

    constructor() {
        makeAutoObservable(this)
    }

    setNews(news) {
        this.news = news
    }

    deleteNew(id) {
        this.news = this.news.filter(newItem => newItem.id !== id)
    }
}

export const NewsStore = new News()
