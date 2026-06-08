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

    // 2. 인트로 배경 이미지 슬라이더 (4초마다 부드럽게 전환)
    const heroSection = document.getElementById("intro");
    if(heroSection) {
        // img 폴더에 맞춰 올려두신 사진들 배열
        const images = [
            "img/about_hq_exterior.jpg",
            "img/about_vn_exterior.jpg",
            "img/proc_equipment.jpg",
            "img/prod_roll_1.jpg"
        ];
        let currentIndex = 0;
        
        // 초기 배경 설정
        heroSection.style.backgroundImage = `url(${images[0]})`;
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            heroSection.style.backgroundImage = `url(${images[currentIndex]})`;
        }, 4000);
    }

    // 3. 스크롤 애니메이션
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
    revealOnScroll();
});
