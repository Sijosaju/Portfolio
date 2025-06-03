// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.classList.add('hidden');
        document.body.classList.add('loaded');
    }, 1000); // Reduced delay for faster loading
});

// Particle Background
const particlesContainer = document.getElementById('particles');
const particles = [];
const numParticles = 50; // Reduced number of particles

function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.width = '5px';
    particle.style.height = '5px';
    particle.style.position = 'absolute';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = Math.random() * 100 + 'vh';
    particle.velocityX = (Math.random() - 0.5) * 0.2; // Slower velocity
    particle.velocityY = (Math.random() - 0.5) * 0.2;
    particlesContainer.appendChild(particle);
    particles.push(particle);
}

function animateParticles() {
    particles.forEach(particle => {
        let x = parseFloat(particle.style.left);
        let y = parseFloat(particle.style.top);
        x += particle.velocityX;
        y += particle.velocityY;

        if (x < 0 || x > 100) particle.velocityX *= -1;
        if (y < 0 || y > 100) particle.velocityY *= -1;

        particle.style.left = x + 'vw';
        particle.style.top = y + 'vh';
    });
    requestAnimationFrame(animateParticles);
}

for (let i = 0; i < numParticles; i++) {
    createParticle();
}
animateParticles();

// GSAP Scroll Animations (Ensure GSAP is loaded)
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hero Section Animations
    gsap.from(".hero-title", {
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: "power4.out",
        onStart: function() {
            gsap.to(".hero-title", {
                text: { value: "Hey, I'm [Your Name]" },
                duration: 1.2,
                ease: "none",
                onComplete: () => {
                    document.querySelector('.hero-title').classList.add('loaded');
                }
            });
        }
    });

    gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        onComplete: () => {
            document.querySelector('.hero-subtitle').classList.add('loaded');
        }
    });

    gsap.from(".hero-buttons .btn", {
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        delay: 0.6,
        stagger: 0.2,
        ease: "elastic.out(1, 0.5)"
    });

    gsap.from(".hero-visual", {
        opacity: 0,
        scale: 0.3,
        duration: 1.2,
        delay: 0.3,
        ease: "elastic.out(1, 0.5)"
    });

    gsap.from(".scroll-down", {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.9,
        ease: "power3.out"
    });

    // Section Title Animations
    document.querySelectorAll('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 100,
            duration: 1.2,
            ease: "power4.out",
            onStart: function() {
                gsap.to(title, {
                    text: { value: title.textContent },
                    duration: 1.2,
                    ease: "none",
                    onComplete: () => {
                        title.classList.add('loaded');
                    }
                });
            }
        });
    });

    // About Section Animations
    gsap.from(".about-text p", {
        scrollTrigger: {
            trigger: ".about-content",
            start: "top 80%"
        },
        opacity: 0,
        x: -100,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
    });

    gsap.from(".about-image p", {
        scrollTrigger: {
            trigger: ".about-content",
            start: "top 80%"
        },
        opacity: 0,
        scale: 0.7,
        duration: 1,
        ease: "back.out(1.7)"
    });

    // Services Animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
            },
            opacity: 0,
            y: 150,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out"
        });
    });

    // Contact Section Animations
    gsap.from(".contact-item", {
        scrollTrigger: {
            trigger: ".contact-content",
            start: "top 80%"
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
    });

    gsap.from(".contact-form", {
        scrollTrigger: {
            trigger: ".contact-content",
            start: "top 80%"
        },
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: "power3.out"
    });

    gsap.from(".form-group", {
        scrollTrigger: {
            trigger: ".contact-form",
            start: "top 80%"
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out"
    });

    gsap.from(".contact-form .btn", {
        scrollTrigger: {
            trigger: ".contact-form",
            start: "top 80%"
        },
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        delay: 0.3,
        ease: "elastic.out(1, 0.5)"
    });

    // Footer Animation
    gsap.from(".footer p", {
        scrollTrigger: {
            trigger: ".footer",
            start: "top 90%"
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out"
    });

    // Interactive Hover Effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, { scale: 1.1, duration: 0.3, ease: "power2.out" });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, { y: -5, duration: 0.3, ease: "power2.out" });
        });
        link.addEventListener('mouseleave', () => {
            gsap.to(link, { y: 0, duration: 0.3, ease: "power2.out" });
        });
    });

    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { scale: 1.05, duration: 0.5, ease: "power3.out" });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { scale: 1, duration: 0.5, ease: "power3.out" });
        });
    });

    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, { x: 25, duration: 0.5, ease: "power3.out" });
        });
        item.addEventListener('mouseleave', () => {
            gsap.to(item, { x: 0, duration: 0.5, ease: "power3.out" });
        });
    });

    // Navigation Active Class
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
                const id = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            },
            onEnterBack: () => {
                const id = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Works Section with Roll Transition (Ensure Swiper is loaded)
if (typeof Swiper !== 'undefined') {
    const worksLoading = document.getElementById('works-loading');
    const swiperContainer = document.getElementById('swiper-container');

    // Simulate loading delay for Works section
    setTimeout(() => {
        worksLoading.classList.add('hidden');
        swiperContainer.style.display = 'block';

        const swiper = new Swiper('.swiper-container', {
            loop: true,
            loopedSlides: 4,
            slidesPerView: 3,
            centeredSlides: true,
            spaceBetween: 30,
            grabCursor: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            speed: 800,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            }
        });

        // Works Card Initial Animation
        if (typeof gsap !== 'undefined') {
            gsap.from(".swiper-slide", {
                scrollTrigger: {
                    trigger: ".swiper-container",
                    start: "top 80%"
                },
                opacity: 0,
                scale: 0.5,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            });
        }
    }, 1000); // Reduced delay for faster loading
}

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    if (navMenu.classList.contains('active') && typeof gsap !== 'undefined') {
        gsap.from(".nav-item", {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out"
        });
    }
});

// Form Submission Handling
window.handleSubmit = function() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if (name && email && subject && message) {
        alert(`Message Sent!\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`);
        if (typeof gsap !== 'undefined') {
            gsap.to(".contact-form", {
                opacity: 0,
                scale: 0.5,
                duration: 0.5,
                ease: "power3.in",
                onComplete: () => {
                    document.querySelector('.contact-form').reset();
                    gsap.to(".contact-form", {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: "power3.out"
                    });
                }
            });
        } else {
            document.querySelector('.contact-form').reset();
        }
    } else {
        alert('Please fill in all fields.');
    }
};