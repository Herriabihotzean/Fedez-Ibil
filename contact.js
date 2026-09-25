
/* ==========================================
   FEDEZ IBIL — FORMULAIRE DE CONTACT
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-status");
  const submit = document.getElementById("contact-submit");
  const languageField = document.getElementById("contact-lang");
  const responseFrame = document.getElementById("contact-response");

  if (!form || !status || !submit || !responseFrame) {
    return;
  }

  const messages = {
    fr: {
      sending: "Envoi de votre message en cours…",
      success: "Votre message a bien été envoyé. Merci !",
      error: "L'envoi n'a pas pu être confirmé. Veuillez réessayer.",
      configuration: "Le formulaire n'est pas encore configuré."
    },
    eu: {
      sending: "Zure mezua igortzen ari da…",
      success: "Zure mezua ongi igorria izan da. Milesker !",
      error: "Ezin izan da igorpena baieztatu. Otoi, berriz entsea zaitez.",
      configuration: "Formularioa ez da oraino prest."
    }
  };

  let pending = false;
  let timeoutId = null;

  function currentLanguage() {
    return document.documentElement.lang === "eu" ? "eu" : "fr";
  }

  function showStatus(message, type = "") {
    status.textContent = message;
    status.className = "contact-status";

    if (type) {
      status.classList.add(type);
    }
  }

  function finish(success) {
    if (!pending) return;

    pending = false;
    clearTimeout(timeoutId);
    submit.disabled = false;

    const language = currentLanguage();

    if (success) {
      showStatus(messages[language].success, "success");
      form.reset();
    } else {
      showStatus(messages[language].error, "error");
    }
  }

  form.addEventListener("submit", event => {
    const endpoint = window.FEDEZ_CONTACT_ENDPOINT;

    if (
      !endpoint ||
      typeof endpoint !== "string" ||
      !/^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/.test(endpoint)
    ) {
      event.preventDefault();
      showStatus(messages[currentLanguage()].configuration, "error");
      return;
    }

    if (pending) {
      event.preventDefault();
      return;
    }

    languageField.value = currentLanguage();
    form.action = endpoint;

    pending = true;
    submit.disabled = true;

    showStatus(messages[currentLanguage()].sending);

    /*
      L'envoi s'effectue dans l'iframe invisible.
      Attention : son chargement ne prouve pas à lui seul
      que Google Apps Script a envoyé le courriel.
    */

    timeoutId = setTimeout(() => {
      finish(false);
    }, 20000);
  });

  /*
    Avec une iframe et un domaine différent, le navigateur
    ne peut pas lire librement la réponse de Google Apps Script.
    On ne présente donc pas son chargement comme une preuve
    de bonne réception du message.
  */

  responseFrame.addEventListener("load", () => {
    if (!pending) return;

    pending = false;
    clearTimeout(timeoutId);
    submit.disabled = false;

    const language = currentLanguage();

    showStatus(
      language === "eu"
        ? "Formularioa igorria izan da. Mezuaren harrera ezin izan da baieztatu."
        : "Le formulaire a été transmis. La réception du message reste à confirmer."
    );
  });
});
