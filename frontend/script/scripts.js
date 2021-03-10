import ApiWrapper from '../src/ApiWrapper.js'


class ViewController {

    pdfFilesList

    constructor() {
        let a = new ApiWrapper()
        this.pdfFilesList = a.getAllPdfFiles()
        if (this.pdfFilesList !== null) {
            this.hideSpinner()
            this.displayContent()
        }
    }

    displayContent() {
        let fileGallery = document.getElementById('fileGallery')

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
