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

    // Keyboard shortcuts: press 1, 2, or 3 to open the corresponding lab directly
    document.addEventListener('keydown', (event) => {
        if (event.key === '1') window.location.href = 'lab2.html';
        if (event.key === '2') window.location.href = 'lab1.html';
        if (event.key === '3') window.location.href = 'lab3.html';
    });
});