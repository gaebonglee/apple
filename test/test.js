const photo = document.getElementById("moving-photo1");

function updatePhotoPosition() {
  const scrollY = window.scrollY; // 현재 스크롤 위치
  const maxScroll = document.body.scrollHeight - window.innerHeight; // 최대 스크롤 높이

  // 스크롤 비율 계산 (0 ~ 1)
  const scrollRatio = scrollY / maxScroll;

  // 이동 및 크기 조정
  const translateX = scrollRatio * window.innerWidth; // 가로 이동 거리
  const translateY = -scrollRatio * window.innerHeight; // 세로 이동 거리
  const scale = 1 - scrollRatio * 0.8; // 점점 작아짐 (최대 80% 감소)

  // 사진 스타일 업데이트
  photo.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

// 스크롤 이벤트 연결
window.addEventListener("scroll", updatePhotoPosition);
