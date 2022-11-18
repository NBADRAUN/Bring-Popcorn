//MovieDb Api Key: d31ccc62253ac4e1f5fdf6fba2c7305e

//API url to collect genre IDs: Requirement API key
//https://api.themoviedb.org/3/genre/movie/list?api_key={Api_key}&language=en-US

//API url movie search via genre. Requirement: API key and Genre ID
//https://api.themoviedb.org/3/discover/movie?api_key={Api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_genres={genre id}&with_watch_monetization_types=flatrate

//API url to grab top rated movies and ids. Requirement: genre ID
//https://api.themoviedb.org/3/movie/top_rated?api_key={keycode}&language=en-US&page=1&genre_ids={genre_id}&original_language=en

//API to request poster image of movie poster. Requirement: Movie ID
//https://image.tmdb.org/t/p/original/{movie_id}

//Steps to create genrePage functionality
//1: Create event Listeners for genre selection
//2: Plug in 

//Personal Api Key
var apiKey = 'd31ccc62253ac4e1f5fdf6fba2c7305e';


/* ------Genre Id/Name List ------ */
var genreListUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
var genreIdList = [];
var genreNameList = [];


function getGenreList() { //Grabs genre list contained genre_ids
    fetch(genreListUrl) //Creates a fetch request

    .then(function (response) {//Checks the response of the request
        console.log(response);
        return response.json();//Reformats API request response
        
      }) //Requests the data from the API
    .then(function (data) {
        console.log(data);
        for (i=0; i<data.genres.length; i++) {
            genreIdList.push(data.genres[i].id);
            genreNameList.push(data.genres[i].name);    
        }
    })
    };

getGenreList();


/* ------Top-rated movies by genre------*/
var topRatedListUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&
                        include_adult=false&include_video=false&page=2&with_genres=${genreIdList[1]}&with_watch_monetization_types=flatrate`
var topRatedNameList = [];




function getGenreTopRated() { //Grabs top rated movies by genre. Requirement: genre ID 
    fetch(topRatedListUrl) //Creates a fetch request

        .then(function (response) {//Checks the response of the request
            //console.log(response);
            return response.json();//Reformats API request response
        
      }) //Requests the data from the API
        .then(function (data) {
            //console.log(data);
            for (i=0; i<data.results.length; i++) {
                topRatedNameList.push(data.results[i].original_title);           
            }
        console.log(topRatedNameList);
    })
    };

getGenreTopRated();