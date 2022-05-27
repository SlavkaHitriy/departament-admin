import routingStore from '../store/routing'

export const changeRoute = (newRoute, newName) => {
    routingStore.activePage = newRoute
    routingStore.activeName = newName
}
