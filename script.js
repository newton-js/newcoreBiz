"use strict";

const header = document.querySelector(".header");
const navBtn = document.querySelector(".btn-nav");

// toggle Navigation //

navBtn.addEventListener("click", function (e) {
  header.classList.toggle("nav");
});

// STICKY //
const heroSection = document.querySelector(".hero");

const navObserver = new IntersectionObserver(
  function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      document.body.classList.add("sticky");
      console.log("not intersect");
    } else {
      document.body.classList.remove("sticky");
      console.log("intersect");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-100px",
  }
);

navObserver.observe(heroSection);

// Date //
const year = document.querySelector(".year");
const date = new Date();
year.textContent = date.getFullYear();

// Tabbed Component //

// const a = ".tabs";
// const b = ".tab";
// const c = ".tab-content";
// const tabBox = "tab";
// const activeTab = "tab-active";
// const activeContent = "content-active";

function tabbedComponent(
  a,
  b,
  c,
  tabBox,
  activeTab,
  activeContent,
  display = ""
) {
  const tabs = document.querySelector(a);
  const eachTab = document.querySelectorAll(b);
  const tabContent = document.querySelectorAll(c);
  tabs.addEventListener("click", function (e) {
    e.preventDefault();
    const clicked = e.target.classList.contains(tabBox);
    console.log(clicked, e.target);
    if (e.target.closest(`.${tabBox}`)) {
      eachTab.forEach((item) => item.classList.remove(activeTab));
      const point = e.target.closest(`.${tabBox}`);
      point.classList.add(activeTab);
      tabContent.forEach((content) => {
        content.classList.remove(activeContent);
      });
      const data = point.dataset.tab;
      console.log(data);
      document
        .querySelector(`.${display}content-${data}`)
        .classList.add(activeContent);
    }
  });
}

// about tab //
tabbedComponent(
  ".tabs",
  ".tab",
  ".tab-content",
  "tab",
  "tab-active",
  "content-active"
);

// tab //

tabbedComponent(
  ".tabbs",
  ".tab-li",
  ".tabb-content",
  "tab-li",
  "tabb-active",
  "tabb-content-active",
  "tabz-"
);

// Portfolio //

tabbedComponent(
  ".portfolio-tab",
  ".nav-list",
  ".portfolio-content",
  "nav-list",
  "portfolio-active",
  "portfolio-content-active",
  "portfolio-"
);

// Slider //

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

const goToSlides = function (slide) {
  slides.forEach((s, index) => {
    s.style.transform = `translateX(${(index - slide) * 100}%)`;
  });
};

goToSlides(0);

let currentSlide = 0;
const maxSlide = slides.length - 1;
// console.log(maxSlide);

const nextSlide = function () {
  if (currentSlide === maxSlide) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlides(currentSlide);
  dots.forEach((dot) => {
    dot.classList.remove("dot-active");
  });
  document.querySelector(`.dot-${currentSlide}`).classList.add("dot-active");
};

setInterval(nextSlide, 4000);

// Accordion //

const accordions = document.querySelectorAll(".faq-accordion");

accordions.forEach((accordion) => {
  accordion.addEventListener("click", function (e) {
    e.preventDefault();
    this.querySelector(".accordion-body ").classList.toggle("hidden");
    this.querySelector(".acc-icon-1 ").classList.toggle("hidden");
    this.querySelector(".acc-icon-2 ").classList.toggle("hidden");
  });
});

//  MAP //

const locate = navigator.geolocation;
// console.log(locate);
locate.getCurrentPosition(
  (position) => {
    // console.log(position);
    const { latitude, longitude } = position.coords;
    // console.log(latitude, longitude);
    var map = L.map("map", {
      center: [latitude, longitude],
      zoom: 13,
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup("A pretty CSS popup.<br> Easily customizable.")
      .openPopup();
  },
  (err) => {
    console.error(err);
  }
);

// REVEAL SECTION //

const allSections = document.querySelectorAll(".section");

const reveal = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const options = {
  root: null,
  threshold: 0.1,
};

const sectionObserver = new IntersectionObserver(reveal, options);

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//smooth scroll

const allLinks = document.querySelectorAll("a:link");
allLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");
    // console.log(href);
    // scroll to top
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    //scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionTo = document.querySelector(href);
      sectionTo.scrollIntoView({ behavior: "smooth" });
    }
    // close Navigation
    if (link.classList.contains("nav-listed")) {
      header.classList.toggle("nav");
    }

    // window.location.href = href;
  });
});

// Lazy Loading //

const allImgs = document.querySelectorAll("img[data-src]");

const imgObserver = new IntersectionObserver(
  function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener("load", function () {
      entry.target.classList.remove("lazy-img");
    });
    observer.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 0.1,
    rootMargin: "150px",
  }
);

allImgs.forEach((img) => imgObserver.observe(img));
