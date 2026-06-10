document.addEventListener("DOMContentLoaded", function () {
    
    // 1. 모바일 햄버거 메뉴 (기존)
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => navMenu.classList.toggle("active"));
        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => navMenu.classList.remove("active"));
        });
    }

    // ==========================================
    // 2. 인트로 배경 슬라이더 (점 기능 추가)
    // ==========================================
    const heroSection = document.getElementById("intro");
    const heroDotsContainer = document.getElementById("heroDots");
    if(heroSection && heroDotsContainer) {
        const images = [
            "img/about_hq_exterior.jpg",
            "img/about_vn_exterior.jpg",
            "img/about_hq_production",
            "img/prod_roll_1.jpg"
        ];
        let heroIndex = 0;
        let slideInterval;

        // 점(Dots) 생성
        images.forEach((_, index) => {
            const dot = document.createElement("div");
            dot.classList.add("hero-dot");
            if(index === 0) dot.classList.add("active");
            
            // 점 클릭 시 해당 사진으로 이동
            dot.addEventListener("click", () => {
                heroIndex = index;
                updateHeroSlide();
                resetInterval(); // 클릭 후 타이머 초기화
            });
            heroDotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll(".hero-dot");

        function updateHeroSlide() {
            heroSection.style.backgroundImage = `url(${images[heroIndex]})`;
            dots.forEach(d => d.classList.remove("active"));
            dots[heroIndex].classList.add("active");
        }

        function startInterval() {
            slideInterval = setInterval(() => {
                heroIndex = (heroIndex + 1) % images.length;
                updateHeroSlide();
            }, 4000);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        updateHeroSlide(); // 초기 1회 실행
        startInterval();
    }

// ==========================================
    // 3. 인증서 & 제품 사진 팝업 (Lightbox) 통합
    // ==========================================
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const closeModal = document.querySelector(".modal-close");
    
    // 🚀 핵심 수정: 인증서 사진뿐만 아니라 제품 사진(.product-item img)도 팝업 대상으로 같이 선택해 줍니다!
    const popupImages = document.querySelectorAll(".certi-photo-grid img, .product-item img, .tour-carousel img");

    if (modal && modalImg && closeModal) {
        // 사진 클릭 시 팝업 열기
        popupImages.forEach(img => {
            img.addEventListener("click", function() {
                modal.classList.add("active");
                modalImg.src = this.src; 
            });
        });

        // X 버튼 누르면 닫기
        closeModal.addEventListener("click", () => modal.classList.remove("active"));
        
        // 배경 누르면 닫기
        modal.addEventListener("click", (e) => {
            if (e.target === modal || e.target === modalImg) {
                modal.classList.remove("active");
            }
        });
    }
    
    // ==========================================
    // 4. 만능 다중 슬라이더 엔진 (Carousel)
    // ==========================================
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(container => {
        const track = container.querySelector('.carousel-track');
        const prevBtn = container.querySelector('.prev');
        const nextBtn = container.querySelector('.next');
        if (!track || !prevBtn || !nextBtn) return;

        let currentIndex = 0;
        
        const updateCarousel = () => {
            // 하나의 슬라이드 너비 + gap(간격) 계산
            const slideWidth = track.children[0].getBoundingClientRect().width + 15;
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        };
        
        nextBtn.addEventListener('click', () => {
            // 화면에 보여지는 아이템 개수 계산
            const visibleItems = Math.floor(container.offsetWidth / track.children[0].offsetWidth);
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
        
        window.addEventListener('resize', () => {
            currentIndex = 0;
            updateCarousel();
        });
    });

    // 5. 스크롤 애니메이션 (Reveal)
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
