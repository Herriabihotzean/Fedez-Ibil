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
   LANGUE
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


  document
    .querySelectorAll(".lang-btn")
    .forEach(button => {

      const isActive =
        button.dataset.lang === selected;

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


  localStorage.setItem(
    "fedez-ibil-lang",
    selected
  );


  requestAnimationFrame(
    positionSacredHeart
  );

}


/* =========================================================
   SACRÉ-CŒUR
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


  const dRect =
    letterD.getBoundingClientRect();

  const bRect =
    letterB.getBoundingClientRect();


  /*
   * Largeur exacte demandée :
   *
   * bord gauche du D de FEDEZ
   * jusqu'au bord droit du B de IBIL.
   */

  const logoWidth =
    bRect.right - dRect.left;


  if(logoWidth > 0){

    heart.style.width =
      `${logoWidth}px`;

  }


  /*
   * Le centre vertical du Sacré-Cœur
   * correspond au centre de la photo.
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


    const savedLanguage =
      localStorage.getItem(
        "fedez-ibil-lang"
      ) || "fr";


    applyLanguage(
      savedLanguage
    );


    positionSacredHeart();

  }
);


/* =========================================================
   POLICE CINZEL
   ========================================================= */

if(document.fonts){

  document.fonts.ready.then(
    () => {

      positionSacredHeart();

    }
  );

}


/* =========================================================
   REDIMENSIONNEMENT
   ========================================================= */

window.addEventListener(
  "resize",
  positionSacredHeart
);
