/**
 * SALON RIYORA - INDEX / UI SCRIPT
 * Handles reveal animations and navbar scroll effects.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- REVEAL ANIMATIONS ---
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', reveal);
    reveal();

    // --- NAVBAR EFFECT ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (navbar && window.scrollY > 50) navbar.classList.add('scrolled');
        else if (navbar) navbar.classList.remove('scrolled');
    });
});
