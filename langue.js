const translations = {

  fr: {

    "nav.home":
      "Accueil",

    "nav.info":
      "Informations",

    "nav.signup":
      "Inscriptions",

    "nav.links":
      "Liens",

    "home.text":
      "Fedez Ibil vous propose de vivre l’expérience d’un pèlerinage traditionnel dans un esprit de ferveur et d’authentique amitié chrétienne. Prières et Cantiques traditionnels basques et français nous permettront d’exprimer notre Foi en Dieu et notre Espérance du Salut avec le secours de Notre-Dame. Nous voulons ainsi retisser les liens qui de tout temps ont uni Foi et culture traditionnelle locale. Pendant ce pèlerinage, nous recevrons les sacrements de l’Eglise sous leur forme tridentine."

  },


  eu: {

    "nav.home":
      "Harrera",

    "nav.info":
      "Argibideak",

    "nav.signup":
      "Izen-emateak",

    "nav.links":
      "Loturak",

    "home.text":
      "Fedez Ibil-ek beila ohiko baten esperientzia bizitzera gomitatzen zaituzte, debozionezko giroan eta egiazko adiskidetasun giristinoan. Eskualdun eta frantses othoitz eta kantu tradizionalek Jainkoaren baitako gure Fedea eta Salbamenduaren Esperantza adierazten lagunduko gaituzte, Andredena Mariaren laguntzarekin. Horrela, aspaldidanik Fedea eta tokiko kultura tradizionala elkartu dituzten lokarriak berriz ehundu nahi ditugu. Beila huntan, Elizaren sakramenduak forma tridentinoan errezibituko ditugu."

  }

};



/* =========================================================
   CHANGEMENT DE LANGUE
   ========================================================= */

function applyLanguage(lang){

  const selected =
    translations[lang]
      ? lang
      : "fr";


  document.documentElement.lang =
    selected === "eu"
      ? "eu"
      : "fr";


  /*
     Traduction des textes de la page
  */

  document
    .querySelectorAll("[data-i18n]")
    .forEach(element => {

      const key =
        element.dataset.i18n;

      if(
        translations[selected][key]
      ){
        element.textContent =
          translations[selected][key];
      }

    });


  /*
     Libellés des boutons de langue

     Français :
     Français / Basque

     Basque :
     Frantsesez / Eskuaraz
  */

  const labels =
    selected === "eu"

      ? {
          fr:"Frantsesez",
          eu:"Eskuaraz"
        }

      : {
          fr:"Français",
          eu:"Basque"
        };


  document
    .querySelectorAll(".lang-label")
    .forEach(element => {

      const target =
        element.dataset.langLabel;

      if(labels[target]){
        element.textContent =
          labels[target];
      }

    });


  /*
     Cadre uniquement autour
     de la langue sélectionnée
  */

  document
    .querySelectorAll(".lang-btn")
    .forEach(button => {

      const isActive =
        button.dataset.lang
        === selected;


      button.classList.toggle(
        "active",
        isActive
      );


      button.setAttribute(
        "aria-pressed",
        isActive
          ? "true"
          : "false"
      );

    });


  /*
     Mémorisation de la langue
  */

  localStorage.setItem(
    "fedez-ibil-lang",
    selected
  );


  /*
     La police pouvant légèrement changer
     les dimensions du titre,
     on recalcule le logo.
  */

  requestAnimationFrame(
    positionSacredHeart
  );

}



/* =========================================================
   POSITION ET LARGEUR DU SACRÉ-CŒUR
   ========================================================= */

function positionSacredHeart(){

  const hero =
    document.querySelector(".hero");

  const heart =
    document.querySelector(".brand-heart");

  const letterD =
    document.getElementById("logo-start");

  const letterB =
    document.getElementById("logo-end");


  if(
    !hero ||
    !heart ||
    !letterD ||
    !letterB
  ){
    return;
  }


  /*
     Position réelle du D de FEDEZ
     et du B de IBIL
  */

  const dRect =
    letterD.getBoundingClientRect();

  const bRect =
    letterB.getBoundingClientRect();


  /*
     On prend la PLUS GRANDE distance :

     bord gauche du D
     jusqu'au
     bord droit du B.
  */

  const logoWidth =
    bRect.right
    -
    dRect.left;


  if(logoWidth > 0){

    heart.style.width =
      `${logoWidth}px`;

  }


  /*
     Centre vertical de la photographie.

     Le logo est en position:fixed :
     il restera donc à cet endroit
     lorsqu'on descend la page.

     Comme la photo commence en haut
     de l'écran, son centre correspond
     à la moitié de la hauteur du hero.
  */

  const heroHeight =
    hero.offsetHeight;


  heart.style.top =
    `${heroHeight / 2}px`;

}



/* =========================================================
   INITIALISATION
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    /*
       Clic sur les langues
    */

    document
      .querySelectorAll(".lang-btn")
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            applyLanguage(
              button.dataset.lang
            );

          }
        );

      });


    /*
       Langue mémorisée
    */

    const savedLanguage =
      localStorage.getItem(
        "fedez-ibil-lang"
      )
      || "fr";


    applyLanguage(
      savedLanguage
    );


    /*
       Premier positionnement
       du Sacré-Cœur
    */

    positionSacredHeart();

  }
);



/* =========================================================
   ATTENDRE LE CHARGEMENT DE LA POLICE CINZEL
   ========================================================= */

/*
   C'est important :
   la largeur du D et du B n'est
   parfaitement exacte qu'une fois
   Cinzel réellement chargée.
*/

if(document.fonts){

  document.fonts.ready.then(
    () => {

      positionSacredHeart();

    }
  );

}



/* =========================================================
   RECALCUL EN CAS DE REDIMENSIONNEMENT
   ========================================================= */

window.addEventListener(
  "resize",
  positionSacredHeart
);
