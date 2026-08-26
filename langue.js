const translations = {
  fr: {
    "nav.home": "Accueil",
    "nav.info": "Informations",
    "nav.signup": "Inscriptions",
    "nav.links": "Liens",
    "home.text": "Fedez Ibil vous propose de vivre l’expérience d’un pèlerinage traditionnel dans un esprit de ferveur et d’authentique amitié chrétienne. Prières et Cantiques traditionnels basques, béarnais et français nous permettront d’exprimer notre Foi en Dieu et notre Espérance du Salut avec le secours de Notre-Dame. Nous voulons ainsi retisser les liens qui de tout temps ont uni Foi et culture traditionnelle locale. Pendant ce pèlerinage, nous recevrons les sacrements de l’Eglise sous leur forme tridentine."
  },
  eu: {
    "nav.home": "Harrera",
    "nav.info": "Argibideak",
    "nav.signup": "Izen-emateak",
    "nav.links": "Loturak",
    "home.text": "Fedez Ibil-ek erromesaldi tradizional baten esperientzia bizitzera gomitatzen zaitu, debozionezko giroan eta egiazko adiskidetasun giristinoan. Eskualdun, biarnes eta frantses othoitz eta kantu tradizionalek Jainkoaren baitako gure Fedea eta Salbamenduaren Esperantza adierazten lagunduko gaituzte, Andredena Mariaren laguntzarekin. Horrela, aspaldidanik Fedea eta tokiko kultura tradizionala elkartu dituzten lokarriak berriz ehundu nahi ditugu. Erromesaldi huntan, Elizaren sakramenduak forma tridentinoan errezibituko ditugu."
  }
};

function applyLanguage(lang) {
  const selected = translations[lang] ? lang : "fr";
  document.documentElement.lang = selected === "eu" ? "eu" : "fr";

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[selected][key]) el.textContent = translations[selected][key];
  });

  // Même logique que sur Herria Bihotzean :
  // en français : "Français" / "Basque"
  // en basque : "Frantsesez" / "Eskuaraz"
  const labels = selected === "eu"
    ? { fr: "Frantsesez", eu: "Eskuaraz" }
    : { fr: "Français", eu: "Basque" };

  document.querySelectorAll(".lang-label").forEach(el => {
    const target = el.dataset.langLabel;
    if (labels[target]) el.textContent = labels[target];
  });

  document.querySelectorAll(".lang-btn").forEach(btn => {
    const isActive = btn.dataset.lang === selected;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  localStorage.setItem("fedez-ibil-lang", selected);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
  });
  applyLanguage(localStorage.getItem("fedez-ibil-lang") || "fr");
});
