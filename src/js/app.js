import Splide from "./splide.esm";
import Scrollbar from "smooth-scrollbar";
import gsap from "gsap";

let scroll, slider, hoverCards, upperReviews, cardTL, canvas, ctx;
let config = {
  visible: false,
};
const activeLink = document.querySelector(".nav-link");

// fade-in
document.body.classList.toggle("visible");

gsap.from("body", {
  y: "100vh",
  duration: 1.2,
  ease: "back.out(1.2,.9)",
});

// smoothscroll
scroll = Scrollbar.init(document.querySelector("main.container"), {
  renderByPixels: true,
});
// slider
slider = new Splide("#image-carousel", {
  arrows: false,
  pagination: false,
  perPage: 3,
  perMove: 1,
  start: 2,
  snap: true,
  flickPower: 100,

  // waitForTransition: true,
  // wheel: true,

  breakpoints: {
    640: {
      perPage: 1,
    },
    768: {
      perPage: 2,
    },
  },
}).mount();

// dropdown navigation

const openBTN = document.querySelector("#open-nav");
openBTN.addEventListener("click", openNav);

const closeBTN = document.querySelector("#close-nav");
closeBTN.addEventListener("click", closeNav);

hoverCards = Array.from(document.querySelectorAll(".reviews .card"));

hoverCards.forEach((c, i) => {
  c.addEventListener("mouseenter", (e) => showCard(e, i));
  c.addEventListener("mouseleave", hideCards);
});

// nav
const openTL = new gsap.timeline({
  paused: true,
  defaults: {
    ease: "power2.out",
    // duration: 0.6,
  },
});

openTL
  .to(
    ".backdrop",
    {
      height: "100vh",
      opacity: 1,
      pointerEvents: "all",
    },
    "-=50%"
  )
  .to(
    ".backdrop header",
    {
      backgroundColor: "#000",
    },
    "<"
  )
  .to(
    config,
    {
      onComplete() {
        config.visible = true;
        activeLink.classList.add("active");
      },
    },
    "<"
  )
  .from(".nav-link", { y: "100%", stagger: 0.1, ease: "power2.out" })
  .from(".links p", { opacity: 0, stagger: 0.2 }, "<");

function openNav() {
  openTL.play();
}
function closeNav() {
  activeLink.classList.remove("active");
  openTL.reverse();
}
closeNav();
// review cards
function showCard(e, i) {
  upperReviews = hoverCards.slice(+i + 1);

  if (!upperReviews.length) return;

  cardTL = new gsap.timeline();
  cardTL.to(upperReviews, { xPercent: 40, ease: "expo.out", duration: 0.5 });
}

function hideCards() {
  if (!upperReviews.length) return;
  cardTL.to(upperReviews, { xPercent: 0, ease: "expo.out", duration: 0.5 });
}
