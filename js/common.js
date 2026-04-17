const searchBtn  = document.getElementById('searchBtn');
const searchBar  = document.getElementById('searchBar');
const searchInput = document.getElementById('searchInput');
const menuBtn    = document.getElementById('menuBtn');
const navSidebar = document.getElementById('navSidebar');
const navCloseBtn = document.getElementById('navCloseBtn');
const backdrop   = document.getElementById('backdrop');
const menuIcon   = document.getElementById('menuIcon');

const prevIssueBtn = document.getElementById('prevIssueBtn');
const prevIssueDropdown = document.getElementById('prevIssueDropdown');
const searchCloseBtn = document.getElementById('searchCloseBtn');


let searchOpen = false;
let menuOpen   = false;

searchCloseBtn.addEventListener('click', closeAll);
prevIssueBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    prevIssueDropdown.classList.toggle('open');
});

// 바깥 클릭 시 닫기
document.addEventListener('click', () => {
    prevIssueDropdown.classList.remove('open');
});

/* ── close all ── */
function closeAll() {
    searchOpen = false;
    menuOpen   = false;
    searchBar.classList.remove('open');
    navSidebar.classList.remove('open');
    backdrop.classList.remove('show');
    navSidebar.setAttribute('aria-hidden', 'true');
    searchBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-expanded', 'false');
    setMenuIcon(false);
}

/* ── hamburger icon morph ── */
function setMenuIcon(isOpen) {
    menuIcon.innerHTML = `<line x1="3" y1="5.5" x2="19" y2="5.5"/><line x1="3" y1="12" x2="19" y2="12"/><line x1="3" y1="18.5" x2="19" y2="18.5"/>`;
}

/* ── search toggle ── */
searchBtn.addEventListener('click', () => {
    if (menuOpen) { closeAll(); return; }
    searchOpen = !searchOpen;
    searchBar.classList.toggle('open', searchOpen);
    backdrop.classList.toggle('show', searchOpen);
    searchBtn.setAttribute('aria-expanded', searchOpen);
    if (searchOpen) { setTimeout(() => searchInput.focus(), 300); }
});

/* ── menu toggle ── */
menuBtn.addEventListener('click', () => {
    if (searchOpen) { closeAll(); return; }
    menuOpen = !menuOpen;
    navSidebar.classList.toggle('open', menuOpen);
    backdrop.classList.toggle('show', menuOpen);
    navSidebar.setAttribute('aria-hidden', !menuOpen);
    menuBtn.setAttribute('aria-expanded', menuOpen);
    setMenuIcon(menuOpen);
});

/* ── sidebar close btn ── */
navCloseBtn.addEventListener('click', closeAll);

/* ── backdrop / ESC close ── */
backdrop.addEventListener('click', closeAll);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });

/* ── section02 ── */
const slider = document.getElementById('sec02Slider');
const bar = document.getElementById('sec02ProgressBar');

const origCards = Array.from(slider.querySelectorAll('.sec02-card'));
const total = origCards.length;
origCards.forEach(card => slider.appendChild(card.cloneNode(true)));

let current = 0;
let autoTimer;

function getCardW() { return slider.querySelectorAll('.sec02-card')[0].offsetWidth + 14; }

function slideTo(index, smooth = true) {
    current = index;
    slider.scrollTo({ left: index * getCardW(), behavior: smooth ? 'smooth' : 'instant' });
    bar.style.width = ((current % total) / total * 100) + '%';
}

function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => {
    const next = current + 1;
    slideTo(next);
    if (next >= total) {
        setTimeout(() => { current = next - total; slider.scrollTo({ left: current * getCardW(), behavior: 'instant' }); }, 500);
    }
    }, 3500);
}

function stopAuto() { clearInterval(autoTimer); }

slider.addEventListener('mouseenter', stopAuto);
slider.addEventListener('mouseleave', startAuto);
startAuto();

/* ── section03 ── */
['sec03Track1', 'sec03Track2'].forEach(id => {
    const track = document.getElementById(id);
    track.innerHTML += track.innerHTML;
});

/* ── 하단 배너 고정/해제 ── */
const bottomBanner = document.getElementById('bottomBanner');
const footer = document.getElementById('footer');
function checkBannerPos() {
    const footerRect = footer.getBoundingClientRect();
    const bannerH = bottomBanner.offsetHeight;
    if (footerRect.top < window.innerHeight) {
    bottomBanner.style.position = 'absolute';
    bottomBanner.style.bottom = 'auto';
    bottomBanner.style.top = (footer.offsetTop - bannerH) + 'px';
    bottomBanner.style.left = '0';
    } else {
    bottomBanner.style.position = 'fixed';
    bottomBanner.style.top = 'auto';
    bottomBanner.style.bottom = '0';
    bottomBanner.style.left = '0';
    }
}

window.addEventListener('scroll', checkBannerPos);
window.addEventListener('resize', () => {
    clearTimeout(window._resizeTimer);
    window._resizeTimer = setTimeout(checkBannerPos, 100);
});
checkBannerPos();



// ✅ 떠있는 아이콘: 공유 클릭시 아이콘 등장, Top버튼
document.addEventListener('DOMContentLoaded', function () {
    const shareToggle = document.querySelector('.share-toggle');
    const sharePanel = document.querySelector('.share-panel');
    const shareWrap = document.querySelector('.share-wrap');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const subscribeButton = document.getElementById('subscribe-button');

    shareToggle.addEventListener('click', () => {
        sharePanel.classList.toggle('active');
        shareWrap.classList.toggle('open');
    });

    function checkFloatingButtonsVisibility() {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            // 모바일 환경: 맨 위로 버튼만 보이도록 하고 공유 관련 요소 숨김
            if (scrollToTopBtn) {
                scrollToTopBtn.style.display = 'flex';
            }

            if (shareWrap) {
                shareWrap.style.display = 'none';
            }
            if (subscribeButton) {
                subscribeButton.style.display = 'none';
            }
        } else {
            // 데스크톱 환경: 모든 버튼 보이도록 설정
            if (scrollToTopBtn) {
                scrollToTopBtn.style.display = 'flex'; // 또는 'block' 등 원래 보이도록 설정했던 display 값
            }
            if (shareWrap) {
                shareWrap.style.display = 'block';
            }
            if (subscribeButton) {
                subscribeButton.style.display = 'flex'; // 구독 버튼 보임
            }
            if (sharePanel) {
                sharePanel.classList.remove('active'); // 공유 패널이 열려있을 경우 닫음
            }
            if (shareWrap) {
                shareWrap.classList.remove('open'); // shareWrap 열려있을 경우 닫음
            }
        }
    }
    // 공유 버튼 외부 클릭 시 닫기
    document.addEventListener('click', (e) => {
        if (sharePanel && shareWrap && shareToggle &&
            !sharePanel.contains(e.target) &&
            !shareWrap.contains(e.target) &&
            !shareToggle.contains(e.target)) {
            sharePanel.classList.remove('active');
            shareWrap.classList.remove('open');
        }
    });
    // 초기 로드 시와 창 크기 변경 시 visibility 체크
    checkFloatingButtonsVisibility();
    window.addEventListener('resize', checkFloatingButtonsVisibility);

    // 페이지가 일정 높이 이상 스크롤되면 버튼을 보이게 함
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    // 버튼 클릭 시 부드럽게 최상단으로 스크롤
    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 부드러운 스크롤 효과 적용
        });
    });
});