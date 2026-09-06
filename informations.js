document.addEventListener("DOMContentLoaded", () => {
  const openButton = document.getElementById("info-poster-open");
  const overlay = document.getElementById("info-poster-overlay");
  const closeButton = document.getElementById("info-poster-close");

  if (!openButton || !overlay || !closeButton) return;

  function openPoster() {
    overlay.hidden = false;
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("poster-open");
    closeButton.focus({ preventScroll: true });
  }

  function closePoster() {
    overlay.hidden = true;
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("poster-open");
    openButton.focus({ preventScroll: true });
  }

  openButton.addEventListener("click", openPoster);
  closeButton.addEventListener("click", closePoster);

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !overlay.hidden) closePoster();
  });
});
