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
      `<p>FEDEZ IBIL (avancer de par la foi, se conduire selon la foi) vous propose de vivre l’expérience d’un pèlerinage traditionnel dans un esprit de ferveur et d’authentique amitié chrétienne. Prières et Cantiques traditionnels de nos régions, entonnés avec joie dans l’effort de la marche, nous permettront d’exprimer notre Foi en Dieu et notre Espérance du Salut avec le secours de Notre-Dame.</p>

      <p>Soucieux de manifester notre appartenance à l’Eglise universelle à travers cette dévotion catholique, nous voulons aussi retisser les liens qui de tout temps ont uni Foi et culture traditionnelle locale. Dans cet esprit, Arrebastir fait le choix de la liturgie tridentine, à la fois familière de nos prédécesseurs et exprimant dans la plénitude de son déploiement une Foi vivante et intemporelle. Ainsi, nous recevrons les sacrements de l’Eglise sous leur forme traditionnelle.</p>

      <p>À très vite !</p>`

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
      `<p>FEDEZ IBIL elkarteak beila tradizional baten entseatzeko parada eskaintzen dautzue, fedezko eta zinezko adixkidantza giristino izpiritu batekin. Gure herrietako otoitz eta kantika tradizionalak bozkarioan ozendatuak izanen dire, bideko nekeetan. Horrela, gure Jainkoaren baitako Fedea eta gure Salbamenduaren itxaropena adierazten ahalko ditugu, Andre Dena Mariaren grazia lagun.</p>

      <p>Debozio katoliko horren bidez, ezagutarazi nahi dugu Elizari leial gatzaizkola. Bertzalde, Fedea eta lekuko ohidurak elgarrekin estekatzen dituzten betiko loturak berpiztu nahi ditugu ere bai. Gogo huntan, Arrebastir elkarteak Trenteko Konzilioaren liturgia atxikitzen du, zeren gure aitzinekoeri ohidurazkoa baitzitzaioten, baita ere bere hedapen osoan, betiko Fede bizi baten adierazpena baita. Horrela, Elizako sakramenduak molde tradizionalean errezebituko ditugu.</p>

      <p>Laster arte !</p>`

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


  /* Traduction des éléments simples */

  document
    .querySelectorAll("[data-i18n]")
    .forEach(element => {

      const key =
        element.dataset.i18n;

      if(translations[selected][key]){

        element.textContent =
          translations[selected][key];

      }

    });


  /* Traduction du texte d'accueil avec paragraphes et gras */

  document
    .querySelectorAll("[data-i18n-html]")
    .forEach(element => {

      const key =
        element.dataset.i18nHtml;

      if(translations[selected][key]){

        element.innerHTML =
          translations[selected][key];

      }

    });



  /* Libellés des langues en minuscules */

  const labels =
    selected === "eu"

      ? {
          fr:"frantsesez",
          eu:"eskuaraz"
        }

      : {
          fr:"français",
          eu:"basque"
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



  /* Cadre uniquement autour de la langue sélectionnée */

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



  /* Mémorisation de la langue */

  localStorage.setItem(
    "fedez-ibil-lang",
    selected
  );


  requestAnimationFrame(
    sizeSacredHeart
  );

}



/* =========================================================
   LARGEUR DU SACRÉ-CŒUR
   ========================================================= */

function sizeSacredHeart(){

  const heart =
    document.querySelector(
      ".brand-heart"
    );

  const letterD =
    document.getElementById(
      "logo-start"
    );

  const letterB =
    document.getElementById(
      "logo-end"
    );


  if(
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
     Largeur normale :
     du bord gauche du D de FEDEZ
     au bord droit du B de IBIL.
  */

  let logoWidth =
    bRect.right - dRect.left;


  /*
     Sur écran très étroit :
     réduction à 75 %.

     Je conserve ici ton réglage actuel.
  */

  if(
    window.innerWidth <= 380
  ){
    logoWidth *= 0.75;
  }


  if(
    logoWidth > 0
  ){
    heart.style.width =
      `${logoWidth}px`;
  }

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


    sizeSacredHeart();

  }
);



/* =========================================================
   ATTENDRE LE CHARGEMENT DE CINZEL
   ========================================================= */

if(document.fonts){

  document.fonts.ready.then(
    () => {

      sizeSacredHeart();

    }
  );

}



/* =========================================================
   REDIMENSIONNEMENT
   ========================================================= */

window.addEventListener(
  "resize",
  sizeSacredHeart
);
