export default class ApiWrapper {
    static #DOMAIN = "http://localhost"
    static #PORT = "8080"
    static #ROUTE_PREFIX = "pdf-file"

    #httpClient
    #baseUrl

    constructor() {
        this.#httpClient = new XMLHttpRequest();
        this.#baseUrl = new URL(ApiWrapper.#ROUTE_PREFIX, ApiWrapper.#DOMAIN)
        console.log(this.#baseUrl.toString())
        this.#baseUrl.port = ApiWrapper.#PORT
        console.log(this.#baseUrl.toString())
    }

    #buildUrl(route) {
        return this.#baseUrl.toString() + '/' + route
    }

    #requestAndResponse(route) {
        this.#httpClient.open("GET", this.#buildUrl(route), false)
        this.#httpClient.send();

        if (this.#httpClient.status !== 200) {
            return null
        }

        return JSON.parse(this.#httpClient.responseText)['data']
    }

    getAllPdfFiles() {
        return this.#requestAndResponse('all')
    }

    getPdfFileById(id) {
        this.#requestAndResponse(id)
    }
}