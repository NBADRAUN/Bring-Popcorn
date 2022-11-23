// https://api.themoviedb.org/3/movie/550?api_key=95a7e5127d0a488c78d9f99eed7a76bd

// API Key 
var apiKey = '95a7e5127d0a488c78d9f99eed7a76bd';

// query URL
var landingpURL = 'https://api.themoviedb.org/3/movie/list?api_key=${apiKey}&language=en-US'

function getPopular() {
  var mostPopURL = 'https://api.themoviedb.org/3/discover/movie/list?api_key=${apiKey}&language=en-US';

  fetch(mostPopURL)
  .then(function(response){
    if (response.ok) {
      response.json().then(function(data){
        console.log(data)
      })
    }
  })


}


