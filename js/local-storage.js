export function saveLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function getLocalStorage(key, defaultKey) {
    const getItem = localStorage.getItem(key)
    if(getItem !== null) {
        return JSON.parse(localStorage.getItem(key))
    } else {
        return defaultKey
    }
}