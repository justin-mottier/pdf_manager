import ApiWrapper from '../src/ApiWrapper.js'

let a = new ApiWrapper()
let response = a.getAllPdfFiles()

console.log(response)

let fileGallery = document.getElementById('fileGallery')

function createPdfElement(fileName) {
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

for (let file of response) {
    console.log(file)
    fileGallery.append(createPdfElement(file['name']))
}

