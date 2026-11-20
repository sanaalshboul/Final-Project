document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    // Staggered fade-in animation for cards on page load
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 120 * (index + 1));
    });

    // Smoothly fade out the top partner intro section as the user scrolls down
    const partnerIntro = document.getElementById('partner-intro');
    const partnerContent = document.querySelector('.partner-intro-content');

    if (partnerIntro && partnerContent) {
        const handleIntroFade = () => {
            const scrollY = window.scrollY;
            const fadeDistance = partnerIntro.offsetHeight * 0.75;
            const progress = Math.min(Math.max(scrollY / fadeDistance, 0), 1);

            // Gradually reduce opacity and add a subtle upward lift
            partnerIntro.style.opacity = (1 - progress).toFixed(3);
            partnerContent.style.transform = `translateY(${(-progress * 28).toFixed(1)}px) scale(${(1 - progress * 0.04).toFixed(3)})`;
        };

        window.addEventListener('scroll', handleIntroFade, { passive: true });
        handleIntroFade();
    }

    // Keyboard shortcuts: press 1, 2, or 3 to open the corresponding lab directly
    document.addEventListener('keydown', (event) => {
        if (event.key === '1') window.location.href = 'lab1.html'; // Open Redirect (Easy)
        if (event.key === '2') window.location.href = 'lab2.html'; // ReDoS (Medium)
        if (event.key === '3') window.location.href = 'lab3.html'; // Prototype Pollution (Hard)
    });
});
