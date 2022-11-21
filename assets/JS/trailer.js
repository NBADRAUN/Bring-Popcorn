var fetchButton = $("#searchButton");

var formHandler = function (event) {
  event.preventDefault();
  pickMovie();
  if (movieSelection === null) {
    console.log("no selection");
    return;
  }
  getTrailer();
};

//**User can search for movie of interest**//
var pickMovie = function () {
  movieSelection = trailerSelection.value.trim();
  console.log(movieSelection);
  if (movieSelection === null) {
    //need to add condition to stop function if not input
    console.log("no selection");
    return;
  }
};

var getTrailer = function () {
  var getMovieUrl = {
    url: "https://api-gate2.movieglu.com/filmsNowShowing/?n=10",
    method: "GET",
    timeout: 0,
    headers: {
      "api-version": "v200",
      Authorization: "Basic SUpYTzphZWk5TGFyNHNLeGM=",
      client: "IJXO",
      "x-api-key": "UIWlK3WpBQ232gRyNsn2F8AZxl4phG326FuEHup8",
      "device-datetime": "2022-11-19T12:07:57.296Z",
      territory: "US",
    },
  };

  $.ajax(getMovieUrl).done(function (response) {
    console.log(response);
    for (let i = 0; i < response.films.length; i++) {
      //console.log(response.films[i].film_name);

      //**If movie of interest is in database we will grab movie ID we will later use to fet trailer for selected movie**/
      if (movieSelection === response.films[i].film_name) {
        matchTrailer = response.films[i].film_name
        movieId = response.films[i].film_id
        console.log(movieId);
        console.log(matchTrailer);
      }
      //    else if ( movieSelection !== response.films[i].film_name)
      //     {
      //        console.log('Movie you are looking for is not in our database');  //need to stop search****
      //     }
    }

//**search for trailer of the desired movie **//
  var getMovieUrl = {
    url: "https://api-gate2.movieglu.com/trailers/?film_id=" + movieId,
    method: "GET",
    timeout: 0,
    headers: {
      "api-version": "v200",
      Authorization: "Basic SUpYTzphZWk5TGFyNHNLeGM=",
      client: "IJXO",
      "x-api-key": "UIWlK3WpBQ232gRyNsn2F8AZxl4phG326FuEHup8",
      "device-datetime": "2022-11-19T12:07:57.296Z",
      territory: "US",
    },
  };

  $.ajax(getMovieUrl).done(function (response) {
    console.log(response);
});
 });
}
fetchButton.on("submit", formHandler);
