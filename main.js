

var title;
var year;
var iD;
var type;
var poster;

function updateMovie(movie){
    title.innerHTML = movie.title; 
    year.innerHTML = movie.year;
    iD.innerHTML = movie.iD;
    type.innerHTML = movie.type;
    poster.src = movie.poster;
}


window.onload = function(){
    title = document.getElementById("title");
    year = document.getElementById("year");
    iD = document.getElementById("identitet");
    type = document.getElementById("typeOf");
    poster = document.getElementById("image");
    
    var movie={};
    movie.title = "Sökarna";
    movie.year = "19999";
    movie.iD = "ID121212";
    movie.type = "movie";
    movie.poster ="https://images-na.ssl-images-amazon.com/images/M/MV5BMjE3NzY0NzMwM15BMl5BanBnXkFtZTcwMjkzMjA0MQ@@._V1_SX300.jpg"

    updateMovie(movie);
}