
const container = document.querySelector(".container");
const prevButton = document.querySelector("button.prev")
const nextButton = document.querySelector("button.next")
const NUMBER_OF_MOVIES_PER_PAGE = 10;
let currentPage = 1;
let moviesData;

function fetchUrl(){
    fetch(
      "https://raw.githubusercontent.com/erik-sytnyk/movies-list/master/db.json"
    )
      .then((response) => response.json())
      .then((data) => {
        let html = "";
        moviesData = data.movies;
        data.movies.forEach( (movie, index) => {
            let roundIndex = index + 1;
            if(roundIndex === 1 || (roundIndex - 1) % NUMBER_OF_MOVIES_PER_PAGE === 0){
                html += `<ul class='list-wrapper ${roundIndex === 1 ? 'active' : ''}' data-index='${Math.ceil(roundIndex/NUMBER_OF_MOVIES_PER_PAGE)}'>`
            }
            html += `<li> 
                <div class="card">
                    <img src="${movie.posterUrl}" alt="Image Missing" />
                    <h2> ${movie.title} </h2>
                    <p> ${movie.genres} </p>
                </div>
            </li>`;
            if(data.movies.length === roundIndex || (roundIndex) % NUMBER_OF_MOVIES_PER_PAGE === 0){
                html += "</ul>"
            }
            
        })
        container.innerHTML =(html);
        showHideList()
    } );
}

prevButton.addEventListener('click', () => {
    prevPage()
})

nextButton.addEventListener('click', () => {
    nextPage()
})

function nextPage(){
    currentPage++;
    showHideList()
}

function prevPage(){
    currentPage--;
    showHideList()
}

function showHideList() {
    document.querySelector(".list-wrapper.active").classList.remove("active");
    document.querySelector(`.list-wrapper[data-index='${currentPage}']`).classList.add("active");
    if(currentPage <= 1){
        prevButton.classList.add("disabled");
    } else {
        prevButton.classList.remove("disabled");
    }

    if(currentPage >= Math.ceil(moviesData.length/NUMBER_OF_MOVIES_PER_PAGE)){
        nextButton.classList.add("disabled");
    } else {
        nextButton.classList.remove("disabled");
    }
    document.body.scrollTop = document.documentElement.scrollTop = 0;

}

fetchUrl();