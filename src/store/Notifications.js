import { makeAutoObservable } from 'mobx'

class Notifications {
    notifications = []

    constructor() {
        makeAutoObservable(this)
    }

    addNotification (id, type, text) {
        this.notifications.push({
            id, type, text,
        })
    }

    removeNotification (timeout, id) {
        setTimeout(() => {
            this.notifications.splice(this.notifications.findIndex(notificationItem => notificationItem.id === id), 1)
        }, timeout)
    }
}

export const NotificationsStore = new Notifications()
