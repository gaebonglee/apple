import ipads from "../data/ipads.js";
import navigations from "../data/navigations.js";

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
const headerMenuEls = [...headerEl.querySelectorAll("ul.menu > li")];
const searchWrapEl = headerEl.querySelector(".search-wrap");
const searchStarterEl = headerEl.querySelector(".search-starter");
const searchCloserEl = searchWrapEl.querySelector(".search-closer");
const searchShadowEl = searchWrapEl.querySelector(".shadow");
const searchInputEl = searchWrapEl.querySelector("input");
const searchDelayEls = [...searchWrapEl.querySelectorAll("li")];

searchStarterEl.addEventListener("click", showSearch);
searchCloserEl.addEventListener("click", hideSearch);
searchShadowEl.addEventListener("click", hideSearch);

function showSearch() {
  headerEl.classList.add("searching");
  document.documentElement.classList.add("fixed");
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  });
  // 검색 인풋 요소가 나타난 후 동작!
  setTimeout(() => {
    searchInputEl.focus();
  }, 600);
}
function hideSearch() {
  headerEl.classList.remove("searching");
  document.documentElement.classList.remove("fixed");
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  });
  //hideSearch에서 reverse 된 채로 끝나면 showSearch에서 revese된 채로 다시 실행되니 ' searchDelayEls.reverse()'를 추가해야함!
  searchDelayEls.reverse();
  searchInputEl.value = "";
}

// 요소가 가시성 관찰!
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add("show");
  });
});

const infoEls = document.querySelectorAll(".info");
infoEls.forEach(function (el) {
  io.observe(el);
});

// ---- 메인 동영상 ---- \\

// 스크롤에 따른 크기 변화 & BorderRadius 조절
const mainVideoEl = document.getElementById("main-video-view");
const videoController = document.querySelector(".main-video .video-controller");

const initialScale = 1.7;
const minScale = 1.2;
const maxBorderRadius = 20;
const minBorderRadius = 0;

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const maxScroll = window.innerHeight;
  const scrollRatio = Math.min(scrollY / maxScroll, 1);

  const scale = initialScale - scrollRatio * (initialScale - minScale);
  const borderRadius =
    minBorderRadius + scrollRatio * (maxBorderRadius - minBorderRadius);

  mainVideoEl.style.transform = `scale(${initialScale})`;
  mainVideoEl.style.transform = `scale(${scale})`;
  mainVideoEl.style.borderRadius = `${borderRadius}px`;
});

const updateControllerPosition = () => {
  const videoBounds = mainVideoEl.getBoundingClientRect();
  const videoControllerBounds = videoController.getBoundingClientRect();

  const controllerX =
    videoBounds.right - videoControllerBounds.width - videoBounds.width * 0.1;
  const controllerY =
    videoBounds.bottom -
    videoControllerBounds.height -
    videoBounds.height * 0.1;

  videoController.style.transform = `translate(${
    controllerX - videoBounds.left
  }px, ${controllerY - videoBounds.top}px)`;
};

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const maxScroll = window.innerHeight;
  const scrollRatio = Math.min(scrollY / maxScroll, 1);

  const scale = initialScale - scrollRatio * (initialScale - minScale);
  const borderRadius =
    minBorderRadius + scrollRatio * (maxBorderRadius - minBorderRadius);

  mainVideoEl.style.transform = `scale(${scale})`;
  mainVideoEl.style.borderRadius = `${borderRadius}px`;

  // 버튼 위치 업데이트
  updateControllerPosition();
});

window.addEventListener("resize", updateControllerPosition);

// 초기 위치 설정
updateControllerPosition();

//재생 및 일시 정지
const mainVideo = document.querySelector(".main-video video");
const playBtn = document.querySelector(".main-video .controller--play");
const pauseBtn = document.querySelector(".main-video .controller--pause");

playBtn.addEventListener("click", function () {
  mainVideo.play();
  playBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
});

pauseBtn.addEventListener("click", function () {
  mainVideo.pause();
  playBtn.classList.remove("hide");
  pauseBtn.classList.add("hide");
});

// '당신에게 맞는 iPad는?' 랜더링!
const itemsEl = document.querySelector("section.compare .items");
ipads.forEach((ipad) => {
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");

  let colorList = "";
  ipad.colors.forEach((color) => {
    colorList += `<li style="background-color: ${color};"></li>`;
  });

  // VS Code 확장 프로그램 - Comment tagged templates
  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString("en-US")}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `;

  itemsEl.append(itemEl);
});

// Navigations Js

const navigationsEl = document.querySelector("footer .navigations");
navigations.forEach(function (nav) {
  const mapEl = document.createElement("div");
  mapEl.classList.add("map");

  let mapList = "";
  nav.maps.forEach(function (map) {
    mapList += /*html*/ `
      <li>
        <a href="${map.url}">${map.name}</a>
      </li>`;
  });
  mapEl.innerHTML = /*html*/ `
  <h3>
    <span class="text">${nav.title}</span>
  </h3>
  <ul>
    ${mapList}
  </ul>
    `;

  navigationsEl.append(mapEl);
});

// 헤당 연도 Js
const thisYearEl = document.querySelector("span.this-year");
thisYearEl.textContent = new Date().getFullYear();
