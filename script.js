document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    // تأثير ظهور متدرج للبطاقات عند تحميل الصفحة
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 120 * (index + 1));
    });

    // ميزة إضافية: الضغط على الأرقام (1، 2، 3) في الكيبورد يفتح المختبر مباشرة
    document.addEventListener('keydown', (event) => {
        if (event.key === '1') window.location.href = 'lab1.html';
        if (event.key === '2') window.location.href = 'lab2.html';
        if (event.key === '3') window.location.href = 'lab3.html';
    });
});