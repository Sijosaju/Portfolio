// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Navbar Background and Active Link on Scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section, header');
    let currentSection = '';

    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Reveal Elements on Scroll
const sections = document.querySelectorAll('section');
const elementsToReveal = document.querySelectorAll('.hero h1, .hero p, .section-intro, h2, .about-description, .tech-stack h3, .tech-bubble, .about-card, .service-card, .skill-bar, .testimonials h3, .testimonial-card, #career h2, .career-item');
const aboutPhoto = document.querySelector('.about-photo .photo-placeholder');
let hasShaken = false; // Flag to track if shake animation has played

// Add visible class to home page components on load and trigger shake if About is in view
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('header').classList.add('visible');
    document.querySelector('nav').classList.add('visible');
    document.querySelector('.logo').classList.add('visible');
    document.querySelector('.social-media').classList.add('visible');
    document.querySelector('.hero').classList.add('visible');
    document.querySelector('.cta-buttons').classList.add('visible');
    document.querySelector('.scroll-down').classList.add('visible');

    // Check if About section is in view on load
    const triggerBottom = window.innerHeight * 0.9;
    const aboutPhotoTop = aboutPhoto.getBoundingClientRect().top;
    if (aboutPhotoTop < triggerBottom && !hasShaken) {
        aboutPhoto.classList.add('visible', 'shake');
        hasShaken = true;
    }
});

const revealElements = () => {
    const triggerBottom = window.innerHeight * 0.9;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < triggerBottom) {
            section.classList.add('visible');
        } else {
            section.classList.remove('visible');
        }
    });

    elementsToReveal.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < triggerBottom) {
            element.classList.add('visible');
        } else {
            element.classList.remove('visible');
        }
    });

    // Handle About photo animation
    const aboutPhotoTop = aboutPhoto.getBoundingClientRect().top;
const isInView = aboutPhotoTop < triggerBottom && aboutPhotoTop > 0;

if (isInView) {
  if (!aboutPhoto.classList.contains('shake-in-progress')) {
    // Prevent repeat during same scroll
    aboutPhoto.classList.remove('float'); // Stop float
    aboutPhoto.classList.add('shake-once', 'shake-in-progress');

    setTimeout(() => {
      aboutPhoto.classList.remove('shake-once');
      aboutPhoto.classList.add('float'); // Resume float after shake
    }, 600); // duration of shake

    // Allow it to shake again on next scroll in
    setTimeout(() => {
      aboutPhoto.classList.remove('shake-in-progress');
    }, 1500);
  }
}




};

window.addEventListener('scroll', revealElements);
revealElements();

// Animate Skill Bars on Scroll
const skillBars = document.querySelectorAll('.progress');
const animateSkillBars = () => {
    const triggerBottom = window.innerHeight * 0.9;
    skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        if (barTop < triggerBottom) {
            bar.classList.add('visible');
        } else {
            bar.classList.remove('visible');
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
let autoSlideInterval;

function initializeCarousel() {
    workCards.forEach((card, index) => {
        if (index === 0) {
            card.classList.add('center');
            card.style.opacity = '1';
            card.style.transform = 'translateX(0) scale(1)';
        } else if (index === workCards.length - 1) {
            card.classList.add('left');
            card.style.opacity = '0.7';
            card.style.transform = 'translateX(-60%) scale(0.9)';
        } else if (index === 1) {
            card.classList.add('right');
            card.style.opacity = '0.7';
            card.style.transform = 'translateX(60%) scale(0.9)';
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateX(120%) scale(0.8)';
        }
    });
}

function updateCarousel(direction) {
    workCards.forEach(card => {
        card.classList.remove('center', 'left', 'right');
    });

    const totalCards = workCards.length;
    if (direction === 'right') {
        currentIndex = (currentIndex + 1) % totalCards;
    } else {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    }

    const leftIndex = (currentIndex - 1 + totalCards) % totalCards;
    const rightIndex = (currentIndex + 1) % totalCards;

    workCards.forEach((card, index) => {
        if (index === currentIndex) {
            card.classList.add('center');
            card.style.opacity = '1';
            card.style.transform = 'translateX(0) scale(1)';
        } else if (index === leftIndex) {
            card.classList.add('left');
            card.style.opacity = '0.7';
            card.style.transform = 'translateX(-60%) scale(0.9)';
        } else if (index === rightIndex) {
            card.classList.add('right');
            card.style.opacity = '0.7';
            card.style.transform = 'translateX(60%) scale(0.9)';
        } else {
            card.style.opacity = '0';
            if (direction === 'right') {
                card.style.transform = 'translateX(120%) scale(0.8)';
            } else {
                card.style.transform = 'translateX(-120%) scale(0.8)';
            }
        }
    });
}

function moveLeft() {
    clearInterval(autoSlideInterval);
    updateCarousel('left');
    startAutoSlide();
}

function moveRight() {
    clearInterval(autoSlideInterval);
    updateCarousel('right');
    startAutoSlide();
}

leftArrow.addEventListener('click', moveLeft);
rightArrow.addEventListener('click', moveRight);

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        moveRight();
    }, 3000);
}

initializeCarousel();
startAutoSlide();

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

// Dynamic Text Typewriter Animation
(function() {
    const dynamicText = document.querySelector('.dynamic-text');
    const texts = ['Front End Developer', 'Back End Developer','Flutter App Developer','Web Designer'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        if (!isDeleting) {
            dynamicText.textContent = currentText.substring(0, charIndex++);
            if (charIndex > currentText.length) {
                isDeleting = true;
                setTimeout(type, 1000);
                return;
            }
        } else {
            dynamicText.textContent = currentText.substring(0, charIndex--);
            if (charIndex < 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 500);
                return;
            }
        }
        setTimeout(type, isDeleting ? 50 : 100);
    }

    setTimeout(type, 1000);
})();

const cursorFollower = document.querySelector('.cursor-follower');

if (cursorFollower && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursorFollower.style.left = `${e.clientX}px`;
        cursorFollower.style.top = `${e.clientY}px`;
        cursorFollower.style.opacity = '1';
    });

    const interactiveElements = document.querySelectorAll('a, button, .nav-link, .social-icon, .cta-button, .carousel-arrow, .scroll-top, .tech-bubble, .work-card, .testimonial-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('hover');
        });
        element.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('hover');
        });
    });
}


const interactiveElements = document.querySelectorAll('a, button, .nav-link, .social-icon, .cta-button, .carousel-arrow, .scroll-top, .tech-bubble, .work-card, .testimonial-card');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorFollower.classList.add('hover');
    });
    element.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('hover');
    });
});
// Animate the vertical line in career section like a meteor
const careerContainer = document.querySelector('.career-container');
window.addEventListener('scroll', () => {
  const rect = careerContainer.getBoundingClientRect();
  const trigger = window.innerHeight * 0.9;

  if (rect.top < trigger) {
    careerContainer.classList.add('visible');
  } else {
    careerContainer.classList.remove('visible');
  }
});
// ✅ Toggle mobile menu open/close
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  menuToggle.classList.toggle('open');
});

const socialToggle = document.getElementById('socialToggle');
const socialIcons = document.getElementById('socialIcons');

if (socialToggle && socialIcons) {
    socialToggle.addEventListener('click', () => {
        socialIcons.classList.toggle('open');
    });
}


  document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);

    try {
      const response = await fetch("https://formsubmit.co/ajax/your@email.com", {
        method: "POST",
        headers: { 'Accept': 'application/json' },
        body: formData
      });

      if (response.ok) {
        alert("✅ Message sent successfully!");
        form.reset();
      } else {
        alert("❌ Failed to send message. Please try again.");
      }
    } catch (error) {
      alert("⚠️ Error sending message. Check your internet or try again.");
    }
  });
  document.addEventListener("DOMContentLoaded", () => {
  const bubbles = document.querySelectorAll('.tech-bubble');
  bubbles.forEach(bubble => {
    const duration = 3 + Math.random() * 3; // 3s–6s
    const delay = Math.random() * 3;        // 0s–3s
    bubble.style.animationDuration = `${duration}s`;
    bubble.style.animationDelay = `${delay}s`;
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const techBubbles = document.querySelectorAll('.tech-bubble');
  techBubbles.forEach(bubble => {
    const container = document.querySelector('.tech-bubbles');
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Random position
    const x = Math.random() * (containerWidth - 100);
    const y = Math.random() * (containerHeight - 50);

    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;

    // Random animation delay & duration
    const delay = Math.random() * 5;
    const duration = 4 + Math.random() * 4;
    bubble.style.animationDelay = `${delay}s`;
    bubble.style.animationDuration = `${duration}s`;
  });
});



