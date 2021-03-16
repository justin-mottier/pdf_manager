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

    #requestAndResponse(route, params=null, method="GET") {
        this.#httpClient.open(method, this.#buildUrl(route), false)
        this.#httpClient.send(params);

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

    uploadPdfFile(name, file) {
        let formData = new FormData()
        formData.append('name', name)
        formData.append(encodeURIComponent(name), file)
        console.log(this.#requestAndResponse('add', formData, "POST"))
    }
}
