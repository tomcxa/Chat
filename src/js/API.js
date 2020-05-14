export default class API {
    constructor(url) {
        this.url = url;
    }

    getUsers() {
        return fetch(this.url);
    }

    addUser(user) {
        return fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(user),
        });
    }

    removeUser(name) {
        return fetch(`${this.url}/${name}`, {
            method: 'DELETE',
        });
    }
}
