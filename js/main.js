// 장바구니 !!
const basketStarterEl = document.querySelector("header .basket-starter");
const basketEl = document.querySelector("header .basket");

basketStarterEl.addEventListener("click", function (event) {
  event.stopPropagation();
  if (basketEl.classList.contains("show")) {
    //hide
    hideBasket();
  } else {
    //show
    showBasket();
  }
});
basketEl.addEventListener("click", function (event) {
  event.stopPropagation();
});

window.addEventListener("click", function () {
  hideBasket();
});

function showBasket() {
  basketEl.classList.add("show");
}
function hideBasket() {
  basketEl.classList.remove("show");
}

// 검색!!
const headerEl = document.querySelector("header");
const hedaerMenuEls = [...headerEl.querySelectorAll("ul.menu > li")];
const searchWrapEl = headerEl.querySelector(".search-wrap");
const searchStarterEl = headerEl.querySelector(".search-starter");
const searchCloserEl = searchWrapEl.querySelector(".search-closer");
const searchShadowEl = searchWrapEl.querySelector(".shadow");

searchStarterEl.addEventListener("click", showSearch);
searchCloserEl.addEventListener("click", hideSearch);
searchShadowEl.addEventListener("click", hideSearch);

function showSearch() {
  headerEl.classList.add("searching");
  document.documentElement.classList.add("fixed");
  hedaerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / hedaerMenuEls.length + "s";
  });
}
function hideSearch() {
  headerEl.classList.remove("searching");
  document.documentElement.classList.remove("fixed");
  hedaerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / hedaerMenuEls.length + "s";
  });
}
