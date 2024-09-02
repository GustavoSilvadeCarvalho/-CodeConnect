const uploadBtn = document.getElementById("upload-btn")
const inputUpload = document.getElementById("image-upload")

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader()
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name })
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo)
    })
}

const imagemPrincipal = document.querySelector(".main-imagem")
const nomeDaImagem = document.querySelector(".container-image-nome p")

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0]

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo)
            imagemPrincipal.src = conteudoDoArquivo.url
            nomeDaImagem.textContent = conteudoDoArquivo.nome
        } catch (error) {
            console.error("Erro na leitura do arquivo")
        }
    }
})

const inputTags = document.getElementById("input-tags")
const listaTags = document.getElementById("lista-tags")

inputTags.addEventListener("keypress", (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault()
        const tagTexto = inputTags.value.trim()
        if (tagTexto !== "") {
            const tagNova = document.createElement("li")
            tagNova.innerHTML = `<p>${tagTexto}</p> <img src="img/close-black.svg" class="remove-tag">`
            listaTags.appendChild(tagNova)
            inputTags.value = ""
        }
    }
})

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const tagParaRemover = evento.target.parentElement
        listaTags.removeChild(tagParaRemover)
    }
})

const tagsDisponiveis = ["Front-end", "Programação", "Back-end", "Banco de dados", "HTML", "Full-stack"]

async function verificaTags(tagTexto) {
    return new Promisse((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto))
        }, 1000)
    })
}