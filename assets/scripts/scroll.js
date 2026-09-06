const header = document.querySelector(".lyt-header");
const footer = document.querySelector(".lyt-footer");

let scrollTimer;

window.addEventListener("scroll", () => {
  header.classList.add("is-hidden");
  footer.classList.add("is-hidden");

  clearTimeout(scrollTimer);

  scrollTimer = setTimeout(() => {
    header.classList.remove("is-hidden");
    footer.classList.remove("is-hidden");
  }, 300);
});