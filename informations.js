
/* =========================================================
   AFFICHE FEDEZ IBIL : PLEIN ÉCRAN
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
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
     DIAPORAMA : SEPT PHOTOGRAPHIES
     ========================================================= */

  const gallery = document.getElementById("info-gallery");
  const frame = document.getElementById("info-gallery-frame");
  const photo = document.getElementById("info-gallery-photo");
  const dots = document.getElementById("info-gallery-dots");
  const sound = document.getElementById("info-gallery-sound");
  const audio = document.getElementById("info-gallery-audio");

  if (!gallery || !frame || !photo || !dots || !sound || !audio) {
    return;
  }

  const photos = Array.from(
    { length: 7 },
    (_, i) => `images/${String(i + 1).padStart(2, "0")}.jpg`
  );

  let current = 0;
  let timer;

  const getLang = () =>
    document.documentElement.lang === "eu" ? "eu" : "fr";

  function show(index) {
    current = (index + photos.length) % photos.length;

    photo.src = photos[current];
    photo.alt = `Photographie ${current + 1} sur ${photos.length}`;

    [...dots.children].forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
      dot.setAttribute("aria-pressed", String(i === current));
    });
  }

  function restartTimer() {
    clearInterval(timer);
    timer = setInterval(() => show(current + 1), 4000);
  }

  /* Points de navigation sous les photographies */

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
     PLEIN ÉCRAN DU DIAPORAMA
     ========================================================= */

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement === gallery) {
        await document.exitFullscreen();
      } else if (!document.fullscreenElement) {
        await gallery.requestFullscreen();
      }
    } catch (error) {
      console.warn("Plein écran indisponible", error);
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
     LECTURE AUDIO ET BOUTON HAUT-PARLEUR
     ========================================================= */

  function updateSound() {
    const playing = !audio.paused;

    sound.querySelector(".sound-icon").hidden = playing;
    sound.querySelector(".mute-icon").hidden = !playing;

    const lang = getLang();

    const label = playing
      ? (lang === "eu" ? "ixilik" : "silence")
      : (lang === "eu" ? "soinua piztu" : "activer le son");

    sound.title = label;
    sound.setAttribute("aria-label", label);

    sound.dataset.i18nTitle = playing
      ? "info.soundOff"
      : "info.soundOn";
  }

  sound.addEventListener("click", async event => {
    event.stopPropagation();

    if (!audio.paused) {
      audio.pause();
    } else {
      try {
        await audio.play();
      } catch (error) {
        console.warn("Lecture audio impossible", error);
      }
    }

    updateSound();
  });

  audio.addEventListener("play", updateSound);
  audio.addEventListener("pause", updateSound);
  audio.addEventListener("ended", updateSound);

  /* Actualisation des infobulles au changement de langue */

  document.querySelectorAll(".lang-btn").forEach(button => {
    button.addEventListener("click", () => {
      queueMicrotask(updateSound);
    });
  });

  updateSound();
});
