let div_content_liste = document.querySelector(".liste");   //Récupère la div liste

let div_liste_SAE = ""; //Initialisation de la variable

for (let numSae in SAE){ //Boucle sur les SAE
    div_liste_SAE += `<a href="template.html?num=${numSae}"><li>${numSae} : ${SAE[numSae]['titre']}</li></a>`; //Affichage de la liste

    //console.log(numSae); 
}

div_content_liste.innerHTML += div_liste_SAE; //Affichage de la liste