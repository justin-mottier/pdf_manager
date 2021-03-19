import ApiWrapper from '../src/ApiWrapper.js'


class ViewController {

    pdfFilesList
    #domain
    #port
    #apiWrapper

    constructor() {
        this.#domain = 'http://localhost'
        this.#port = 8080

        this.#apiWrapper = new ApiWrapper(this.#domain, this.#port)
        this.pdfFilesList = this.#apiWrapper.getAllPdfFiles()
        if (this.pdfFilesList !== null) {
            this.hideSpinner()
            this.displayContent()
        }

        document.getElementById('upload-input').addEventListener('change', (event) => {
            document.getElementById('upload-button').innerText = document.getElementById("upload-input").files[0].name
            document.getElementById('upload-name').value = document.getElementById("upload-input").files[0].name
        })
        document.getElementById('upload-action').addEventListener('click', (event) => this.fileUploadedCallback(event))
        document.getElementById('confirm-new-name').addEventListener('click', (event) => this.changeNameCallback(event))

        // UIkit.notification({
        //     message: 'my-message!',
        //     status: 'primary',
        //     pos: 'top-right',
        //     timeout: 5000
        // });
    }

    notify(msg) {
        UIkit.notification({
            message: msg,
            status: 'secondary',
            timeout: 3000,
            pos: 'bottom-right'
        })
    }

    fileUploadedCallback(_event) {
        let fileList = document.getElementById("upload-input").files
        let name = document.getElementById('upload-name').value
        for (let file of fileList) {
            let response = this.#apiWrapper.uploadPdfFile(name, file)
            this.notify(response.data['msg'])
        }

        this.pdfFilesList = this.#apiWrapper.getAllPdfFiles()
        this.displayContent()

        document.getElementById('upload-button').innerText = 'Click here to upload a new file'
        document.getElementById('upload-name').value = 'Upload'
    }

    displayContent() {
        let fileGallery = document.getElementById('fileGallery')
        fileGallery.textContent = "";

        if (this.pdfFilesList.length === 0) {
            document.getElementById('no-file').hidden = false
        } else {
            document.getElementById('no-file').hidden = true
        }

        for (let file of this.pdfFilesList) {
            console.log(file)
            fileGallery.append(this.createPdfElement(file['id'], file['name']))
        }
    }

    hideSpinner() {
        let spinner = document.getElementById("spinner")
        spinner.classList.add('uk-animation-reverse')
        spinner.classList.add('uk-animation-fade')
    }

    createPdfElement(id, fileName) {
        let e = document.createElement('div')

        let card = document.createElement('div')
        card.classList.add('uk-card-small')
        card.classList.add('uk-card-default')

        let cardBody = document.createElement('div')
        cardBody.classList.add('uk-card-body')

        let iconsContainer = document.createElement('div')

        let pdfIcon = document.createElement('span')
        pdfIcon.classList.add('uk-width-1-1')
        pdfIcon.setAttribute('uk-icon', 'icon: file-pdf; ratio: 8')

        let viewIcon = document.createElement('a')
        viewIcon.setAttribute('uk-icon', 'icon: link')
        viewIcon.classList.add('uk-icon-button')
        viewIcon.classList.add('uk-width-1-3')
        viewIcon.classList.add('uk-background-primary')
        viewIcon.classList.add('uk-light')
        viewIcon.href = this.#domain + ':' + this.#port + '/pdf-file/read/' + id
        viewIcon.target = 'blank'

        let editIcon = document.createElement('span')
        editIcon.setAttribute('uk-icon', 'icon: pencil')
        editIcon.classList.add('uk-icon-button')
        editIcon.classList.add('uk-width-1-3')
        editIcon.classList.add('uk-background-primary')
        editIcon.classList.add('uk-light')
        editIcon.setAttribute('data-id', id)

        editIcon.addEventListener('click', (event) => this.onEditIconClickCallback(event))
        let rmIcon = document.createElement('span')
        rmIcon.setAttribute('uk-icon', 'icon: trash')
        rmIcon.classList.add('uk-icon-button')
        rmIcon.classList.add('uk-width-1-3')
        rmIcon.classList.add('uk-background-primary')
        rmIcon.classList.add('uk-light')
        rmIcon.setAttribute('data-id', id)
        rmIcon.addEventListener('click', (event) => this.onRmIconClickCallback(event))

        iconsContainer.append(pdfIcon)
        iconsContainer.append(viewIcon)
        iconsContainer.append(editIcon)
        iconsContainer.append(rmIcon)

        cardBody.append(iconsContainer)

        let name = document.createElement('h3')
        name.classList.add('uk-card-title')
        name.classList.add('uk-margin-remove-top')
        name.innerText = fileName

        card.append(cardBody)
        card.append(name)
        e.append(card)
        return e
    }

    onEditIconClickCallback(event) {
        let el = event.target
        let counter = 0

        while (!el.hasAttribute('data-id') && counter++ < 5) {
            el = el.parentElement
        }

        if (!el.hasAttribute('data-id')) {
            return
        }

        let modal = document.getElementById('edit-modal')
        modal.setAttribute('data-id', el.getAttribute('data-id'))
        UIkit.modal(modal).show();
    }

    changeNameCallback(event) {
        let modal = document.getElementById('edit-modal')
        let id = modal.getAttribute('data-id')
        let newName = document.getElementById('new-name').value
        let response = this.#apiWrapper.editPdfFile(id, newName)
        console.log(response)
        this.notify(response.data['msg'])
        this.pdfFilesList = this.#apiWrapper.getAllPdfFiles()
        this.displayContent()
    }

    onRmIconClickCallback(event) {
        let el = event.target
        let counter = 0

        while (!el.hasAttribute('data-id') && counter++ < 5) {
            el = el.parentElement
        }

        if (!el.hasAttribute('data-id')) {
            return
        }

        let id = el.getAttribute('data-id')
        let success = this.#apiWrapper.rmPdfFile(id)
        console.log(success)
        this.notify(success.data['msg'])
        this.pdfFilesList = this.#apiWrapper.getAllPdfFiles()
        this.displayContent()
    }
}

let controller = new ViewController()
