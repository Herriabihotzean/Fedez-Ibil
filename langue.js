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

    "hero.quote":
  "« Voilà ce Cœur qui a tant aimé les hommes… »",

    "hero.subtitle":
      "Pèlerinage traditionnel basque – 17 et 18 octobre 2026",

    "home.text":
      `<p>FEDEZ IBIL (avancer de par la foi, se conduire selon la foi) vous propose de vivre l’expérience d’un pèlerinage traditionnel dans un esprit de ferveur et d’authentique amitié chrétienne. Prières et Cantiques traditionnels de nos régions, entonnés avec joie dans l’effort de la marche, nous permettront d’exprimer notre Foi en Dieu et notre Espérance du Salut avec le secours de Notre-Dame.</p>

      <p>Désireux de manifester notre appartenance à l’Eglise universelle à travers cette dévotion catholique, nous voulons aussi retisser les liens qui de tout temps ont uni Foi et culture traditionnelle locale. Dans cet esprit, FEDEZ IBIL fait le choix de la liturgie tridentine, à la fois familière de nos prédécesseurs et exprimant dans la plénitude de son déploiement une Foi vivante et intemporelle. Ainsi, nous recevrons les sacrements de l’Eglise sous leur forme traditionnelle.</p>

      <p>À très vite !</p>`,

    "info.text":
      `<p>Pour la première édition de <strong>FEDEZ IBIL</strong>, nous préparons un pèlerinage en Basse-Navarre (autour de Saint-Jean-Pied-de-Port) sur le thème de la dévotion au Sacré-Cœur de Jésus. Il se déroulera de la manière suivante&nbsp;:</p>

      <ul>
        <li>le samedi, le point de rendez-vous sera fixé peu avant midi pour la messe. Nous parcourrons 13 ou 15 km sur les sentiers de Compostelle. À l’arrivée, après une veillée, nous passerons la nuit sous tente.</li>
        <li>le dimanche, nous reprendrons notre pèlerinage, parcourrons environ la même distance et terminerons avec la messe dominicale, en début ou milieu d’après-midi.</li>
      </ul>

      <p>Lorsque les préparatifs auront suffisamment avancé, cette page sera mise à jour.</p>`,

    "info.marguerite":
      "Sainte Marguerite-Marie Alacoque (1647 - 1690)",

    "info.michel":
      "Saint Michel Garicoïts (1797 - 1863)",

    "info.back":
      "← Retour à l’accueil",

    "links.herriaDescription":
      "Histoire, langue basque, prières et cantiques en basque et en béarnais :"

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

    "hero.quote":
  "« Horra gizonak hainbat maitatu dituen Bihotza… »",

    "hero.subtitle":
  'Eskualdunak ohidurazko beilan – 2026<sup>ko</sup> urriaren 17 eta 18<sup>an</sup>',

    "home.text":
      `<p>FEDEZ IBIL elkarteak beila tradizional baten entseatzeko parada eskaintzen dautzue, fedezko eta zinezko adixkidantza giristino izpiritu batekin. Gure herrietako otoitz eta kantika tradizionalak bozkarioan ozendatuak izanen dire, bideko nekeetan. Horrela, gure Jainkoaren baitako Fedea eta gure Salbamenduaren itxaropena adierazten ahalko ditugu, Andre Dena Mariaren grazia lagun.</p>

      <p>Debozio katoliko horren bidez, ezagutarazi nahi dugu Elizari leial gatzaizkola. Bertzalde, Fedea eta lekuko ohidurak elgarrekin estekatzen dituzten betiko loturak berpiztu nahi ditugu ere bai. Gogo huntan, FEDEZ IBIL elkarteak Trenteko Konzilioaren liturgia atxikitzen du, zeren gure aitzinekoeri ohidurazkoa baitzitzaioten, baita ere bere hedapen osoan, betiko Fede bizi baten adierazpena baita. Horrela, Elizako sakramenduak molde tradizionalean errezebituko ditugu.</p>

      <p>Laster arte !</p>`,

    "info.text":
      `<p><strong>FEDEZ IBIL</strong>-en lehen gertakaria kari, beila bat antolatzen ari gare Baxe-Nabarren (Donibane-Garaziko inguruan), Jesusen Bihotz Sakratuarenganako debozioa gaitzat harturik. Horrela iraganen da&nbsp;:</p>

      <ul>
        <li>larunbatean, hitzordua eguerdi aitzin finkatua izanen da, mezaren entzuteko. 13 edo 15 kilometro ibiliko gare Konpostelako bideetan. Heltokirat heltzean, beilaldi baten ondotik, gauaz oihal-etxetan lo eginen dugu&nbsp;;</li>
        <li>Igandean, gure beila segituko dugu, luzaera berdintsuko bidea eginez, eta igandeko mezarekin bururatuko dugu, arratsalde hastapenean edo erdialdean.</li>
      </ul>

      <p>Apailuak aski aitzinatuak izanen direlarik, orrialde hau eguneratua izanen da.</p>`,

    "info.marguerite":
      "Santa Marguerite-Marie Alacoque (1647 - 1690)",

    "info.michel":
      "San Mixel Garikoitz (1797 - 1863)",

    "info.back":
      "← Harrera-horrirat itzuli",

    "links.herriaDescription":
      "Istoria, eskuara, eskuarazko othoitz eta kantikak, biarnesez ere :"

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


  /* Traduction du texte d'accueil avec paragraphes */

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


  /*
     Recalcul du logo puis de la position
     de la devise.
  */

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


  /*
     On attend que le navigateur ait
     appliqué la nouvelle dimension
     avant de mesurer le logo.
  */

  requestAnimationFrame(
    positionHeroCaption
  );

}



/* =========================================================
   POSITION DE LA DEVISE
   ========================================================= */

function positionHeroCaption(){

  const hero =
    document.querySelector(".hero");

  const heart =
    document.querySelector(".brand-heart");

  const caption =
    document.querySelector(".hero-caption");

  const quote =
    document.querySelector(".hero-quote");

  const subtitle =
    document.querySelector(".hero-subtitle");

  const nav =
    document.querySelector(".main-nav");


  if(
    !hero ||
    !heart ||
    !caption ||
    !quote ||
    !subtitle ||
    !nav
  ){
    return;
  }


  const heroRect =
    hero.getBoundingClientRect();

  const heartRect =
    heart.getBoundingClientRect();

  const navRect =
    nav.getBoundingClientRect();


  /*
     Bas réel de l'image visible :
     on prend le haut de la barre de navigation.
  */

  const visibleBottom =
    navRect.top - heroRect.top;


  /*
     Bas du Sacré-Cœur
     par rapport au haut du hero.
  */

  const heartBottom =
    heartRect.bottom - heroRect.top;


  /*
     Position de la citation :
     à mi-distance entre
     le bas du Sacré-Cœur
     et le bas visible de l'image.
  */

  const quoteY =
    heartBottom +
    ((visibleBottom - heartBottom) / 2);


  caption.style.top =
    `${quoteY}px`;


  /*
     Position du sous-titre :
     à mi-distance entre
     la ligne de la citation
     et le bas visible de l'image.
  */

  const subtitleY =
    (visibleBottom - quoteY) / 2;


  subtitle.style.top =
    `${subtitleY}px`;

}



/* =========================================================
   INITIALISATION
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    document
      .querySelectorAll(
        ".lang-btn"
      )
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
