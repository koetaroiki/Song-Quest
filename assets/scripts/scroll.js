const main = document.querySelector(".lyt-main");
const header = document.querySelector(".lyt-header");
const footer = document.querySelector(".lyt-footer");
const container = document.querySelector(".lyt-global_container");

let scrollTimer;

main.addEventListener("scroll", () => {
  header.classList.add("is-hidden");
  footer.classList.add("is-hidden");
  container.classList.add("is-scroll");

  clearTimeout(scrollTimer);

  scrollTimer = setTimeout(() => {
    header.classList.remove("is-hidden");
    footer.classList.remove("is-hidden");
    container.classList.remove("is-scroll");
  }, 1000);
});

const panels = document.querySelectorAll(".js-tabPanel");

panels.forEach(panel => {
  panel.addEventListener("scroll", () => {
    header.classList.add("is-hidden");
    footer.classList.add("is-hidden");
    container.classList.add("is-scroll");

    clearTimeout(scrollTimer);

    scrollTimer = setTimeout(() => {
      header.classList.remove("is-hidden");
      footer.classList.remove("is-hidden");
      container.classList.remove("is-scroll");
    }, 1000);
  });
});