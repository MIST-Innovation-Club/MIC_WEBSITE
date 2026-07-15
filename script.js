/* =========================================================
   MIST Innovation Club — Shared Script
   ========================================================= */

/* ---------- Mobile nav toggle ---------- */
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (toggle && links) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('open');
            links.classList.toggle('open');
        });
        links.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                toggle.classList.remove('open');
                links.classList.remove('open');
            });
        });
    }

    buildFooterCalendar();
    initYearTabs();
    initGalleryCarousels();
});

/* ---------- Featured slider (home page) ---------- */
let slideIndex = 0;
function changeSlide(n) {
    const slides = document.querySelectorAll('.featured-section .slide');
    if (!slides.length) return;
    showSlide(slideIndex += n);
}
function currentSlide(n) {
    showSlide(slideIndex = n);
}
function showSlide(n) {
    const slides = document.querySelectorAll('.featured-section .slide');
    const dots = document.querySelectorAll('.featured-section .dot');
    if (!slides.length) return;
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[slideIndex].classList.add('active');
    if (dots[slideIndex]) dots[slideIndex].classList.add('active');
}

/* ---------- Dynamic footer calendar ---------- */
function buildFooterCalendar() {
    const container = document.querySelector('.footer-calendar');
    if (!container) return;

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const dow = ['S','M','T','W','T','F','S'];

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let html = `
        <div class="footer-calendar-header">
            <span><span class="cal-month">${monthNames[month]}</span> <span class="cal-year">${year}</span></span>
        </div>
        <div class="footer-calendar-grid">
    `;
    dow.forEach(d => html += `<div class="cal-dow">${d}</div>`);
    for (let i = 0; i < firstDay; i++) html += `<div class="cal-day empty"></div>`;
    for (let d = 1; d <= daysInMonth; d++) {
        const isToday = d === now.getDate();
        html += `<div class="cal-day${isToday ? ' today' : ''}">${d}</div>`;
    }
    html += `</div>`;
    container.innerHTML = html;
}

/* ---------- Year tab filtering (Gallery / People) ---------- */
function initYearTabs() {
    const tabs = document.querySelectorAll('.year-tab');
    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const year = tab.dataset.year;
            document.querySelectorAll('[data-year-content]').forEach(section => {
                section.style.display = (section.dataset.yearContent === year) ? '' : 'none';
            });
        });
    });
}

/* ---------- Gallery carousels (per event) ---------- */
function initGalleryCarousels() {
    document.querySelectorAll('.gallery-event').forEach(eventBlock => {
        const mainImgs = eventBlock.querySelectorAll('.gallery-main-slot');
        const dots = eventBlock.querySelectorAll('.gallery-dots .dot');
        if (mainImgs.length < 2) return;

        let idx = 0;
        const show = (n) => {
            if (n >= mainImgs.length) n = 0;
            if (n < 0) n = mainImgs.length - 1;
            idx = n;
            mainImgs.forEach(el => el.style.display = 'none');
            mainImgs[idx].style.display = 'block';
            dots.forEach(d => d.classList.remove('active'));
            if (dots[idx]) dots[idx].classList.add('active');
        };

        dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));

        let auto = setInterval(() => show(idx + 1), 4500);
        eventBlock.addEventListener('mouseenter', () => clearInterval(auto));
        eventBlock.addEventListener('mouseleave', () => { auto = setInterval(() => show(idx + 1), 4500); });

        show(0);
    });
}


document.addEventListener("DOMContentLoaded", () => {
    const events = document.querySelectorAll(".gallery-event");

    events.forEach((eventSection) => {
        const mainImg = eventSection.querySelector(".gallery-main img");
        const leftImg = eventSection.querySelector(".left-peek img");
        const rightImg = eventSection.querySelector(".right-peek img");
        const dots = eventSection.querySelectorAll(".gallery-dots .dot");

        // Array of your real image paths for this specific event section
        // Add your actual image paths here in order
        const images = [
            mainImg?.getAttribute("src") || "",
            leftImg?.getAttribute("src") || "",
            rightImg?.getAttribute("src") || "",
            // You can add more paths here if you have 6-7 photos per event
        ].filter(src => src !== ""); 

        let currentIndex = 0;

        function updateCarousel(index) {
            if (images.length === 0) return;
            
            currentIndex = index;

            // Calculate loop indices for side previews
            const leftIndex = (currentIndex - 1 + images.length) % images.length;
            const rightIndex = (currentIndex + 1) % images.length;

            // Update image sources
            if (mainImg) mainImg.src = images[currentIndex];
            if (leftImg) leftImg.src = images[leftIndex];
            if (rightImg) rightImg.src = images[rightIndex];

            // Update active dot class
            dots.forEach((dot, idx) => {
                if (idx === currentIndex) {
                    dot.classList.add("active");
                } else {
                    dot.classList.remove("active");
                }
            });
        }

        // Click event for dots
        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                if (index < images.length) {
                    updateCarousel(index);
                }
            });
        });

        // Click side images to slide left or right
        eventSection.querySelector(".left-peek")?.addEventListener("click", () => {
            const newIndex = (currentIndex - 1 + images.length) % images.length;
            updateCarousel(newIndex);
        });

        eventSection.querySelector(".right-peek")?.addEventListener("click", () => {
            const newIndex = (currentIndex + 1) % images.length;
            updateCarousel(newIndex);
        });
    });
});