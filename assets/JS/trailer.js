var fetchButton = $("#searchButton");
var screenHolder = $("#holderForTrailer");

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
        matchMovie = response.films[i].film_name;
        movieTrailer = response.films[i].film_trailer; ////NEED TO ADD TO HTML
        movieDescr = response.films[i].synopsis_long;
        var trailerWrapper = $("<div>");
        trailerWrapper.addClass("card");
        var movieName = $("<h5>");
        movieName.addClass("card-title");
        movieName.text(matchMovie);
        var movieDescription = $("<p>");
        movieDescription.addClass("card-text");
        movieDescription.text(movieDescr);
        var outputBody = $("<div>");
        outputBody.addClass("card-body");
        var trailerVideo = $("<video>");
        trailerVideo.addClass("autoplay");
        var source = $("<src>");
        trailerVideo.attr("src", movieTrailer);
        trailerVideo.attr("type", "video/mp4");
        trailerVideo.attr("controls", "autoplay");

        console.log(source);

        outputBody.append(movieName);
        outputBody.append(movieDescription);
        trailerWrapper.append(trailerVideo);
        trailerWrapper.append(outputBody);
        screenHolder.append(trailerWrapper);

        // console.log(movieTrailer);
        //console.log(movieDescr);
        //console.log(matchMovie);
      }
      //    else if ( movieSelection !== response.films[i].film_name)
      //     {
      //        console.log('Movie you are looking for is not in our database');  //need to stop search****
      //     }
    }
  });
};
fetchButton.on("submit", formHandler);
//Black Panther: Wakanda Forever
