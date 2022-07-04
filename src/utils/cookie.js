const setCookie = (key, val) => {
    document.cookie = `${key}=;max-age=-1`
    document.cookie = `${key}=${val};max-age=604800;path=/`
}

const deleteCookie = (key) => {
    document.cookie = `${key}=;max-age=-1;path=/`
    console.log(key)
}

const getCookie = key => {
    const cookie = document.cookie
    const cookieArray = cookie.split(';')

    if (cookieArray.length === 0) return null

    for (const item of cookieArray) {
        const itemArr = item.split('=')
        let itemKey = itemArr[0]
        let itemValue = itemArr[1]

        if (itemKey) itemKey = itemKey.trim()
        if (itemValue) itemValue = itemValue.trim()

        if (itemKey === key) {
            return itemValue
        }
    }
}


export {setCookie, getCookie, deleteCookie}
