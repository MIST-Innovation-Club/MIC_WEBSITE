let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

// Function to control next/previous buttons
function changeSlide(n) {
    showSlide(slideIndex += n);
}

// Function to control dot clicks
function currentSlide(n) {
    showSlide(slideIndex = n);
}

function showSlide(n) {
    // Loop back to start if it exceeds total slides
    if (n >= slides.length) {
        slideIndex = 0;
    }
    // Go to end if it goes below 0
    if (n < 0) {
        slideIndex = slides.length - 1;
    }
    
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show the targeted slide and dot
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}