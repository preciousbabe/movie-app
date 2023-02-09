const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=5647e26002f60e998d93826502c23490&page=1'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=5647e26002f60e998d93826502c23490&query="'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

getMovies(API_URL)
async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
main.innerHTML =''

movies.forEach((movie) => {
    const { title, vote_average, poster_path, overview} = movie

    const movieEl = document.createElement('div')
    movieEl.classList.add('movie')

    movieEl.innerHTML= `
    <img src="${IMG_PATH + poster_path}" alt="${title}">
    <div class="movie-info">
    <h3>${title}</h3>
    <span class="${getRating(vote_average)}">${vote_average}</span>
    </div>
    <div class ="overview">
    ${overview}
    </div>
    `
    main.appendChild(movieEl)
})
}
function getRating(vote) {
    if(vote >= 8){
    return 'green'
    }else if(vote >=5){
        return 'orange'
    }else{
        return 'red'
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const searchItem = search.value
    if(searchItem && searchItem !=='') {
        getMovies(SEARCH_API + searchItem)

        search.value =''

    }else{
        window.location.reload()
    }
});

