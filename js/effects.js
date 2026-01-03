// Simplified effects without custom cursor

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
    if (typeof gsap !== 'undefined') {
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
            this.style.boxShadow = '0 20px 60px rgba(255, 173, 0, 0.15)';
            this.style.transform = 'translateY(-5px)';
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
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
