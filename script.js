/**
 * Maasaathuvaan Website Logic
 * Handles Mobile Menu, Animations, and Header State
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initScrollAnimations();
    initHeaderScroll();
});

/* 1. Mobile & Navigation Logic */
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const closeNav = document.querySelector('.close-nav');
    const overlay = document.querySelector('.mobile-nav-overlay');
    const links = document.querySelectorAll('.mobile-links a');

    if (!mobileToggle || !overlay) return;

    // Toggle Menu
    function toggleMenu(isOpen) {
        if (isOpen) {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    mobileToggle.addEventListener('click', () => toggleMenu(true));
    closeNav.addEventListener('click', () => toggleMenu(false));

    // Close on click outside (overlay background)
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) toggleMenu(false);
    });

    // Close on link click
    links.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });
}

/* 2. Scroll Animations (IntersectionObserver) */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully in view
    });

    animatedElements.forEach(el => observer.observe(el));

    // Stagger logic for specific containers
    document.querySelectorAll('[data-stagger-load]').forEach(container => {
        // We can use CSS nth-child delay, but JS observer is cleaner for parents
        const children = container.children;
        Array.from(children).forEach((child, index) => {
            child.style.transitionDelay = `${index * 0.1}s`;
            child.setAttribute('data-animate', 'fade-up');
            observer.observe(child);
        });
    });
}

/* 3. Header Scroll Effect */
function initHeaderScroll() {
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}
