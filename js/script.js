// Enhanced cursor follow effect
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(2) rotate(90deg)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1) rotate(0deg)');
});

// Name typing effect + Hero stagger animations
function typeWriter(element, text, speed = 80) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Start stagger animations after typing
            setTimeout(() => triggerHeroAnimations(), 500);
        }
    }
    type();
}

function triggerHeroAnimations() {
    // Skip #bio-short to let 3s timeout handle it
    document.querySelectorAll('[class*="hero-delay-"]').forEach(el => {
        if (!el.id || el.id !== 'bio-short') {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
}

// Bio toggle functionality
// Bio toggle removed as per feedback

// Photo hover tilt effect
function initPhotoTilt() {
    const heroImageContainer = document.querySelector('.hero-image-container');
    if (heroImageContainer) {
        heroImageContainer.addEventListener('mousemove', (e) => {
            const rect = heroImageContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            heroImageContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        heroImageContainer.addEventListener('mouseleave', () => {
            heroImageContainer.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }
}

// Intersection Observer for hero reveal on scroll (fallback)
function initHeroObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '-100px 0px 0px 0px'
    };

    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('[class*="hero-delay-"]').forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, index * 150);
                });
                heroObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Name typing effect
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        typeWriter(nameElement.parentElement, nameElement.parentElement.textContent);
    }

    // initBioToggle(); // Removed as undefined
    initPhotoTilt();
    initHeroObserver();

    // Dynamic description reveal after exactly 3 seconds (as per task)
    setTimeout(() => {
        const desc = document.getElementById('bio-short');
        if (desc) {
            desc.style.display = 'block';
            desc.style.opacity = '1';
            desc.style.transform = 'translateY(0) scale(1)';
            desc.style.textShadow = '0 4px 20px rgba(255, 255, 255, 0.3)';
            desc.style.boxShadow = '0 10px 30px rgba(31, 122, 140, 0.4)';
            console.log('Bio paragraph revealed after 3 seconds - direct style override');
        }
    }, 3000);

    // Keep existing subtitle typing if needed (backup)
    const subtitles = document.querySelectorAll('.subtitle:not(.typing-text)');
    subtitles.forEach(subtitle => {
        if (subtitle.textContent.trim()) {
            setTimeout(() => typeWriter(subtitle, subtitle.textContent, 120), 2000);
        }
    });
});

// Mobile navbar toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255,255,255,0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--white)';
        navbar.style.backdropFilter = 'none';
    }
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Simple form validation
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;

    if (name && email && message) {
        // Simulate form submission
        alert('Thank you for your message! I'll get back to you soon.');
        this.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Animate on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Stats animation
const stats = document.querySelectorAll('.stat h3');
const animateStats = () => {
    stats.forEach(stat => {
        const target = stat.textContent;
        stat.textContent = '0';
        const increment = target / 100;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= parseInt(target)) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.ceil(current) + (target.includes('+') ? '+' : '');
            }
        }, 20);
    });
};

// Trigger stats animation when about section is visible
const aboutSection = document.getElementById('about');
if (aboutSection) {
    observer.observe(aboutSection);
    aboutSection.addEventListener('transitionend', () => {
        if (window.scrollY >= aboutSection.offsetTop - 200) {
            animateStats();
        }
    });
}

// Parallax effect for hero DISABLED - user requested static hero section
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const hero = document.querySelector('.hero');
//     if (hero) {
//         hero.style.transform = `translateY(${scrolled * 0.5}px)`;
//     }
// });


// Parallax effect for hero DISABLED - user requested static hero section
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const hero = document.querySelector('.hero');
//     if (hero) {
//         hero.style.transform = `translateY(${scrolled * 0.5}px)`;
//     }
// });


