var fetchButton = $("#searchButton");
var screenHolder = $("#holderForTrailer");
var movies = [];
var warningMessage = $("#warningMessage"); 


var formHandler = function (event) {
  event.preventDefault();
  movieSelection = trailerSelection.value.trim();
  searchTrailer();
};


var getTrailer = function () {
  //empty warning message 
  warningMessage.text("");
  
  var getMovieUrl = {
    url: "https://api-gate2.movieglu.com/filmsNowShowing/",
    method: "GET",
    timeout: 0,
    headers: {
      "api-version": "v200",
      Authorization: "Basic VFhDVTp4M1p3Z05KY2s0UlE=",
      client: "TXCU",
      "x-api-key": "HZT05M3Wa8ak6Wphu3pK27eFET0jgxDOEvcgPhBb",
      "device-datetime": "2022-24-22T12:07:57.296Z",
      territory: "US",
    },
  };

  $.ajax(getMovieUrl).done(function (response) {
    console.log(response);

   for (let i = 0; i < response.films.length; i++) {

      matchMovie = response.films[i].film_name;
      //add all movie names into movie array we will use for autocomplete
      movies.push(matchMovie);

      movieTrailer = response.films[i].film_trailer;
      movieDescr = response.films[i].synopsis_long;

      //Creates video elements
      var trailerVideo = $("<video>");
      trailerVideo.addClass(["col", "mt-3", "w-5"]);
      trailerVideo.attr("src", movieTrailer); //(movieTrailer)testvideo
      trailerVideo.attr("type", "video/mp4");
      trailerVideo.attr("controls", "autoplay");

      //Creates element title for each trailer and style
      var descrTitle = $("<h3>").addClass(" text-center bg-dark rounded");
      descrTitle.text(matchMovie); // (matchMovie);testName
      var liDescr = $("<p>").addClass(
        "rounded shadow-lg p-3 mb-5 bg-dark rounded"
      );
      liDescr.text(movieDescr); //(movieDescr)testDescr)
      var divRow = $("<div>").addClass("row");
      var divCon = $("<div>").addClass("container");
      var trailerContainer = $("<div>").addClass("col pt-3");
      var textContainer = $("<div>").addClass("col pt-5 ");

      //append to HTML
      trailerContainer.append(trailerVideo);
      textContainer.append(trailerContainer);
      textContainer.append(descrTitle);
      textContainer.append(liDescr);
      divRow.append(textContainer);
      divRow.append(trailerContainer);
      divCon.append(divRow);
      var wrap = $("#wrapper");
      wrap.append(divCon);
    }
 });
};
  //}; 
getTrailer();

var searchTrailer = function () {
  var getMovieUrl = {
    url: "https://api-gate2.movieglu.com/filmsNowShowing/",
    method: "GET",
    timeout: 0,
    headers: {
      "api-version": "v200",
      Authorization: "Basic VFhDVTp4M1p3Z05KY2s0UlE=",
      client: "TXCU",
      "x-api-key": "HZT05M3Wa8ak6Wphu3pK27eFET0jgxDOEvcgPhBb",
      "device-datetime": "2022-11-24T12:07:57.296Z",
      territory: "US",
    },
  };

  $.ajax(getMovieUrl).done(function (response) {
    console.log(response);

    for (let i = 0; i < response.films.length; i++) {

      //**If movie of interest is in database we will grab trailer**/
      //movieSelection !== movies.contains(movieSelection
    if (!movies.includes(movieSelection)) {
      if (movieSelection !== response.films[i].film_name)
       message();
        
        console.log("no trailer available");
        return;
     }

      if (movieSelection === response.films[i].film_name) {
        $("#warningMessage").text("");
        //fetch data for each trailer 
        matchMovie = response.films[i].film_name;
        movieTrailer = response.films[i].film_trailer;
        movieDescr = response.films[i].synopsis_long;
        //create HTML elements
        var trailerWrapper = $("<div>");
        trailerWrapper.addClass("card bg-dark ");
        var movieName = $("<h3>");
        movieName.addClass("card-title text-center bg-dark rounded");
        movieName.text(matchMovie);
        
        var exitButton = $("<button>").addClass(' text-center bg-dark rounded text-warning ');
        exitButton.text("Exit");

        var movieDescription = $("<p>");
        movieDescription.addClass("card-text text-center bg-dark rounded");
        movieDescription.text(movieDescr);
        var outputBody = $("<div>");
        outputBody.addClass("card-body");
        var trailerVideo = $("<video>");
        trailerVideo.addClass(["col", "w-5"]);
        var source = $("<src>");
        trailerVideo.attr("src", movieTrailer);
        trailerVideo.attr("type", "video/mp4");
        trailerVideo.attr("controls", "autoplay");
        var exitButton = $("<button>").addClass(' [video content text-center bg-dark rounded text-warning ');
        exitButton.text("Exit");

        console.log(source);
       //append to html in order ti display data
        outputBody.append(movieName);
        outputBody.append(movieDescription);
        trailerWrapper.append(trailerVideo);
        trailerWrapper.append(exitButton);
        trailerWrapper.append(outputBody);
        screenHolder.append(trailerWrapper);

        //empty existing trailers from starting trailer page
        $("#wrapper").empty();
        exitButton.on('click',function(){
        screenHolder.empty(); 

        getTrailer();

        });
        
       
      }
  

    }

    console.log(movies);
  });
};

//on click of the search for trailers button display searched trailer
fetchButton.on("submit", formHandler);

// autocomplete added to user input, using movie names to as offered data
$(function () {
  $("#trailerSelection").autocomplete({
    source: movies,
  });
});


var message = function(){
  
  warningMessage.text( "Movie you are searching for is not in our database, please try again.");
  
}