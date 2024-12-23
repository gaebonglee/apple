// ---- 메인 동영상 ---- \\

// 스크롤에 따른 크기 변화 & BorderRadius 조절
const mainVideoEl = document.getElementById("main-video-view");
// const videoControllerEl = document.querySelector(".video-controller");

const mainVideoMaxScale = 1.7;
const mainVideominScale = 1.2;
const maxBorderRadius = 30;
const minBorderRadius = 0;

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const maxScroll = window.innerHeight;
  const scrollRatio = Math.min(scrollY / maxScroll, 1);

  const scale =
    mainVideoMaxScale - scrollRatio * (mainVideoMaxScale - mainVideominScale);
  const borderRadius =
    minBorderRadius + scrollRatio * (maxBorderRadius - minBorderRadius);

  mainVideoEl.style.transform = `scale(${scale})`;
  mainVideoEl.style.borderRadius = `${borderRadius}px`;

});
