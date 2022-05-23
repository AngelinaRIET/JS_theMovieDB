const API_KEY = 'f33cd318f5135dba306176c13104506a';

//recuperation des elements HTML
let searchBar = document.getElementById('searchBar');
let content = document.getElementById('content');
//initialisation de variable
let troisPetitsPoints;

function search(){
    fetch('http://api.themoviedb.org/3/search/tv?language=fr&api_key=' + API_KEY + '&query=' + searchBar.value)
    .then(function(httpResponse){
        return httpResponse.json();
    })
    .then(function(body){
        let result = body.results;
        let stringContent = "";
        result.map(element => {
            let image;
            if(element.backdrop_path == null){
                image = '<img style="height:200px;width:auto;" src="https://images.assetsdelivery.com/compings_v2/pavelstasevich/pavelstasevich1811/pavelstasevich181101028.jpg">';
            }else{
                image = '<img style="height:200px;width:auto;" src="https://image.tmdb.org/t/p/w500'+element.backdrop_path+'">';
            }
            
            stringContent += `<div class="col-4 p-4">
                <div class="card shadow-sm">
                    ${image}
                    <div class="card-body">
                    <p class="card-text">${element.name}</p>
                    <p class="card-text card_show_${element.id}">${element.overview.substr(0, 250)}<span data-id="${element.id}" class="troisPetitsPoints fa fa-angle-down"></span></p>
                    <p class="card-text card_hide_${element.id} cache">${element.overview}<br /><span data-id="${element.id}" class="troisPetitsPoints fa fa-angle-up"></span></p>
                    <a href="detail.html?id=${element.id}">Details</a>
                    </div>
                </div>
            </div>`;
        });
        content.innerHTML = stringContent;

        //on recuperer toutes les instances HTML des ...
        troisPetitsPoints = document.querySelectorAll('.troisPetitsPoints');
        //boucle sur les instances d'element HTML
        troisPetitsPoints.forEach((element) => {
            //mise en place de l'ecouteur d'evenement sur chaque element HTML
            element.addEventListener('click', showDescription)
        })
    });
}

document.addEventListener('keyup', search);

function showDescription(e){

    let id = e.currentTarget.dataset.id;

    //si le bloc est deje en propriete display none alors on l'affiche
    if(document.querySelector('.card_show_'+id).style.display == "none"){
        //on change la propriete display des deux blocs
        document.querySelector('.card_show_'+id).style.display = "block";
        document.querySelector('.card_hide_'+id).style.display = "none";
    }else{
        document.querySelector('.card_show_'+id).style.display = "none";
        document.querySelector('.card_hide_'+id).style.display = "block";
    }
    
}