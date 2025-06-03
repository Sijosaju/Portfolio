// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Reveal Sections on Scroll
const sections = document.querySelectorAll('section');
const revealSection = () => {
    const triggerBottom = window.innerHeight * 0.8;
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < triggerBottom) {
            section.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealSection);
revealSection();

// Animate Skill Bars on Scroll
const skillBars = document.querySelectorAll('.progress');
const animateSkillBars = () => {
    const triggerBottom = window.innerHeight * 0.9;
    skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        if (barTop < triggerBottom) {
            bar.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', animateSkillBars);

// Works Section Carousel
const carouselContainer = document.querySelector('.carousel-container');
const workCards = Array.from(document.querySelectorAll('.work-card'));
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

let currentIndex = 0;

function updateCarousel() {
    workCards.forEach((card, index) => {
        card.classList.remove('center', 'left', 'right');
        const relativeIndex = (index - currentIndex + workCards.length) % workCards.length;
        if (relativeIndex === 0) {
            card.classList.add('center');
        } else if (relativeIndex === workCards.length - 1) {
            card.classList.add('left');
        } else if (relativeIndex === 1) {
            card.classList.add('right');
        }
    });

    const offset = -currentIndex * (100 / 3);
    carouselContainer.style.transform = `translateX(${offset}%)`;
}

leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + workCards.length) % workCards.length;
    updateCarousel();
});

rightArrow.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % workCards.length;
    updateCarousel();
});

// Initialize the carousel
updateCarousel();

// Scroll Progress Indicator
const progressBar = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / height) * 100;
    progressBar.style.width = `${scrolled}%`;
});

// Scroll-to-Top Button
const scrollTopButton = document.querySelector('.scroll-top');
scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopButton.classList.add('visible');
    } else {
        scrollTopButton.classList.remove('visible');
    }
});

// Dynamic Hero Text Animation
(function() {
    const heroText = document.querySelector('.hero h1');
    const text = heroText.textContent;
    heroText.textContent = '';
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.animationDelay = `${index * 0.1}s`;
        span.classList.add('char');
        heroText.appendChild(span);
    });
})();