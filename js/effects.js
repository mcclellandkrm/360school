// Simplified effects without custom cursor

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
