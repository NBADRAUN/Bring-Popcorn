//Personal Api Key
var apiKey = 'd31ccc62253ac4e1f5fdf6fba2c7305e';

//Finds search button
var searchBtn = document.getElementById('search-movies');

//Favorites Storage
var favoriteStorage = [];
var favoriteData;

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

init();
//Search button event listener 
searchBtn.addEventListener('click', function(event) {
    //URL Encoding search input
    event.preventDefault();
    var movieNameInput = document.getElementById('name-search').value;
    var encodedName = encodeURIComponent(movieNameInput);
    if (movieNameInput !== '') {
        searchMovies(encodedName);
    }
});

document.addEventListener('click', function(event) {
    if (event.target.id == 'search-movies') {
          //URL Encoding search input
        event.preventDefault();
        var movieNameInput = document.getElementById('name-search').value;
        var encodedName = encodeURIComponent(movieNameInput);
        if (movieNameInput !== '') {
        searchMovies(encodedName);
    }

    } else if (event.target.classList.contains('favorites-button')) {
        //Checks if movie is already in favorites
    if (favoriteStorage.includes(event.target.id)) {
        event.target.classList.add('bg-danger')
        event.target.innerHTML = 'Already saved!'
    } else {
        favoriteStorage.push(event.target.id);
        console.log(favoriteStorage);
        localStorage.setItem('favorite', favoriteStorage);
        event.target.classList.add('bg-success');
        event.target.innerHTML = 'Saved!'
    };
}
    
})

function searchMovies(nameOfMovie) {
    var searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${nameOfMovie}%7D&page=1&include_adult=false`

    fetch(searchUrl)
    .then( function(response) {
        if (response.ok) {
        return response.json();
        } else {
            window.location.href = 'Name of 404 html file'
        }
    })
    .then( function(data) {

    //Selects the card collection body
    var cardsContainer = document.getElementById('formContainer');
    cardsContainer.classList.add('mx-2');

    //Gets rid of previous cards when selecting new genre
    if (cardsContainer.hasChildNodes()) {
    while (cardsContainer.firstChild) {
        cardsContainer.removeChild(cardsContainer.firstChild);
      }
    };
        for (i=0; i<data.results.length; i++) {
            if (posterCode !== null) {
            //Creates information variables to plug into cards
            var posterCode = data.results[i].poster_path;
            var title = data.results[i].title;
            var description = data.results[i].overview;
            var date = data.results[i].release_date;
            var rating = Math.floor(data.results[i].vote_average);
            var id = data.results[i].id;

            //Creates Card form container
            var card = document.createElement('div');
                card.classList.add('card', 'text-center', 'mx-2', 'my-2');
                card.style.width = '15rem';
                card.style.border = '0.1rem solid black';

            //Creates Image element
            var image = document.createElement('img');
                image.classList.add('card-img-top', 'mt-3');
                image.src = `https://image.tmdb.org/t/p/original/${posterCode}`
                image.style.border = '0.1rem solid black';
                //Checks if poster image exists from data
                if (image.src === 'https://image.tmdb.org/t/p/original/null') {
                    var imageNone = document.getElementById('noImage').src
                    image.src = imageNone;
                }
            
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
                cardDescription.style.fontSize = '0.8rem';
                
            //Creates list form
            var ul = document.createElement('ul');
                ul.classList.add('list-group', 'list-group-flush', 'mb-2');
                // ul.style.border = '0.1rem solid black';
                

            //Creates list elements
            var liDate = document.createElement('li');
                liDate.classList.add('list-group-item');
                liDate.innerHTML = `Release Date: ${date}`;
                //Checking if date exists from data
                if (date == '') {
                    liDate.innerHTML = 'Currently not available'
                }
                
            //Rating
            var liRating = document.createElement('li');
                liRating.classList.add('list-group-item');
                // liRating.innerHTML = `Rating: ${rating}/10`;

                //Stars, Stars, Stars!
                if (rating === 10) {
                    liRating.innerHTML = '&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;'
                } else if (rating === 9) {
                    liRating.innerHTML = '&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9734;'
                } else if (rating === 8) {
                    liRating.innerHTML = '&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9734;&#9734;'
                } else if (rating === 7) {
                    liRating.innerHTML = '&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9734;&#9734;&#9734;'
                } else if (rating === 6) {
                    liRating.innerHTML = '&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9734;&#9734;&#9734;&#9734;'
                } else if (rating === 5) {
                    liRating.innerHTML = '&#9733;&#9733;&#9733;&#9733;&#9733;&#9734;&#9734;&#9734;&#9734;&#9734;'
                } else if (rating === 4) {
                    liRating.innerHTML = '&#9733;&#9733;&#9733;&#9733;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;'
                } else if (rating === 3) {
                    liRating.innerHTML = '&#9733;&#9733;&#9733;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;'
                } else if (rating === 2) {
                    liRating.innerHTML = '&#9733;&#9733;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;'
                } else if (rating === 1) {
                    liRating.innerHTML = '&#9733;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;'
                } else {
                    liRating.innerHTML = 'Currently not available'
                }
                
            //Favorites Button
            var liButton = document.createElement('li');
                liButton.classList.add('list-group-item');
            var button = document.createElement('button');
                button.classList.add('btn', 'btn-dark', 'favorites-button');
                button.type = 'button';
                button.id = id;
                button.innerHTML = 'Add to Favorites';
                
            //Appends information into cards
            card.appendChild(image);
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardDescription);
            ul.appendChild(liDate);
            ul.appendChild(liRating);
            liButton.appendChild(button);
            ul.appendChild(liButton);
            card.appendChild(cardBody);
            card.appendChild(ul);
            cardsContainer.appendChild(card);

        }};  
    })
};