const video = document.getElementById("responsive-video");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY; // 현재 스크롤 위치
  const maxScroll = window.innerHeight; // 최대 스크롤 값을 화면 높이로 설정

  // 스크롤 비율 계산 (0 ~ 1)
  const scrollRatio = Math.min(scrollY / maxScroll, 1);

  // 크기 조정 (최소 크기는 0.5로 설정)
  const scale = 1 - scrollRatio * 0.2;

  // 동영상 크기 조정
  video.style.transform = `scale(${scale})`;
});
