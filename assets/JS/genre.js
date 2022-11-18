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

//Favorites Storage
var favoritesList = [];

//Event Listener for genre selection
var genreSelection = '';
var page = 1;
//Calls function to collect favorites from localStorage

function init() {
    var historyList = JSON.parse(localStorage.getItem('favorites'));
    if (historyList !== null) {
        for (i=0; i<historyList.length; i++) {
            favoritesList.push(historyList[i]);
        };
    };
};
init();



//Event listener for all buttons
document.addEventListener('click', function(event) {
    if (event.target.id === 'none') { //Genre dropdown list button
        return;

    } else if (event.target.classList.contains('dropdown-item')) { //Genre selection button
        genreSelection = event.target.id;
        page = 1;
        getGenreTopRated();

    } else if (event.target.classList.contains('favorites-button')) { //Favorites button storage
        favoritesList.push(event.target.id);
        localStorage.setItem('favorites', favoritesList);

    } else if (event.target.innerHTML === 'More' && page === 1) { //If first page of movies create back button and remove current more button
        page ++;
        var previousMovies = document.createElement('button');
        previousMovies.id = 'back-button';
        previousMovies.innerHTML = 'Back';
        event.target.remove();
        document.body.appendChild(previousMovies);
        getGenreTopRated();

    } else if (event.target.innerHTML === 'More' && page > 1) { //If on 2nd page, call for next page and remove current more button
        page ++;
        event.target.remove();
        getGenreTopRated();

    } else if (event.target.innerHTML === 'Back' && page > 2) {  //If on page 3+, remove more button and decrease page by 1
        page --;
        var moreButton = document.getElementById('more-button');
        moreButton.remove();
        getGenreTopRated();

    } else if (event.target.innerHTML === 'Back' && page === 2) { //If on page 2 and back button is click, remove back button and current more button
        page --;
        var moreButton = document.getElementById('more-button');
        moreButton.remove();
        event.target.remove();
        getGenreTopRated();
    }
});

/* ------Genre Id/Name List ------ */
var genreListUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
var genreIdList = [];
var genreNameList = [];


/* ------Top-rated movies by genre------*/
function getGenreTopRated() { //Grabs top rated movies by genre. Requirement: genre ID 

    //Selects the card collection body
    var cardsContainer = document.getElementById('formContainer');


    //Gets rid of previous cards when selecting new genre
    if (cardsContainer.hasChildNodes()) {
    while (cardsContainer.firstChild) {
        cardsContainer.removeChild(cardsContainer.firstChild);
      }
    };
    
    //API url to fetch top rated movies by genre
    var topRatedListUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&
                        include_adult=false&include_video=false&page=${page}&with_genres=${genreSelection}&with_watch_monetization_types=flatrate`;

    fetch(topRatedListUrl) //Creates a fetch request
    
        //Checks the response of the request
        .then(function (response) {
            return response.json();//Reformats API request response
        
        }) //Requests the data from the API
        .then(function (data) {
            console.log(data);

            //Loops through top rated movies in specific genre
            for (i=0; i<data.results.length; i++) {

                //Creates information variables to plug into cards
                var posterCode = data.results[i].poster_path;
                var title = data.results[i].title;
                var description = data.results[i].overview;
                var date = data.results[i].release_date;
                var rating = data.results[i].vote_average;
                var id = data.results[i].id;

                //Creates Card form container
                var card = document.createElement('div');
                card.classList.add('card', 'text-center', 'mx-3', 'my-3');
                card.style.width = '18rem';

                //Creates Image element
                var image = document.createElement('img');
                image.classList.add('card-img-top', 'mt-3');
                image.src = `https://image.tmdb.org/t/p/original/${posterCode}`
                card.appendChild(image);

                //Creates Card body
                var cardBody = document.createElement('div');
                cardBody.classList.add('card-body');

                //Creates title
                var cardTitle = document.createElement('h5');
                cardTitle.classList.add('card-title');
                cardTitle.innerHTML = title;
                cardBody.appendChild(cardTitle);

                //Creates description
                var cardDescription = document.createElement('p');
                cardDescription.classList.add('card-text');
                cardDescription.innerHTML = description;
                cardBody.appendChild(cardDescription);
                

                //Creates list form
                var ul = document.createElement('ul');
                ul.classList.add('list-group', 'list-group-flush');

                //Creates list elements
                var liDate = document.createElement('li');
                liDate.classList.add('list-group-item');
                liDate.innerHTML = `Date Released: ${date}`;
                ul.appendChild(liDate);
                
                //Rating
                var liRating = document.createElement('li');
                liRating.classList.add('list-group-item');
                liRating.innerHTML = `Rating: ${rating}/10`;
                ul.appendChild(liRating);

                //Favorites Button
                var liButton = document.createElement('li');
                liButton.classList.add('list-group-item');
                var button = document.createElement('button');
                button.classList.add('btn', 'btn-dark', 'favorites-button');
                button.type = 'button';
                button.id = id;
                button.innerHTML = 'Add to favorites';
                liButton.appendChild(button);
                ul.appendChild(liButton);
                
                //More movies button
                var moreMovies = document.createElement('button');
                moreMovies.classList.add('text-center', );
                moreMovies.innerHTML = 'More';

                //Appends card information into card then into card container
                card.appendChild(cardBody);
                card.appendChild(ul);
                cardsContainer.appendChild(card);

            };

                // //Previous movies button
                // var previousMovies = document.createElement('button');
                // previousMovies.classList.add('justify-content-center');
                // previousMovies.id = 'back-button';
                // previousMovies.innerHTML = 'Back';
                // document.body.appendChild(previousMovies);

                //More movies button
                var moreMovies = document.createElement('button');
                moreMovies.classList.add('text-center', );
                moreMovies.id = 'more-button';
                moreMovies.innerHTML = 'More';
                document.body.appendChild(moreMovies);


    })
};
