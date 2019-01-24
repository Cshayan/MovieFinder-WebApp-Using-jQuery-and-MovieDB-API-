var api_key = 'f25de846b7b1734b1099af65629db8f3';
$(()=>{
   
  $("#search").on('submit', (e)=>{
        var movie = $("#searchInput").val();
        getMovieInfo(movie);
        e.preventDefault();
        $("#result").empty();
  })
});

function getMovieInfo(movie){
   fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${movie}`).then(result =>{
    return result.json();
}).then(result => {
    init(result);
})
}
function init(resultFromServer){
    console.log(resultFromServer);
    var output;
    let movieNames = resultFromServer.results;   //create array of movies
    $.each(movieNames, (index, val)=>{
        $("#result").append(`
      <div class="col-sm-3">
        <div class="well text-center">
        <img  class="thumbnail movieImg" src ="https://image.tmdb.org/t/p/w185${val.poster_path}" alt="No poster available">
        <h4>${val.original_title}</h4>
        <a href="#" onclick="movieSelected('${val.id}')" class="btn btn-success">View Details</a>
        </div>
      </div> `)
  });
 
}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movieDetails.html';
  return false;
}

function getMovieDetails(){
   var movieId = sessionStorage.getItem('movieId');
   fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}`).then(result =>{
    return result.json();
}).then(result => {
     console.log(result);  
     var movDet = result;
     var movGenres;

    
     if(movDet.genres.length === 0)
     {
       movGenres = 'Not mentioned';
     }
     else
     {
      movGenres = movDet.genres[0].name;
     }
     var output = `
            <div class="row">
              <div class="col-sm-4">
                <img class="thumbnail imgDet" src="https://image.tmdb.org/t/p/w185${movDet.poster_path}" alt="No poster available">
              </div>
              <div class="col-sm-8">
                <h2>Movie name: ${movDet.original_title}</h2>
            <ul class="list-group" >
              <li class="list-group-item list-group-item-success" style="font-size: 14px" ><strong>Genre:- </strong> ${movGenres}</li>
              <li class="list-group-item list-group-item-info" style="font-size: 14px" ><strong>Release Date:-</strong> ${movDet.release_date}</li>
              <li class="list-group-item " style="font-size: 14px" ><strong>Language code:-</strong> ${movDet.original_language}</li>
              <li class="list-group-item list-group-item-warning" style="font-size: 14px" ><strong>Rating:-</strong> ${movDet.vote_average}</li>
              <li class="list-group-item list-group-item-danger" style="font-size: 14px" ><strong>Status:-</strong> ${movDet.status}</li>
            </ul>
                <a href="https://imdb.com/title/${movDet.imdb_id}" class="btn btn-warning">View in IMDB</a>
                <a href="movieApp.html" class="btn btn-primary">Go back to search</a>
              </div>
            </div>
            <div class="row">
            <hr>
             <h3>Plot : - </h3>
             <div class="col-sm-12">
             <p class="well"> ${movDet.overview}</p>
             </div>
            </div>
     
     `

     $("#movieDetails").html(output);
})
}
