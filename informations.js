
/* =========================================================
   FEDEZ IBIL — PAGE INFORMATIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     1. AFFICHE FEDEZ IBIL : PLEIN ÉCRAN
     ========================================================= */

  const posterOpen = document.getElementById("info-poster-open");
  const posterOverlay = document.getElementById("info-poster-overlay");
  const posterClose = document.getElementById("info-poster-close");

  if (posterOpen && posterOverlay && posterClose) {

    function openPoster() {
      posterOverlay.hidden = false;
      posterOverlay.setAttribute("aria-hidden", "false");

      document.body.classList.add("poster-open");

      posterClose.focus({ preventScroll: true });
    }

    function closePoster() {
      posterOverlay.hidden = true;
      posterOverlay.setAttribute("aria-hidden", "true");

      document.body.classList.remove("poster-open");

      posterOpen.focus({ preventScroll: true });
    }

    posterOpen.addEventListener("click", openPoster);
    posterClose.addEventListener("click", closePoster);

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && !posterOverlay.hidden) {
        closePoster();
      }
    });
  }


  /* =========================================================
     2. DIAPORAMA : SEPT PHOTOGRAPHIES
     ========================================================= */

  const gallery = document.getElementById("info-gallery");
  const frame = document.getElementById("info-gallery-frame");
  const photo = document.getElementById("info-gallery-photo");
  const dots = document.getElementById("info-gallery-dots");
  const sound = document.getElementById("info-gallery-sound");
  const audio = document.getElementById("info-gallery-audio");

  if (!gallery || !frame || !photo || !dots || !sound || !audio) {
    console.warn("Un ou plusieurs éléments du diaporama sont introuvables.");
    return;
  }

  const photos = Array.from(
    { length: 7 },
    (_, i) => `images/${String(i + 1).padStart(2, "0")}.jpg`
  );

  let current = 0;
  let timer = null;

  function getLang() {
    return document.documentElement.lang === "eu" ? "eu" : "fr";
  }

  function show(index) {
    current = (index + photos.length) % photos.length;

    photo.src = photos[current];
    photo.alt = `Photographie ${current + 1} sur ${photos.length}`;

    [...dots.children].forEach((dot, i) => {
      const active = i === current;

      dot.classList.toggle("active", active);
      dot.setAttribute("aria-pressed", String(active));
    });
  }

  function restartTimer() {
    clearInterval(timer);

    timer = setInterval(() => {
      show(current + 1);
    }, 4000);
  }


  /* =========================================================
     3. POINTS DE NAVIGATION DU DIAPORAMA
     ========================================================= */

  photos.forEach((_, i) => {
    const dot = document.createElement("button");

    dot.type = "button";
    dot.setAttribute("aria-label", `Photo ${i + 1}`);

    dot.addEventListener("click", event => {
      event.stopPropagation();

      show(i);
      restartTimer();
    });

    dots.appendChild(dot);
  });

  show(0);
  restartTimer();


  /* =========================================================
     4. PLEIN ÉCRAN DU DIAPORAMA
     ========================================================= */

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement === gallery) {
        await document.exitFullscreen();
      } else if (!document.fullscreenElement) {
        await gallery.requestFullscreen();
      }
    } catch (error) {
      console.warn("Plein écran indisponible :", error);
    }
  }

  frame.addEventListener("click", toggleFullscreen);

  frame.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleFullscreen();
    }
  });


  /* =========================================================
     5. LECTURE AUDIO ET BOUTON HAUT-PARLEUR
     ========================================================= */

  const soundIcon = sound.querySelector(".sound-icon");
  const muteIcon = sound.querySelector(".mute-icon");


  const morceaux = [
    "audio/01.mp3",
    "audio/02.mp3",
    "audio/03.mp3",
    "audio/04.mp3"
  ];

  let morceauActuel = 0;
  let lectureDemandee = false;

  audio.src = morceaux[morceauActuel];

  async function lirePisteDisponible() {
    while (lectureDemandee && morceauActuel < morceaux.length) {
      const piste = morceaux[morceauActuel];

      try {
        // Vérifie si le fichier existe sur GitHub.
        const reponse = await fetch(piste, { method: "HEAD" });

        if (!reponse.ok) {
          throw new Error("Fichier absent");
        }

        if (!lectureDemandee) return;

        audio.src = piste;
        await audio.play();
        return;

      } catch (error) {
        if (!lectureDemandee) return;

        console.warn("Piste indisponible :", piste, error);
        morceauActuel++;
      }
    }

    lectureDemandee = false;
    updateSound();
  }


  function updateSound() {
    const playing = !audio.paused && !audio.ended;

    // Haut-parleur normal lorsque la musique est arrêtée.
    // Haut-parleur barré lorsque la musique est en lecture.
    if (soundIcon) {
      soundIcon.style.display = playing ? "none" : "block";
      soundIcon.hidden = playing;
    }

    if (muteIcon) {
      muteIcon.style.display = playing ? "block" : "none";
      muteIcon.hidden = !playing;
    }

    const lang = getLang();

    const label = playing
      ? (lang === "eu" ? "ixilik" : "silence")
      : (lang === "eu" ? "soinua piztu" : "activer le son");

    sound.title = label;
    sound.setAttribute("aria-label", label);
    sound.setAttribute("aria-pressed", String(playing));

    sound.dataset.i18nTitle = playing
      ? "info.soundOff"
      : "info.soundOn";
  }


  /* =========================================================
     6. ACTIVATION ET DÉSACTIVATION DU SON
     ========================================================= */


  sound.addEventListener("click", async event => {
    event.stopPropagation();

    // Arrêter temporairement la lecture.
    if (lectureDemandee) {
      lectureDemandee = false;
      audio.pause();
      updateSound();
      return;
    }

    // Recommencer si toutes les pistes sont terminées.
    if (morceauActuel >= morceaux.length) {
      morceauActuel = 0;
    }

    // Reprendre une piste déjà chargée et mise en pause.
    if (
      audio.paused &&
      !audio.ended &&
      audio.currentTime > 0 &&
      audio.currentSrc.endsWith(morceaux[morceauActuel])
    ) {
      lectureDemandee = true;

      try {
        await audio.play();
      } catch (error) {
        console.warn("Reprise impossible :", error);
        morceauActuel++;
        await lirePisteDisponible();
      }

      updateSound();
      return;
    }

    // Chercher la prochaine piste disponible.
    lectureDemandee = true;
    await lirePisteDisponible();
    updateSound();
  });


  /* =========================================================
     7. SYNCHRONISATION DES ICÔNES
     ========================================================= */

  // Le navigateur peut modifier l'état du lecteur audio.
  // Ces événements garantissent que l'icône reste correcte.


  audio.addEventListener("play", updateSound);
  audio.addEventListener("playing", updateSound);
  audio.addEventListener("pause", updateSound);

  audio.addEventListener("ended", async () => {
    if (!lectureDemandee) {
      updateSound();
      return;
    }

    morceauActuel++;
    await lirePisteDisponible();
  });

  audio.addEventListener("error", () => {
    console.warn(
      "Erreur de lecture :",
      morceaux[morceauActuel]
    );

    // Si une piste devient illisible,
    // passer à la suivante.
    if (lectureDemandee) {
      morceauActuel++;
      lirePisteDisponible();
    }

    updateSound();
  });

  /* =========================================================
     8. ACTUALISATION AU CHANGEMENT DE LANGUE
     ========================================================= */

  document.querySelectorAll(".lang-btn").forEach(button => {
    button.addEventListener("click", () => {
      // On laisse langue.js effectuer le changement,
      // puis on actualise l'infobulle du haut-parleur.
      queueMicrotask(updateSound);
    });
  });


  /* =========================================================
     9. INITIALISATION
     ========================================================= */

  updateSound();

});
