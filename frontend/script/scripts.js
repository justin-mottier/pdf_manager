import ApiWrapper from '../src/ApiWrapper.js'


class ViewController {

    pdfFilesList
    #apiWrapper

    constructor() {
        this.#apiWrapper = new ApiWrapper()
        this.pdfFilesList = this.#apiWrapper.getAllPdfFiles()
        if (this.pdfFilesList !== null) {
            this.hideSpinner()
            this.displayContent()
        }

        document.getElementById('upload-input').addEventListener('change', (event) => {
            document.getElementById('upload-button').innerText = document.getElementById("upload-input").files[0].name
        })
        document.getElementById('upload-action').addEventListener('click', (event) => {
            this.fileUploadedCallback(event)
        })

    }

    fileUploadedCallback(_event) {
        let fileList = document.getElementById("upload-input").files
        let name = document.getElementById('upload-name').value
        for (let file of fileList) {
            this.#apiWrapper.uploadPdfFile(name, file)
        }

        this.pdfFilesList = this.#apiWrapper.getAllPdfFiles()
        this.displayContent()
    }

    displayContent() {
        let fileGallery = document.getElementById('fileGallery')
        fileGallery.textContent = "";

        for (let file of this.pdfFilesList) {
            console.log(file)
            fileGallery.append(this.createPdfElement(file['name']))
        }
    }

    hideSpinner() {
        let spinner = document.getElementById("spinner")
        spinner.classList.add('uk-animation-reverse')
        spinner.classList.add('uk-animation-fade')
    }

    createPdfElement(fileName) {
        let e = document.createElement('div')

        let card = document.createElement('div')
        card.classList.add('uk-card')
        card.classList.add('uk-card-default')

        let icon = document.createElement('span')
        icon.classList.add('uk-card-body')
        icon.setAttribute('uk-icon', 'icon: file-pdf; ratio: 8')

        let name = document.createElement('h3')
        name.classList.add('uk-card-title')
        name.innerText = fileName

        card.append(icon)
        card.append(name)
        e.append(card)
        return e
    }
}

let controller = new ViewController()
