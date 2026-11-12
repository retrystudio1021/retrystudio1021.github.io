// 하위 페이지 공통: 언어 토글, 앵커 대상 언어 자동 선택, 헤더 스크롤 효과
(function () {
  var root = document.documentElement;
  function setLang(l, save) {
    root.setAttribute('data-lang', l);
    root.lang = l;
    if (save) { try { localStorage.setItem('rs-lang', l); } catch (e) {} }
  }

  // #delete-account-en 처럼 특정 언어 섹션 안의 앵커로 들어오면 그 언어로 전환 후 이동
  function followHash() {
    var h = location.hash.slice(1);
    if (h === 'ko' || h === 'en') { setLang(h, true); window.scrollTo(0, 0); return; }
    if (!h) return;
    var el = document.getElementById(decodeURIComponent(h));
    if (!el) return;
    var sec = el.closest('section[lang]');
    if (sec) setLang(sec.getAttribute('lang'), false);
    el.scrollIntoView();
  }

  document.querySelectorAll('.lang-switch button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-set'), true); });
  });
  window.addEventListener('hashchange', followHash);
  followHash();
  // 웹폰트·이미지 로딩으로 레이아웃이 밀린 뒤 앵커 위치 재보정
  window.addEventListener('load', function () {
    if (location.hash.length > 3) followHash();
  });

  var header = document.querySelector('.site-header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
