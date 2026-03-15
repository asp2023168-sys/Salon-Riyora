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
            e.preventDefault();

            // Extract Values
            const name = document.getElementById('name')?.value;
            const email = document.getElementById('email')?.value;
            const phone = document.getElementById('phone')?.value;
            const serviceText = serviceSelect ? serviceSelect.options[serviceSelect.selectedIndex].text : '';
            const date = dateInput?.value;
            const time = document.getElementById('time')?.value;
            const notes = document.getElementById('notes')?.value;

            // Manual Validation
            if (!name || !email || !phone || !date || !time || !serviceSelect.value) {
                alert("Please complete all required fields.");
                return;
            }

            // Update Success Modal with Manual Details
            const modalTitle = document.getElementById('confirmationTitle');
            const modalMsg = document.getElementById('confirmationMessage');

            if (modalTitle) modalTitle.innerHTML = "Booking Confirmed!";
            if (modalMsg) {
                modalMsg.innerHTML = `
                    <div class="text-start p-4 bg-dark border border-gold rounded mt-3">
                        <p class="mb-2"><i class="fas fa-user-circle text-gold me-2"></i><strong>Client:</strong> ${name}</p>
                        <p class="mb-2"><i class="fas fa-envelope text-gold me-2"></i><strong>Email:</strong> ${email}</p>
                        <p class="mb-2"><i class="fas fa-cut text-gold me-2"></i><strong>Service:</strong> ${serviceText}</p>
                        <p class="mb-2"><i class="fas fa-calendar-check text-gold me-2"></i><strong>Schedule:</strong> ${date} at ${time}</p>
                        <p class="mb-0 text-white-50 small mt-2">${notes ? `* Note: ${notes}` : ''}</p>
                    </div>
                    <p class="mt-4 mb-0">We will call you at <strong>${phone}</strong> shortly to confirm.</p>
                `;
            }

            // Show confirmation modal
            const modalEl = document.getElementById('confirmationModal');
            if (modalEl) {
                const myModal = new bootstrap.Modal(modalEl);
                myModal.show();
                bookingForm.reset();
            }
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
