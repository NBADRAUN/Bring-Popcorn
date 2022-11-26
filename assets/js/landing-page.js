// https://api.themoviedb.org/3/movie/550?api_key=95a7e5127d0a488c78d9f99eed7a76bd

// API Key 
var apiKey = '95a7e5127d0a488c78d9f99eed7a76bd';
// global variables 
var favStorage = [];
var favData;

// get favorites from local storage
function init() {
  console.log(favData);
  favData = localStorage.getItem('favorite');
  console.log(favData);
  
  if (favData !== null) {
      
      favStorage = favData.split(",");
      console.log(favStorage);
  };
};
init();

// favorites button event listner
document.addEventListener('click', function(event) {

  if (event.target.classList.contains('favorites-button')) {

  if (!favStorage.includes(event.target.id)) {
    favStorage.push(event.target.id);
    localStorage.setItem('favorite', favStorage);
    event.target.classList.add('bg-success');
    event.target.innerHTML = 'Saved!'

  } else {
    event.target.classList.add('bg-danger');
    event.target.innerHTML = 'Already saved!'
    console.log('saved');

  };  
  }
});

// get popular 

function getPopular() {
  var mostPopURL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

  var formContainer = document.getElementById('form-container');
  formContainer.classList.add('mx-4', 'my-4');
  
  fetch(mostPopURL)
  .then(function(response){
    if (response.ok) {
      response.json()
   .then(function(data){
        console.log(data)
      
    // loop   
      for (i=0; i<data.results.length; i++) {
        var posterCode = data.results[i].poster_path;
        var movieTitle = data.results[i].title;
        var movieId = data.results[i].id;
        var movieRating = Math.floor(data.results[i].vote_average); 
        var movieDate = data.results[i].release_date;

        // create container
        //var card = document.createElement('div');
          //card.classList.add('card', 'text-center', 'mx-2', 'my-2');
          //card.style.width = '20rem';
          //card.style.border = '0.1rem solid black';

        var card = document.createElement('div');
          card.classList.add('col-5', 'text-center', 'mx-2', 'my-2', 'bg-dark');
          card.style.width = '20rem';
          card.style.border = '0.1rem solid black';

        
        // create image 
       var image = document.createElement('img');
        image.classList.add('card-img-top', 'mt-3');
        image.src = `https://image.tmdb.org/t/p/original/${posterCode}`;
        image.style.border = '0.1rem solid black';

        // create card body
        //var body = document.createElement('div');
        //body.classList.add('card-body');

        //var body = document.createElement('div');
        //body.classList.add('card','card-block');

        // create title 
        var title = document.createElement('h5');
        title.classList.add('card-title');
        title.innerHTML = movieTitle;

        // creates unordered list
        var ul = document.createElement('ul');
        ul.classList.add('list-group', 'list-group-flush', 'mb-2');

        // create rating 
        var rating = document.createElement('li');
        rating.classList.add('list-group-item');
        rating.innerHTML = `Rating: ${movieRating}/10`;

        

        // create date
        var date = document.createElement('li');
        date.classList.add('list-group-item');
        date.innerHTML = `${movieDate}`;

        // create favorites button
        //var movieBtn = document.createElement('li');
        //movieBtn.classList.add('list-group-item');
        //var button = document.createElement('button');
        //button.classList.add('btn', 'btn-dark', 'favorites-button');
        //button.type = 'button';
        //button.id = movieId;
       // button.innerHTML = 'Add to favorites';

       // create favorites button
       var listBtn = document.createElement('li');
       listBtn.classList.add('list-group-item');
       var button = document.createElement('button');
       button.classList.add('btn', 'btn-dark', 'favorites-button');
       button.type = 'button';
       button.id = movieId;
       button.innerHTML = 'Add to favorites';



        card.appendChild(image);
        card.appendChild(title);
        ul.appendChild(date);
        ul.appendChild(rating);
        listBtn.appendChild(button);
        ul.appendChild(listBtn);
        //card.appendChild(body);
        card.appendChild(ul);
        formContainer.appendChild(card); 
        
      }
  });
}});
};
getPopular(); {

// get upcoming 

function getUpcoming() {
  var upcomingURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US`;

  var formContainer = document.getElementById('form-container2');
  formContainer.classList.add('mx-4', 'mx-4');

  fetch(upcomingURL)
  .then(function(response){
    if (response.ok) {
      response.json()
   .then(function(data){
        console.log(data)
      
    // loop   
      for (i=0; i<data.results.length; i++) {
        var posterCode = data.results[i].poster_path;
        var movieTitle = data.results[i].title;
        var movieId = data.results[i].id;
        var movieRating = Math.floor(data.results[i].vote_average); 
        var movieDate = data.results[i].release_date;

        // create container
        //var card = document.createElement('div');
          //card.classList.add('card', 'text-center', 'mx-2', 'my-2');
          //card.style.width = '20rem';
          //card.style.border = '0.1rem solid black';

        var card = document.createElement('div');
          card.classList.add('col-5', 'text-center', 'mx-2', 'my-2', 'bg-dark');
          card.style.width = '20rem';
          card.style.border = '0.1rem solid black';

        
        // create image 
       var image = document.createElement('img');
        image.classList.add('card-img-top', 'mt-3');
        image.src = `https://image.tmdb.org/t/p/original/${posterCode}`;
        image.style.border = '0.1rem solid black';

        // create card body
        //var body = document.createElement('div');
        //body.classList.add('card-body');

        //var body = document.createElement('div');
        //body.classList.add('card','card-block');

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
        //var movieBtn = document.createElement('li');
        //movieBtn.classList.add('list-group-item');
        //var button = document.createElement('button');
        //button.classList.add('btn', 'btn-dark', 'favorites-button');
        //button.type = 'button';
        //button.id = movieId;
       // button.innerHTML = 'Add to favorites';

       // create favorites button
       var listBtn = document.createElement('li');
       listBtn.classList.add('list-group-item');
       var button = document.createElement('button');
       button.classList.add('btn', 'btn-dark', 'favorites-button');
       button.type = 'button';
       button.id = devFavs[i];
       button.innerHTML = 'Add to favorites';



        card.appendChild(image);
        card.appendChild(title);
        ul.appendChild(date);
        ul.appendChild(rating);
        listBtn.appendChild(button);
        ul.appendChild(listBtn);
        //card.appendChild(body);
        card.appendChild(ul);
        formContainer.appendChild(card); 
        
      }
  });
}});
};
};
getUpcoming();


var devFavs = [5994, 274931, 10466, 39939,957, 157336, 6435, 11321, 597, 510, 11969]; 

function getDevFav () {

  

  var formContainer = document.getElementById('form-container3');
  formContainer.classList.add('mx-4', 'mx-4');

  
      
    // loop   
      for (i=0; i<devFavs.length; i++) {

        var devFavURL = `https://api.themoviedb.org/3/movie/${devFavs[i]}?api_key=${apiKey}&language=en-US`

      fetch(devFavURL)
      .then(function(response){
      return response.json()})

      .then(function(data){
        console.log(data)
      

        var posterCode = data.poster_path;
        var movieTitle = data.title;
        var movieId = devFavs[i];
        var movieRating = Math.floor(data.vote_average); 
        var movieDate = data.release_date;

        var card = document.createElement('div');
          card.classList.add('col-5', 'text-center', 'mx-2', 'my-2', 'bg-dark');
          card.style.width = '20rem';
          card.style.border = '0.1rem solid black';

        
        // create image 
       var image = document.createElement('img');
        image.classList.add('card-img-top', 'mt-3');
        image.src = `https://image.tmdb.org/t/p/original/${posterCode}`;
        image.style.border = '0.1rem solid black';

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
       var listBtn = document.createElement('li');
       listBtn.classList.add('list-group-item');
       var button = document.createElement('button');
       button.classList.add('btn', 'btn-dark', 'favorites-button');
       button.type = 'button';
       button.id = movieId;
       button.innerHTML = 'Add to favorites';



        card.appendChild(image);
        card.appendChild(title);
        ul.appendChild(date);
        ul.appendChild(rating);
        listBtn.appendChild(button);
        ul.appendChild(listBtn);
        //card.appendChild(body);
        card.appendChild(ul);
        formContainer.appendChild(card); 
        
      }
      )
    };
};4

getDevFav ();





       


      
      

        















