document.addEventListener("DOMContentLoaded", function () {
    
    // 1. 모바일 환경 햄버거 토글 메뉴 제어
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });
        
        // 메뉴 링크 클릭 시 모바일 메뉴창 닫기
        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
            });
        });
    }

    // 2. 회사 둘러보기 본사 / 베트남 탭 전환 기능
    const tabButtons = document.querySelectorAll(".tab-btn");
    const galleryGrids = document.querySelectorAll(".gallery-grid");

    tabButtons.forEach(button => {
        button.addEventListener("click", function () {
            // 버튼 활성화 클래스 스위칭
            tabButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            // 타겟 갤러리 활성화 스위칭
            const targetTab = this.getAttribute("data-tab");
            galleryGrids.forEach(grid => {
                grid.classList.remove("active");
                if (grid.getAttribute("id") === `gallery-${targetTab}`) {
                    grid.classList.add("active");
                }
            });
        });
    });

    // 3. 토스 스타일 스르륵 페이드인 스크롤 애니메이션 엔진
    function revealOnScroll() {
        const reveals = document.querySelectorAll(".reveal");
        const windowHeight = window.innerHeight;
        const triggerPoint = 80; // 화면 하단에서 80px 진입 시 노출

        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - triggerPoint) {
                element.classList.add("active");
            }
        });
    }

    // 스크롤 이벤트 바인딩 및 초기 구동
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // 첫 화면 로딩 시 탑재된 요소 즉시 노출
});
