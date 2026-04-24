const root = document.documentElement;
const navbar = document.getElementById('navbar');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle?.querySelector('i');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const revealItems = document.querySelectorAll('.reveal');
const projectCards = document.querySelectorAll('.project-card[data-url]');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    root.removeAttribute('data-theme');
    themeIcon?.classList.replace('fa-sun', 'fa-moon');
} else {
    root.setAttribute('data-theme', 'dark');
    themeIcon?.classList.replace('fa-moon', 'fa-sun');
}

themeToggle?.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
        root.removeAttribute('data-theme');
        themeIcon?.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        root.setAttribute('data-theme', 'dark');
        themeIcon?.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});

hamburger?.addEventListener('click', () => {
    navMenu?.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
        navMenu?.classList.remove('open');
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealItems.forEach((item) => observer.observe(item));

projectCards.forEach((card) => {
    const openCardLink = () => {
        const url = card.dataset.url;
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    card.addEventListener('click', (event) => {
        if (event.target.closest('a, button')) {
            return;
        }

        openCardLink();
    });

    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openCardLink();
        }
    });
});

window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 12);
});

navbar?.classList.toggle('scrolled', window.scrollY > 12);
