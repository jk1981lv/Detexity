/**
 * Detexity Website - JavaScript
 * Handles navigation, smooth scrolling, and email protection
 */

(function () {
    'use strict';

    // DOM Elements
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const emailRevealBtn = document.getElementById('email-reveal');
    const emailProtected = document.getElementById('email-protected');

    // Mobile Navigation Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Active Section Highlighting
    function updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            updateActiveSection();
        });
    });

    // Email Protection - Obfuscate email from bots
    const emailParts = {
        user: 'hello',
        domain: 'detexity',
        tld: 'com'
    };

    function constructEmail() {
        return `${emailParts.user}@${emailParts.domain}.${emailParts.tld}`;
    }

    if (emailRevealBtn && emailProtected) {
        // Update initial text
        const emailText = emailProtected.querySelector('.email-text');
        if (emailText) {
            emailText.textContent = 'Click to reveal email address';
        }

        emailRevealBtn.addEventListener('click', () => {
            const email = constructEmail();
            emailProtected.innerHTML = `
                <a href="mailto:${email}" class="email-link" style="color: var(--color-accent-light); font-family: 'SF Mono', 'Consolas', monospace; font-size: 1rem;">
                    ${email}
                </a>
            `;
        });
    }

    // Smooth scroll for anchor links (fallback for browsers without CSS scroll-behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = nav ? nav.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize
    updateActiveSection();

})();
