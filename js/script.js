/**
 * SALON RIYORA - CLIENT BOOKING SCRIPT
 * Handles manual booking form interactions and validation.
 */

document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');
    const serviceSelect = document.getElementById('service');
    const dateInput = document.getElementById('date');

    // 1. Set Min Date to Today (Prevent past bookings)
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // 2. Handle Service Pre-selection from URL (e.g. ?service=hair)
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (serviceParam && serviceSelect) {
        serviceSelect.value = serviceParam;
    }

    // 3. Handle Form Submission
    if (bookingForm) {
        bookingForm.onsubmit = function (e) {
            // Extract Values
            const name = document.getElementById('name')?.value;
            const email = document.getElementById('email')?.value;
            const phone = document.getElementById('phone')?.value;
            const date = dateInput?.value;
            const time = document.getElementById('time')?.value;

            // Manual Validation
            if (!name || !email || !phone || !date || !time || !serviceSelect.value) {
                e.preventDefault(); // Prevent submission only if validation fails
                alert("Please complete all required fields.");
                return;
            }

            // If validation passes, the form will submit natively to booking_process.php
            // We no longer manually show the modal here because PHP will redirect back with a success message.
        };
    }

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
