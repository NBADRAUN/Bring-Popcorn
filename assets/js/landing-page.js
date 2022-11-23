// https://api.themoviedb.org/3/movie/550?api_key=95a7e5127d0a488c78d9f99eed7a76bd

// API Key 
var apiKey = '95a7e5127d0a488c78d9f99eed7a76bd';


function getPopular() {
  var mostPopURL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

  var formContainer = document.getElementById('form-container');
  formContainer.classList.add('mx-4', 'mx-4');
  


  fetch(mostPopURL)

  .then(function(response){
    if (response.ok) {
      response.json()

      .then(function(data){
        console.log(data)
      
      

    for (i=0; i<data.results.length; i++) {
      var posterCode = data.results[i].poster_path;
      var movieTitle = data.results[i].title;
      var movieId = data.results[i].id;
      var movieDescr = data.results[i].overview;
      var movieRating = Math.floor(data.results[i].vote_average); 
      var movieDate = data.results[i].release_date;
    

        // create container
        var card = document.createElement('div');
          card.classList.add('card', 'text-center', 'mx-2', 'my-2');
          card.style.width = '15rem';
          card.style.border = '0.1rem solid black';


        // create image 
        var image = document.createElement('img');
        image.classList.add('card-img-top', 'mt-3');
        image.src = `https://image.tmdb.org/t/p/original/${posterCode}`;
        image.style.border = '0.1rem solid black';

        // create card body
        var body = document.createElement('div');
        body.classList.add('card-body');

        // create title 
        var title = document.createElement('h5');
        title.classList.add('card-title');
        title.innerHTML = movieTitle;

        


        // create rating 
        var rating = document.createElement('li');
        rating.classList.add('list-group-item');
        rating.innerHTML = `Rating: ${movieRating}/10`;

        // creates unordered list
        var ul = document.createElement('ul');
        ul.classList.add('list-group', 'list-group-flush', 'mb-2');

        // create date
        var date = document.createElement('li');
        date.classList.add('list-group-item');
        date.innerHTML = `${movieDate}`;

        // create favorites button
        var movieBtn = document.createElement('li');
        movieBtn.classList.add('list-group-item');
        var button = document.createElement('button');
        button.classList.add('btn', 'btn-dark', 'favorites-button');
        button.type = 'button';
        button.id = movieId;
        button.innerHTML = 'Add to favorites';


        card.appendChild(image);
        card.appendChild(title);
        ul.appendChild(date);
        ul.appendChild(rating);
        movieBtn.appendChild(button);
        ul.appendChild(movieBtn);
        card.appendChild(body);
        card.appendChild(ul);
        formContainer.appendChild(card);
        
    }
  });

}});



};

getPopular();
       


      
      

        















