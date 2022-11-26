//MoviesDB Api Key
var apiKey = 'd31ccc62253ac4e1f5fdf6fba2c7305e';

//Favorites Storage
var favoriteStorage = [];
var favoriteData;
var modal = document.getElementById('modalBox');

//Clear Button event Listener
document.addEventListener('click', function(event) {
if (event.target.classList.contains('remove-button')) {
    localStorage.removeItem('favorite');
    event.target.classList.add('bg-success');
    event.target.innerHTML = 'Cleared!'
    var cardsContainer = document.getElementById('formContainer');
    if (cardsContainer.hasChildNodes()) {
        while (cardsContainer.firstChild) {
            cardsContainer.removeChild(cardsContainer.firstChild);
          }
        };
    }    //If modal is visible this is close button
        else if (event.target.id == 'closeBtn') {
            modal.classList.remove('alert');
}});

//Grabs localStorage information
function init() {
    //Grabs data from localStorage via key
    favoriteData = localStorage.getItem('favorite');

    //Checks if localStorage is empty
    if (favoriteData !== null) {
        //Splits localStorage into array of numbers and saves as global variable
        favoriteStorage = favoriteData.split(",");
        getFavorites();
    };
};

init();

//Display watchlist when page is first loaded.
function getFavorites() {
    var cardsContainer = document.getElementById('formContainer');
    cardsContainer.classList.add('mx-2');
        if (cardsContainer.hasChildNodes()) {
        while (cardsContainer.firstChild) {
            cardsContainer.removeChild(cardsContainer.firstChild);
          }
        };
    for (i=0; i<favoriteStorage.length; i++) {

        //Grabs movie id from localStorage and inserts into url
        movieId = favoriteStorage[i];
        var movieSearchUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
        
        //Fetches data from url
        fetch(movieSearchUrl)
        //Checks the response of the request
        .then(function (response) {
            if (response.ok) {
            return response.json();//Reformats API request response
            } else {
                //Creates a modal if the fetch request is malfunctioning
                modal.classList.add('alert');
            }
        }) //Requests the data from the API
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
                var cardDescription = document.createElement('p');
                    cardDescription.classList.add('card-text');
                    cardDescription.innerHTML = description;
                    cardDescription.style.fontSize = '0.8rem'
                                
                //Creates list form
                var ul = document.createElement('ul');
                    ul.classList.add('list-group', 'list-group-flush', 'mb-2', 'bg-light');
            
                //Creates list elements
                var liDate = document.createElement('li');
                    liDate.classList.add('list-group-item');
                    liDate.innerHTML = `- Release Date- <br> ${date}`;
                    //Checking if release date exists
                    if (date == '') {
                        liDate.innerHTML = 'Currently not available'
                    }
                                
                //Rating
                var liRating = document.createElement('li');
                    liRating.classList.add('list-group-item');
                    
                    //Stars, Stars, Stars!
                    if (rating === 10) {
                        liRating.innerHTML = '- Rating - <br> &#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;'
                    } else if (rating === 9) {
                        liRating.innerHTML = '- Rating - <br> &#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9734;'
                    } else if (rating === 8) {
                        liRating.innerHTML = '- Rating - <br> &#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9734;&#9734;'
                    } else if (rating === 7) {
                        liRating.innerHTML = '- Rating - <br> &#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9734;&#9734;&#9734;'
                    } else if (rating === 6) {
                        liRating.innerHTML = '- Rating - <br> &#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9734;&#9734;&#9734;&#9734;'
                    } else if (rating === 5) {
                        liRating.innerHTML = '- Rating - <br> &#9733;&#9733;&#9733;&#9733;&#9733;&#9734;&#9734;&#9734;&#9734;&#9734;'
                    } else if (rating === 4) {
                        liRating.innerHTML = '- Rating - <br> &#9733;&#9733;&#9733;&#9733;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;'
                    } else if (rating === 3) {
                        liRating.innerHTML = '- Rating - <br> &#9733;&#9733;&#9733;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;'
                    } else if (rating === 2) {
                        liRating.innerHTML = '- Rating - <br> &#9733;&#9733;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;'
                    } else if (rating === 1) {
                        liRating.innerHTML = '- Rating - <br> &#9733;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;'
                    } else {
                        liRating.innerHTML = 'Currently not available'
                    };
                                
                //Appends information into cards
                card.appendChild(image);
                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardDescription);
                ul.appendChild(liDate);
                ul.appendChild(liRating);
                card.appendChild(cardBody);
                card.appendChild(ul);
                cardsContainer.appendChild(card);
                
        })
    }

        //Creates a remove all favorites button
        var button = document.createElement('button');
        var removeContainer = document.getElementById('clear-movies');
            button.classList.add('btn', 'btn-danger', 'remove-button', 'text-center', 'my-2');
            button.type = 'button';
            button.id = 'clear';
            button.innerHTML = 'Clear My Movies';
            removeContainer.appendChild(button);
};