document.addEventListener("DOMContentLoaded", function () {
    
    // 1. 모바일 햄버거 메뉴
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => navMenu.classList.toggle("active"));
        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => navMenu.classList.remove("active"));
        });
    }

    // 2. 인트로 배경 이미지 슬라이더 (4초 자동 전환)
    const heroSection = document.getElementById("intro");
    if(heroSection) {
        const images = [
            "img/about_hq_exterior.jpg",
            "img/about_vn_exterior.jpg",
            "img/equ_ins_1.png",
            "img/prod_roll_1.jpg"
        ];
        let heroIndex = 0;
        heroSection.style.backgroundImage = `url(${images[0]})`;
        setInterval(() => {
            heroIndex = (heroIndex + 1) % images.length;
            heroSection.style.backgroundImage = `url(${images[heroIndex]})`;
        }, 4000);
    }

    // 3. 검사장비 4열 슬라이더 (Carousel)
    const track = document.getElementById('inspectionTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (track && prevBtn && nextBtn) {
        let currentIndex = 0;
        
        const updateCarousel = () => {
            // 자식 요소의 너비 + gap(15px)을 더하여 이동 거리 계산
            const slideWidth = track.children[0].getBoundingClientRect().width + 15;
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        };
        
        nextBtn.addEventListener('click', () => {
            // PC화면(4개 노출)과 모바일화면(2개 노출)에 따른 최대 인덱스 계산
            const visibleItems = window.innerWidth <= 768 ? 2 : 4;
            const maxIndex = track.children.length - visibleItems;
            
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        });
        
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
        
        // 화면 크기 조절 시 슬라이더 초기화
        window.addEventListener('resize', () => {
            currentIndex = 0;
            updateCarousel();
        });
    }

    // 4. 스크롤 애니메이션 (Reveal)
    function revealOnScroll() {
        const reveals = document.querySelectorAll(".reveal");
        const windowHeight = window.innerHeight;
        reveals.forEach(element => {
            if (element.getBoundingClientRect().top < windowHeight - 80) {
                element.classList.add("active");
            }
        });
    }
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // 로딩 직후 최초 실행
});
