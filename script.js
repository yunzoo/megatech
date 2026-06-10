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

    // 2. 인트로 배경 슬라이더
    const heroSection = document.getElementById("intro");
    const heroDotsContainer = document.getElementById("heroDots");
    if(heroSection && heroDotsContainer) {
        const images = [
            "img/about_hq_exterior.jpg",
            "img/about_vn_exterior.jpg",
            "img/about_hq_production.jpg",
            "prod_process_0.jpg"
            "img/main_bg1.jpg",
            "img/main_bg2.jpg",
            "img/main_bg3.jpg",
            "img/main_bg4.jpg", 
            "img/main_bg5.jpg
        ];
        let heroIndex = 0;
        let slideInterval;

        images.forEach((_, index) => {
            const dot = document.createElement("div");
            dot.classList.add("hero-dot");
            if(index === 0) dot.classList.add("active");
            
            dot.addEventListener("click", () => {
                heroIndex = index;
                updateHeroSlide();
                resetInterval();
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

        updateHeroSlide();
        startInterval();
    }

    // 3. 인증서 & 제품 사진 팝업 (Lightbox)
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    
    // 🔥 수정된 부분: class 대신 고유 ID(closeImageModal)를 사용하도록 변경!
    const closeImageBtn = document.getElementById("closeImageModal"); 
    const popupImages = document.querySelectorAll(".certi-photo-grid img, .product-item img, .tour-carousel img, .org-image-wrap img");

    // 🔥 조건문에 popupImages.length > 0 추가
    if (modal && modalImg && popupImages.length > 0) {
        popupImages.forEach(img => {
            img.addEventListener("click", function() {
                modal.classList.add("active");
                modalImg.src = this.src; 
            });
        });

        // 🔥 수정된 부분: 닫기 버튼 변수명 변경
        if (closeImageBtn) {
            closeImageBtn.addEventListener("click", () => modal.classList.remove("active"));
        }
        
        modal.addEventListener("click", (e) => {
            if (e.target === modal || e.target === modalImg) {
                modal.classList.remove("active");
            }
        });
    }
    
    // 4. 만능 다중 슬라이더 엔진
    const carousels = document.querySelectorAll('.carousel-container');
    carousels.forEach(container => {
        const track = container.querySelector('.carousel-track');
        const prevBtn = container.querySelector('.prev');
        const nextBtn = container.querySelector('.next');
        if (!track || !prevBtn || !nextBtn) return;

        let currentIndex = 0;
        const updateCarousel = () => {
            const slideWidth = track.children[0].getBoundingClientRect().width + 15;
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        };
        
        nextBtn.addEventListener('click', () => {
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

    // 5. 스크롤 애니메이션
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

    // 6. 이용약관 팝업 기능 (이제 내부로 들어옴)
    const termsBtn = document.getElementById("termsBtn");
    const termsModal = document.getElementById("termsModal");
    const closeTerms = document.getElementById("closeTerms");
    
    if (termsBtn && termsModal) {
        termsBtn.addEventListener("click", (e) => {
            e.preventDefault();
            termsModal.classList.add("active");
        });
        
        if (closeTerms) {
            closeTerms.addEventListener("click", () => {
                termsModal.classList.remove("active");
            });
        }
        
        termsModal.addEventListener("click", (e) => {
            if (e.target === termsModal) {
                termsModal.classList.remove("active");
            }
        });
    }
});
