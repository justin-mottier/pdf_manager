export default class ApiWrapper {
    static #ROUTE_PREFIX = "pdf-file"

    #httpClient
    #baseUrl

    constructor(domain, port) {
        this.#httpClient = new XMLHttpRequest();
        this.#baseUrl = new URL(ApiWrapper.#ROUTE_PREFIX, domain)
        console.log(this.#baseUrl.toString())
        this.#baseUrl.port = port
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

        return JSON.parse(this.#httpClient.responseText)
    }

    getAllPdfFiles() {
        return this.#requestAndResponse('all')['data']
    }

    getPdfFileById(id) {
        return this.#requestAndResponse(id)
    }

    uploadPdfFile(name, file) {
        let formData = new FormData()
        formData.append('name', name)
        formData.append(encodeURIComponent(name), file)
        return this.#requestAndResponse('add', formData, "POST")
    }

    editPdfFile(id, name) {
        return this.#requestAndResponse(id + '/' + name, null, "PUT")
    }

    rmPdfFile(id) {
        return this.#requestAndResponse(id, null, "DELETE")
    }
}
