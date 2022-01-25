export default class Server {
    // Базовый адрес сервера
    _urlBase = 'https://front-test.beta.aviasales.ru';

    async getResource(url) {
        const res = await fetch(this._urlBase + url)
        return await res.json()
    }

    getSearchId = async (url) => {
        return await this.getResource(url)
    }

    async getTickets(url) {
        return await this.getResource(url)
    }
}