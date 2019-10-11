export const storage = {
    set: (key, value) => {localStorage.setItem(key, JSON.stringify(value))},
    get: (key) => JSON.parse(localStorage.getItem(key)),
    remove: (key) => {localStorage.removeItem(key);},
    clear: () => {localStorage.clear()}
};