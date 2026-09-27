// Simplified effects without custom cursor

// Respect the visitor's "reduce motion" setting: no GSAP reveals, no card lift
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Sticky Header with Hide/Show on Scroll
let lastScrollTop = 0;
const header = document.querySelector('header');
const scrollThreshold = 100;

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add scrolled class for styling
    if (scrollTop > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }

    // Hide/show header on scroll
    if (scrollTop > scrollThreshold) {
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.classList.add('header-hidden');
        } else {
            // Scrolling up
            header.classList.remove('header-hidden');
        }
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);

// GSAP Hero Animations
document.addEventListener('DOMContentLoaded', function() {
    if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Hero text reveal animation
        const heroContent = document.querySelector('.hero-content');
        const heroH1 = heroContent.querySelector('h1');
        const heroP = heroContent.querySelector('p');
        const heroButtons = heroContent.querySelector('.cta-buttons');
        const scrollIndicator = document.querySelector('.scroll-indicator');

        // Set initial states
        gsap.set([heroH1, heroP, heroButtons, scrollIndicator], {
            opacity: 0,
            y: 30
        });

        // Create timeline for sequential animations
        const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

        heroTimeline
            .to(heroH1, {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.3
            })
            .to(heroP, {
                opacity: 1,
                y: 0,
                duration: 0.8
            }, '-=0.5')
            .to(heroButtons, {
                opacity: 1,
                y: 0,
                duration: 0.8
            }, '-=0.6')
            .to(scrollIndicator, {
                opacity: 1,
                y: 0,
                duration: 0.6
            }, '-=0.4');

        // Section animations on scroll
        gsap.utils.toArray('.section').forEach((section, i) => {
            const sectionTitle = section.querySelector('.section-title');
            const sectionSubtitle = section.querySelector('.section-subtitle');

            if (sectionTitle) {
                gsap.from(sectionTitle, {
                    scrollTrigger: {
                        trigger: sectionTitle,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    ease: 'power3.out'
                });
            }

            if (sectionSubtitle) {
                gsap.from(sectionSubtitle, {
                    scrollTrigger: {
                        trigger: sectionSubtitle,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 0,
                    y: 20,
                    duration: 0.8,
                    delay: 0.2,
                    ease: 'power3.out'
                });
            }
        });

        // Animate service cards
        gsap.utils.toArray('.service-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                delay: i * 0.1,
                ease: 'power3.out'
            });
        });

        // Animate stat cards
        gsap.utils.toArray('.stat-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                scale: 0.9,
                y: 30,
                duration: 0.8,
                delay: i * 0.1,
                ease: 'back.out(1.2)'
            });
        });

        // Animate pricing cards
        gsap.utils.toArray('.pricing-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                delay: i * 0.15,
                ease: 'power3.out'
            });
        });
    }
});

// Card Glow Effects
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.service-card, .portfolio-item, .pricing-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.boxShadow = '0 20px 60px color-mix(in srgb, var(--heather) 15%, transparent)';
            if (!prefersReducedMotion) this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            this.style.transform = '';
        });

        // Glow follow mouse
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.style.setProperty('--mouse-x', x + 'px');
            this.style.setProperty('--mouse-y', y + 'px');
        });
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth',
                block: 'start'
            });
        }
    });
});

// Portfolio Carousel Controls
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.portfolio-track');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    if (!track || !prevBtn || !nextBtn) return;

    let currentScroll = 0;
    const scrollAmount = 520; // card width (500px) + gap (20px)

    function updateCarousel(direction) {
        // Pause animation
        track.style.animationPlayState = 'paused';

        // Calculate new scroll position
        currentScroll += direction * scrollAmount;

        // Apply transform
        track.style.transform = `translateX(${currentScroll}px)`;

        // Resume animation after a delay
        setTimeout(() => {
            track.style.animationPlayState = 'running';
            track.style.transform = '';
            currentScroll = 0;
        }, 300);
    }

    prevBtn.addEventListener('click', () => updateCarousel(1));
    nextBtn.addEventListener('click', () => updateCarousel(-1));
});

// Contact Form and Newsletter Handling
// Messages always pair colour with an icon and words (status tokens in tokens.css).
const STATUS_ICONS = {
    success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 12.5l5 5L20 6.5"/></svg>',
    error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 3.5L2.5 20h19L12 3.5z"/><path d="M12 10v4.5"/><path d="M12 17.5h.01"/></svg>'
};

const EMAIL_LINK = '<a href="mailto:karl@360school.co.uk">karl@360school.co.uk</a>';

const FIELD_HINTS = {
    name: 'Please enter your name.',
    school: 'Please enter your school\'s name.',
    email: 'Please enter your email address.',
    interest: 'Please choose what you\'re interested in.'
};

function showStatus(statusEl, type, messageHtml) {
    statusEl.className = 'form-status ' + type;
    statusEl.setAttribute('role', type === 'error' ? 'alert' : 'status');
    statusEl.innerHTML = STATUS_ICONS[type] + '<p>' + messageHtml + '</p>';
}

function clearStatus(statusEl) {
    statusEl.className = 'form-status';
    statusEl.removeAttribute('role');
    statusEl.innerHTML = '';
}

function hintFor(field) {
    if (field.type === 'email' && field.value.trim() !== '' && field.validity.typeMismatch) {
        return 'That email address doesn\'t look right. Please check it.';
    }
    return FIELD_HINTS[field.name] || 'Please fill in this field.';
}

// Mark or unmark one field: danger border (CSS) plus a text hint underneath
function setFieldError(field, message) {
    const hintId = field.id + '-hint';
    let hint = document.getElementById(hintId);

    if (message) {
        field.setAttribute('aria-invalid', 'true');
        if (!hint) {
            hint = document.createElement('p');
            hint.className = 'field-hint';
            hint.id = hintId;
            // In the newsletter row the hint sits under the whole row, before the message
            const statusEl = field.form.querySelector('.form-status');
            if (field.form.classList.contains('newsletter-form')) {
                field.form.insertBefore(hint, statusEl);
            } else {
                field.insertAdjacentElement('afterend', hint);
            }
        }
        hint.textContent = message;
        field.setAttribute('aria-describedby', hintId);
    } else {
        field.removeAttribute('aria-invalid');
        field.removeAttribute('aria-describedby');
        if (hint) hint.remove();
    }
}

// Check every field; returns the first invalid one (or null)
function validateForm(form) {
    let firstInvalid = null;
    form.querySelectorAll('input:not([type="hidden"]), select, textarea').forEach(field => {
        const valid = field.checkValidity();
        setFieldError(field, valid ? null : hintFor(field));
        if (!valid && !firstInvalid) firstInvalid = field;
    });
    return firstInvalid;
}

// Clear a field's error as soon as it becomes valid
function watchFields(form) {
    const recheck = e => {
        const field = e.target;
        if (field.getAttribute('aria-invalid') === 'true' && field.checkValidity()) {
            setFieldError(field, null);
        }
    };
    form.addEventListener('input', recheck);
    form.addEventListener('change', recheck);
}

async function postForm(form) {
    const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) throw new Error('Form submission failed');
}

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');

    if (contactForm) {
        const formStatus = document.getElementById('formStatus');
        const errorMessage = 'Not sent. Please check the highlighted fields, or email ' + EMAIL_LINK + '.';
        watchFields(contactForm);

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            clearStatus(formStatus);

            const firstInvalid = validateForm(this);
            if (firstInvalid) {
                showStatus(formStatus, 'error', errorMessage);
                firstInvalid.focus();
                return;
            }

            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                await postForm(this);
                showStatus(formStatus, 'success', 'Message sent. Thank you, Karl will be in touch.');
                this.reset();
            } catch (error) {
                showStatus(formStatus, 'error', errorMessage);
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    if (newsletterForm) {
        const newsletterStatus = document.getElementById('newsletterStatus');
        const errorMessage = 'Not subscribed. Please check your email address, or email ' + EMAIL_LINK + '.';
        watchFields(newsletterForm);

        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            clearStatus(newsletterStatus);

            const firstInvalid = validateForm(this);
            if (firstInvalid) {
                showStatus(newsletterStatus, 'error', errorMessage);
                firstInvalid.focus();
                return;
            }

            const submitBtn = this.querySelector('.btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;

            try {
                await postForm(this);
                showStatus(newsletterStatus, 'success', 'Subscribed. Thank you, you\'re on the list.');
                this.reset();
            } catch (error) {
                showStatus(newsletterStatus, 'error', errorMessage);
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});
