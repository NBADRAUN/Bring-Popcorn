//API url to collect genre IDs: Requirement API key
//https://api.themoviedb.org/3/genre/movie/list?api_key={Api_key}&language=en-US

//API url movie search via genre. Requirement: API key and Genre ID
//https://api.themoviedb.org/3/discover/movie?api_key={Api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_genres={genre id}&with_watch_monetization_types=flatrate

//API url to grab top rated movies and ids. Requirement: genre ID
//https://api.themoviedb.org/3/movie/top_rated?api_key={keycode}&language=en-US&page=1&genre_ids={genre_id}&original_language=en

//API to request poster image of movie poster. Requirement: Movie ID
//https://image.tmdb.org/t/p/original/{movie_id}

//Personal Api Key
var apiKey = 'd31ccc62253ac4e1f5fdf6fba2c7305e';

/* ------ API for genre IDS ------ */
var genreListUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

//Favorites Storage
var favoriteStorage = [];

//Event Listener for genre selection
var genreSelection = '';
var page = 1;

//Calls function to collect favorites from localStorage
function init() {
    //Grabs data from localStorage via key
    favoriteData = localStorage.getItem('favorite');

    //Checks if localStorage is empty
    if (favoriteData !== null) {
        //Splits localStorage into array of numbers and saves as global variable
        favoriteStorage = favoriteData.split(",");
        console.log(favoriteStorage);
    };
};

//Calls function to pull localStorage
init();

//Event listener for all buttons
document.addEventListener('click', function(event) {

        //Genre dropdown list button
    if (event.target.id == 'genreToggle') { 
        return;

        //Genre selection
    } else if (event.target.classList.contains('dropdown-item')) { //Genre selection button
        page = 1;
        genreSelection = event.target.id;
        var more = document.getElementById('more-button');
        var back = document.getElementById('back-button')
        if (more != null && back != null) {
            more.remove();
            back.remove();
            getGenreTopRated();
        } else if (more !=null && back == null) {
            more.remove();
            getGenreTopRated();
        } else {
            getGenreTopRated();
        };

        //If favorites button is clicked, add movie-id to localStorage
    } else if (event.target.classList.contains('favorites-button')) {

            //Checks if movie is already in favorites
        if (!favoriteStorage.includes(event.target.id)) {
            favoriteStorage.push(event.target.id);
            localStorage.setItem('favorite', favoriteStorage);

        } else {
            return;
        };

        //If first page remove More button
    } else if (event.target.id == 'more-button' && page == 1) {
        page ++; 
        event.target.remove();
        getGenreTopRated();

        //If page > 1 remove the back-button
    } else if (event.target.id == 'more-button' && page > 1) {
        page++;
        var backButton = document.getElementById('back-button');
        backButton.remove();
        event.target.remove();
        getGenreTopRated();

        //If page > 1 remove both Back nad More buttons
    } else if (event.target.innerHTML == 'Back' && page > 1) {
        page --;
        var moreButton = document.getElementById('more-button');
        moreButton.remove();
        event.target.remove();
        getGenreTopRated();

        //Display favorited movies button
    } else if (event.target.id == 'display-favorites') {
        page = 1;
        var more = document.getElementById('more-button');
        var back = document.getElementById('back-button');
        //Checks and deletes more and back buttons
        if (more != null && back != null) {
            more.remove();
            back.remove();
            getFavorites();
        } else if (more !=null && back == null) {
            more.remove();
            getFavorites();
        } else {
            getFavorites();
        }
    }
});

/* ------Top-rated movies by genre------*/
function getGenreTopRated() {

    //Selects the card collection body
    var cardsContainer = document.getElementById('formContainer');
    cardsContainer.classList.add('mx-2', 'mx-2');
    
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

            //Grabs information and builds cards for each movie
            for (i=0; i<data.results.length; i++) {

                //Creates information variables to plug into cards
                var posterCode = data.results[i].poster_path;
                var title = data.results[i].title;
                var description = data.results[i].overview;
                var date = data.results[i].release_date;
                var rating = Math.floor(data.results[i].vote_average);
                var id = data.results[i].id;

                //Creates Card form container
                var card = document.createElement('div');
                    card.classList.add('card', 'text-center', 'mx-2', 'my-2', 'rounded');
                    card.style.width = '15rem';
                    card.style.border = '0.1rem solid black';

                //Creates Image element
                var image = document.createElement('img');
                    image.classList.add('card-img-top', 'mt-3');
                    image.src = `https://image.tmdb.org/t/p/original/${posterCode}`
                    image.style.border = '0.1rem solid black';
                
                //Creates Card body
                var cardBody = document.createElement('div');
                    cardBody.classList.add('card-body', 'rounded');

                //Creates title
                var cardTitle = document.createElement('h5');
                    cardTitle.classList.add('card-title');
                    cardTitle.innerHTML = title;
                    
                //Creates description
                // var cardDescription = document.createElement('p');
                //     cardDescription.classList.add('card-text');
                //     cardDescription.innerHTML = description;
                //     cardDescription.style.fontSize = '0.8rem';
                    
                //Creates list form
                var ul = document.createElement('ul');
                    ul.classList.add('list-group', 'list-group-flush', 'mb-2');
                    // ul.style.border = '0.1rem solid black';
                    

                //Creates list elements
                var liDate = document.createElement('li');
                    liDate.classList.add('list-group-item');
                    liDate.innerHTML = `${date}`;
                    
                //Rating
                var liRating = document.createElement('li');
                    liRating.classList.add('list-group-item');
                    liRating.innerHTML = `Rating: ${rating}/10`;

                    //Stars, Stars, Stars!
                    // if (rating === 10) {
                    //     liRating.innerHTML = '&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;'
                    // } else if (rating === 9) {
                    //     liRating.innerHTML = '&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9734;'
                    // } else if (rating === 8) {
                    //     liRating.innerHTML = '&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9734;&#9734;'
                    // } else if (rating === 7) {
                    //     liRating.innerHTML = '&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9734;&#9734;&#9734;'
                    // } else if (rating === 6) {
                    //     liRating.innerHTML = '&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9734;&#9734;&#9734;&#9734;'
                    // } else if (rating === 5) {
                    //     liRating.innerHTML = '&#9733;&#9733;&#9733;&#9733;&#9733;&#9734;&#9734;&#9734;&#9734;&#9734;'
                    // } else if (rating === 4) {
                    //     liRating.innerHTML = '&#9733;&#9733;&#9733;&#9733;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;'
                    // } else if (rating === 3) {
                    //     liRating.innerHTML = '&#9733;&#9733;&#9733;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;'
                    // } else if (rating === 2) {
                    //     liRating.innerHTML = '&#9733;&#9733;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;'
                    // } else if (rating === 1) {
                    //     liRating.innerHTML = '&#9733;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;'
                    // } else {
                    //     return;
                    // }
                    
                //Favorites Button
                var liButton = document.createElement('li');
                    liButton.classList.add('list-group-item');
                var button = document.createElement('button');
                    button.classList.add('btn', 'btn-dark', 'favorites-button');
                    button.type = 'button';
                    button.id = id;
                    button.innerHTML = 'Add to favorites';
                    
                //Appends information into cards
                card.appendChild(image);
                cardBody.appendChild(cardTitle);
                // cardBody.appendChild(cardDescription);
                ul.appendChild(liDate);
                ul.appendChild(liRating);
                liButton.appendChild(button);
                ul.appendChild(liButton);
                card.appendChild(cardBody);
                card.appendChild(ul);
                cardsContainer.appendChild(card);

            };

            var pageNumContainer = document.getElementById('page-dir');

            if (page > 1) {
                var previousMovies = document.createElement('button');
                previousMovies.classList.add('btn', 'btn-danger')
                previousMovies.id = 'back-button';
                previousMovies.innerHTML = 'Back';
                pageNumContainer.appendChild(previousMovies);
        }

                //More movies button
                var moreMovies = document.createElement('button');
                moreMovies.classList.add('btn', 'btn-danger');
                moreMovies.id = 'more-button';
                moreMovies.innerHTML = 'More';
                pageNumContainer.appendChild(moreMovies);

    })
};

function getFavorites() {

    var cardsContainer = document.getElementById('formContainer');
    cardsContainer.classList.add('mx-2', 'mx-2');
        if (cardsContainer.hasChildNodes()) {
        while (cardsContainer.firstChild) {
            cardsContainer.removeChild(cardsContainer.firstChild);
          }
        };
        console.log(favoriteStorage);
    for (i=0; i<favoriteStorage.length; i++) {

        movieId = favoriteStorage[i];
        var movieSearchUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
        
        fetch(movieSearchUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            
                //Creates information variables to plug into cards
                var posterCode = data.poster_path;
                var title = data.title;
                var description = data.overview;
                var date = data.release_date;
                var rating = Math.floor(data.vote_average);
                var id = data.id;
            
                //Creates Card form container
                var card = document.createElement('div');
                    card.classList.add('card', 'text-center', 'mx-2', 'my-2', 'cardBox');
                    card.style.width = '15rem';
                    card.style.border = '0.1rem solid black';

                //Creates Image element
                var image = document.createElement('img');
                    image.classList.add('card-img-top', 'mt-3');
                    image.src = `https://image.tmdb.org/t/p/original/${posterCode}`;
                    image.style.border = '0.1rem solid black';
                            
                //Creates Card body
                var cardBody = document.createElement('div');
                    cardBody.classList.add('card-body');
            
                //Creates title
                var cardTitle = document.createElement('h5');
                    cardTitle.classList.add('card-title');
                    cardTitle.innerHTML = title;
                                
                //Creates description
                // var cardDescription = document.createElement('p');
                //     cardDescription.classList.add('card-text');
                //     cardDescription.innerHTML = description;
                //     cardDescription.style.fontSize = '0.8rem'
                                
                //Creates list form
                var ul = document.createElement('ul');
                    ul.classList.add('list-group', 'list-group-flush', 'mb-2', 'bg-light');
            
                //Creates list elements
                var liDate = document.createElement('li');
                    liDate.classList.add('list-group-item');
                    liDate.innerHTML = `${date}`;
                                
                //Rating
                var liRating = document.createElement('li');
                    liRating.classList.add('list-group-item');
                    liRating.innerHTML = `Rating: ${rating}/10`;
                                
                //Favorites Button
                var liButton = document.createElement('li');
                    liButton.classList.add('list-group-item');
                var button = document.createElement('button');
                    button.classList.add('btn', 'btn-dark', 'favorites-button');
                    button.type = 'button';
                    button.id = id;
                    button.innerHTML = 'Add to favorites';
                                
                //Appends information into cards
                card.appendChild(image);
                cardBody.appendChild(cardTitle);
                // cardBody.appendChild(cardDescription);
                ul.appendChild(liDate);
                ul.appendChild(liRating);
                liButton.appendChild(button);
                ul.appendChild(liButton);
                card.appendChild(cardBody);
                card.appendChild(ul);
                cardsContainer.appendChild(card);

        })
    }
};



// var descriptionP = document.createElement('p');
// var descriptionBtn = document.createElement('button');
// descriptionBtn.classList.add('btn', 'btn-primary');
// descriptionBtn.type = 'button';
// descriptionBtn.setAttribute('data-bs-toggle', 'collapse');
// descriptionBtn.setAttribute('data-bs-target', '#collapseExample');
// descriptionBtn.setAttribute('aria-expanded', 'false');
// descriptionBtn.setAttribute('aria-controls', 'collapseExample');
// descriptionBtn.innerHTML = 'Description';

// var descriptionBox = document.createElement('div');
// descriptionBox.classList.add('collapse');
// descriptionBox.id = 'collapseExample';

// var descriptionText = document.createElement('div');
// descriptionText.classList.add('card', 'card-body');
// descriptionText.innerHTML(description);

// descriptionP.appendChild(descriptionBtn);
// descriptionBox.appendChild(descriptionText);
// cardBody.appendChild(descriptionP);
// cardBody.appendChild(descriptionBox)