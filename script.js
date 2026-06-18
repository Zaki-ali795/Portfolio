document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // MOBILE NAV MENU TOGGLE
    // ----------------------------------------------------
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    // ----------------------------------------------------
    // SCROLLSPY (ACTIVE NAV LINK HIGH LIGHTING)
    // ----------------------------------------------------
    const sections = document.querySelectorAll('header, div.elements, footer');

    const scrollSpy = () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 150; // offset navbar height + margin

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (sectionId && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = sectionId;
            }
        });

        // If at the very top, make nothing or 'about' default active
        if (window.scrollY < 100) {
            currentSectionId = '';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                if (targetId === currentSectionId) {
                    link.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', scrollSpy);
    // Initial run on load
    scrollSpy();
    // CONTACT FORM INTERACTIVE SUBMISSION

    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnHtml = submitBtn.innerHTML;

            // Simple micro-animation state change
            submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-circle-notch fa-spin"></i>';
            submitBtn.disabled = true;

            // Simulate server network delay
            setTimeout(() => {
                // Fade out form
                contactForm.style.opacity = '0';
                contactForm.style.transform = 'translateY(-10px)';

                setTimeout(() => {
                    contactForm.classList.add('hidden');
                    formSuccess.classList.remove('hidden');
                    formSuccess.style.opacity = '0';
                    formSuccess.style.transform = 'translateY(10px)';

                    // Simple animation for success message showing up
                    setTimeout(() => {
                        formSuccess.style.transition = 'all 0.5s ease';
                        formSuccess.style.opacity = '1';
                        formSuccess.style.transform = 'translateY(0)';
                    }, 50);
                }, 300);

            }, 1500);
        });
    }
});
