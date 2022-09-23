// // Cards
// $(".search-button").on("click", function () {
//   $.ajax({
//     url:
//       "http://www.omdbapi.com/?apikey=33722d1d&s=" + $(".input-keyword").val(),
//     success: (res) => {
//       const movies = res.Search;
//       let cards = "";
//       movies.forEach((e) => {
//         cards += showCards(e);
//       });
//       $(".movie-container").html(cards);

//       // Movie Detail
//       $(".modal-detail-button").on("click", function () {
//         $.ajax({
//           url:
//             "http://www.omdbapi.com/?apikey=33722d1d&i=" +
//             $(this).data("imdbid"),
//           success: (res) => {
//             const movieDetail = showMovieDetail(res);
//             $(".modal-body").html(movieDetail);
//           },
//           error: (err) => {
//             console.log(err.responseText);
//           },
//         });
//       });
//     },
//     error: (err) => {
//       console.log(err.responseText);
//     },
//   });
// });

// // Cards
// const searchButton = document.querySelector(".search-button");
// searchButton.addEventListener("click", function () {
//   const inputKeyword = document.querySelector(".input-keyword");
//   fetch("http://www.omdbapi.com/?apikey=33722d1d&s=" + inputKeyword.value)
//     .then((res) => res.json())
//     .then((res) => {
//       const movies = res.Search;
//       let cards = "";
//       movies.forEach((e) => (cards += showCards(e)));
//       const movieContainer = document.querySelector(".movie-container");
//       movieContainer.innerHTML = cards;

//       // Movie Detail
//       const modalDetailButton = document.querySelectorAll(
//         ".modal-detail-button"
//       );
//       modalDetailButton.forEach((e) =>
//         e.addEventListener("click", function () {
//           const imdbid = this.dataset.imdbid;
//           fetch("http://www.omdbapi.com/?apikey=33722d1d&i=" + imdbid)
//             .then((res) => res.json())
//             .then((res) => {
//               const movieDetail = showMovieDetail(res);
//               const modalBody = document.querySelector(".modal-body");
//               modalBody.innerHTML = movieDetail;
//             });
//         })
//       );
//     });
// });

// Cards
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
  try {
    const inputKeyword = document.querySelector(".input-keyword");
    const movies = await getMovies(inputKeyword.value);
    updateUI(movies);
  } catch (error) {
    alert(error);
  }
});

function getMovies(keyword) {
  return fetch("http://www.omdbapi.com/?apikey=33722d1d&s=" + keyword)
    .then((res) => {
      if (res.ok == false) {
        throw new Error(res.statusText);
      } else {
        return res.json();
      }
    })
    .then((res) => {
      if (res.Response == "False") {
        throw new Error(res.Error);
      } else {
        return res.Search;
      }
    });
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((e) => (cards += showCards(e)));
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}

// Movie Detail
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail-button")) {
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMoviesDetail(imdbid);
    updateUIDetail(movieDetail);
  }
});

function getMoviesDetail(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=33722d1d&i=" + imdbid)
    .then((res) => res.json())
    .then((res) => res);
}

function updateUIDetail(res) {
  const movieDetail = showMovieDetail(res);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetail;
}

// Template Literal
function showCards(e) {
  return `<div class="col-md-4 my-5">
            <div class="card">
              <img src="${e.Poster}" class="card-img-top" />
              <div class="card-body">
                <h5 class="card-title">${e.Title}</h5>
                <p class="card-text">${e.Year}</p>
                <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${e.imdbID}">Show Details</a>
              </div>
            </div>
          </div>`;
}

function showMovieDetail(res) {
  return `<div class="container-fluid">
            <div class="row">
                <div class="col-md-3">
                    <img src="${res.Poster}" class="img-fluid">
                </div>
                <div class="col-md">
                    <ul class="list-group">
                        <li class="list-group-item"><h4>${res.Title} (${res.Year})</h4></li>
                        <li class="list-group-item"><strong>Director: </strong>${res.Director}</li>
                        <li class="list-group-item"><strong>Actors: </strong>${res.Actors}</li>
                        <li class="list-group-item"><strong>Writer: </strong>${res.Writer}</li>
                        <li class="list-group-item"><strong>Plot: </strong>${res.Plot}</li>
                      </ul>
                </div>
            </div>
          </div>`;
}
