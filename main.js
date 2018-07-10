//  http://www.omdbapi.com/?apikey=xxxxxxxx&s=s%C3%B6karna&r=json

var API = "?apikey=xxxxxxxx";

var url;

var errormsg;

var listContainer = document.createElement('div');

function updateOfURL(film){

    url = "http://www.omdbapi.com/" + API + "&s=" + film + "&r=json";

    sendRequester(url);

}

function sendRequester(url){

    var xmlReq = new XMLHttpRequest();

  xmlReq.onreadystatechange = function(){

      if (xmlReq.readyState == 4 && xmlReq.status == 200){

          var datas = JSON.parse(xmlReq.responseText);
            
          listContainer.innerHTML=" ";

          errormsg.innerHTML = " "; 

          var resp = datas.Response;
          var amount_of_results = datas.totalResults;
          var a = amount_of_results;
          

            //tester for https://getbutterfly.com/generate-html-list-from-javascript-array/
            document.getElementsByTagName('body')[0].appendChild(listContainer);
            var listElement = document.createElement('ul');
            listContainer.appendChild(listElement);

          //mapping 10 results in consoleLog

         for(var i = 0; i < a;i++){

            var listItem = document.createElement('li');
            var listItem1 = document.createElement('li');
            var listItem2 = document.createElement('li');
            var posterItem = document.createElement('IMG');
            var br = document.createElement("BR");
            var brTwo = document.createElement("BR");
            posterItem.style.width = "200px";
            listItem.innerHTML = "Title: " + datas.Search[i].Title;
            listItem1.innerHTML = "Year: " + datas.Search[i].Year;
            listItem2.innerHTML = "Type: " + datas.Search[i].Type;
            posterItem.setAttribute("src", datas.Search[i].Poster);
            posterItem.style.marginBottom ="20px";

            if (datas.Search[i].Poster == "N/A"){
                posterItem.setAttribute("src", "http://designravenous.com/no-image-found.jpg");
            }

            listElement.appendChild(listItem);
            listElement.appendChild(listItem1);
            listElement.appendChild(listItem2);
            listElement.appendChild(brTwo);
            listElement.appendChild(posterItem);
            listElement.appendChild(br);
            console.log(posterItem.style.src);
            
         }
          console.log(resp);
          console.log(amount_of_results);
          console.log(url);  

      }  //testa att börja här!
  }
        xmlReq.open("GET", url, true);

        xmlReq.send();

    }

    function onTheClick(){

        var input = document.getElementById("input");

        film = input.value;

        updateOfURL(film);

    }

window.onload = function(){

    errormsg = document.getElementById("errormsg");

    var film = "star wars";
    console.log(film);
    updateOfURL(film);
}
