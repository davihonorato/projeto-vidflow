/*
* Mostrar vídeos
*/
const containerVideos = document.querySelector('.videos__container');

async function displayVideos() {
    try {
        const busca = await fetch("http://localhost:3000/videos");
        const videos = await busca.json();
        
        videos.forEach((video)=> {
            if (video.categoria == "") {
                throw new Error("O vídeo não tem categoria.");
            }
            
            containerVideos.innerHTML += `
            <li class="videos__item">
                <iframe src="${video.url}" title"${video.titulo}" frameborder="0" allowfullscreen></iframe>
                
                <div class="descricao-video">
                    <img class="img-canal" src = "${video.imagem}" alt="Logo do Canal">
                    <h3 class="titulo-video">${video.titulo}</h3>
                    <p class="titulo-canal">${video.descricao}</p>
                </div>
            </li>
            `;
        });
    } catch(error) {
        containerVideos.innerHTML = `<p>Houve um erro ao carregar os vídeos: ${error}</p>`
    }
}
displayVideos();


/*
* Barra de pesquisa
*/
const searchBar = document.querySelector(".pesquisar__input");

if (searchBar) {
    searchBar.addEventListener("input", searchFilter);
}

function searchFilter(){
    const videos = document.querySelectorAll(".videos__item");

    if (searchBar.value != ""){
        for(let video of videos){
            let titulo = video.querySelector(".titulo-video").textContent.toLowerCase();
            let valorFiltro = searchBar.value.trim().toLowerCase();

            if(!titulo.includes(valorFiltro)){
                video.style.display = 'none';
            } else {
                video.style.display = '';
            }
        }
    } else {
        for(let video of videos) {
            video.style.display = '';
        }
    }
}
