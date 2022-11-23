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
};

var getTrailer = function () {
  var testName = "Black Panther: Wakanda Forever";
  var testDescr =
    " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.a new path for the kingdom of Wakanda.";
  var testvideo = "https://trailer.movieglu.com/297863_high_V2.mp4";

  // var getMovieUrl = {
  //   url: "https://api-gate2.movieglu.com/filmsNowShowing/?n=10",
  //   method: "GET",
  //   timeout: 0,
  //   headers: {
  //     "api-version": "v200",
  //     Authorization: "Basic VEJYVzpoR0VaZE5uNjBMa3Y=",
  //     client: "	TBXW",
  //     "x-api-key": "3Rx0u3yh9U6TyN9rNXYt63A2z2QKlOxA96ObskDM",
  //     "device-datetime": "2022-11-22T12:07:57.296Z",
  //     territory: "US",
  //   },
  // };

  // $.ajax(getMovieUrl).done(function (response) {
  //   console.log(response);
  //for (let i = 0; i < response.films.length; i++) {
  for (let i = 0; i < 5; i++) {
    //console.log(response.films[i].film_name);

    // //Creates information variables to plug into cards
    // matchMovie = response.films[i].film_name;
    // movieTrailer = response.films[i].film_trailer; ////NEED TO ADD TO HTML
    // movieDescr = response.films[i].synopsis_long;
   // console.log(movieTrailer);

    //Creates video elements
    var trailerVideo = $("<video>");
    trailerVideo.addClass(["col", "mt-3", "w-5"]);

   
    trailerVideo.attr("src", testvideo);//(movieTrailer)
    trailerVideo.attr("type", "video/mp4");
    trailerVideo.attr("controls", "autoplay");

    //Creates element title for each trailer and style
    var descrTitle = $("<h5>").addClass(" text-center");
    descrTitle.text(testName);// (matchMovie);
    

    var liDescr = $("<p>").addClass(  "rounded shadow-lg p-3 mb-5 bg-body rounded");
    liDescr.text(testDescr);//(movieDescr)
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
  //    else if ( movieSelection !== response.films[i].film_name)
  //     {
  //        console.log('Movie you are looking for is not in our database');  //need to stop search****
  //     }
  // }
  //   });
};
getTrailer();
// fetchButton.on("submit", formHandler);
// //Black Panther: Wakanda Forever

// var getTrailer = function () {
//   var getMovieUrl = {
//     url: "https://api-gate2.movieglu.com/filmsNowShowing/?n=10",
//     method: "GET",
//     timeout: 0,
//     headers: {
//       "api-version": "v200",
//       Authorization: "Basic SUpYTzphZWk5TGFyNHNLeGM=",
//       client: "IJXO",
//       "x-api-key": "UIWlK3WpBQ232gRyNsn2F8AZxl4phG326FuEHup8",
//       "device-datetime": "2022-11-19T12:07:57.296Z",
//       territory: "US",
//     },
//   };

//   $.ajax(getMovieUrl).done(function (response) {
//     console.log(response);
//     for (let i = 0; i < response.films.length; i++) {
//       //console.log(response.films[i].film_name);

//       //**If movie of interest is in database we will grab movie ID we will later use to fet trailer for selected movie**/
//       if (movieSelection === response.films[i].film_name) {
//         matchMovie = response.films[i].film_name;
//         movieTrailer = response.films[i].film_trailer; ////NEED TO ADD TO HTML
//         movieDescr = response.films[i].synopsis_long;
//         var trailerWrapper = $("<div>");
//         trailerWrapper.addClass("card");
//         var movieName = $("<h5>");
//         movieName.addClass("card-title");
//         movieName.text(matchMovie);
//         var movieDescription = $("<p>");
//         movieDescription.addClass("card-text");
//         movieDescription.text(movieDescr);
//         var outputBody = $("<div>");
//         outputBody.addClass("card-body");
//         var trailerVideo = $("<video>");
//         trailerVideo.addClass("autoplay");
//         var source = $("<src>");
//         trailerVideo.attr("src", movieTrailer);
//         trailerVideo.attr("type", "video/mp4");
//         trailerVideo.attr("controls", "autoplay");

//         console.log(source);

//         outputBody.append(movieName);
//         outputBody.append(movieDescription);
//         trailerWrapper.append(trailerVideo);
//         trailerWrapper.append(outputBody);
//         screenHolder.append(trailerWrapper);

//         // console.log(movieTrailer);
//         //console.log(movieDescr);
//         //console.log(matchMovie);
//       }
//       //    else if ( movieSelection !== response.films[i].film_name)
//       //     {
//       //        console.log('Movie you are looking for is not in our database');  //need to stop search****
//       //     }
//     }
//   });
// };
// fetchButton.on("submit", formHandler);
