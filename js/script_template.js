//Pour récup le n° SAE en passant par le nom du lien
let param = new URLSearchParams(location.search); //Récupère les paramètres de l'URL
let num = param.get("num"); //Récupère le paramètre "num" de l'URL

//Entête depuis les datas
document.querySelector("h1").innerHTML = num + " " + SAE[num]["titre"]; 
//description + compétence depuis les datas
document.querySelector("h2").innerHTML = "<span>Compétence : </span>" + SAE[num]["compétences"]; //Compétence depuis les datas
document.querySelector("p").innerHTML = SAE[num]["description"]; //Description depuis les datas

//Fonction bouton AC depuis les datas
function fonction_AC() { //Fonction AC
    document.querySelector("ul").innerHTML = "" //Vide la liste
    let resultat = "";  //Initialisation de la variable
    for (let numAC in SAE[num]['AC']) { //Boucle sur les AC
        resultat += `<li class="apparition" onclick="justifi('${numAC}')"> ${numAC} ${SAE[num]["AC"][numAC]["description_ac"]}</li>` //Affichage de la liste
    }
    document.querySelector("ul").innerHTML = resultat; //Affichage de la liste
    document.querySelector("ul").classList.add("liste_template"); //Ajout de la classe pour le CSS
}

//Fonction bouton RE depuis les datas
function fonction_Re() { //Fonction RE
    document.querySelector("ul").innerHTML = "" //Vide la liste
    let resultat = ""; //Initialisation de la variable
    for (let numRE in SAE[num]['ressources']) { //Boucle sur les ressources
        resultat += "<li class='apparition'>" + numRE + " " + SAE[num]["ressources"][numRE] + "</li>"; //Affichage de la liste
    }
    document.querySelector("ul").innerHTML = resultat; //Affichage de la liste
    document.querySelector("ul").classList.add("liste_template"); //Ajout de la classe pour le CSS
}

document.querySelector(".affiche_pdf").innerHTML = `<a href="pdf/${num}.pdf" target="_blank">Télécharger le PDF</a>`; //Lien PDF