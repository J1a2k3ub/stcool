document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const mainContent = document.getElementById('main');

    // 1. Funkce pro Hamburger menu
    if (hamburger && navLinks && mainContent) {
        hamburger.addEventListener('click', () => {
            // Přepíná aktivní třídy pro zobrazení/skrytí menu a animaci ikony
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            // Posun hlavní části obsahu při otevření menu (pro mobilní zobrazení)
            mainContent.classList.toggle('menu-open'); 
        });
    }

    // 2. Implementace animace při scrollu (Intersection Observer)
    const observerOptions = {
        root: null, // Vztahuje se k viewportu
        rootMargin: '0px',
        threshold: 0.1 // Zobrazí se, jakmile je 10% elementu viditelných
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Přidá třídu 'visible', která spustí CSS animaci
                entry.target.classList.add('visible');
                // Přestane sledovat již animovaný prvek
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Sleduje všechny prvky s třídou .fade-in
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // 3. (Volitelné) Funkce pro drag-scroll galerie (pokud je na index.html)
    const gallery = document.querySelector('.gallery-container');
    if (gallery) {
        let isDown = false;
        let startX;
        let scrollLeft;

        gallery.addEventListener('mousedown', (e) => {
            isDown = true;
            gallery.classList.add('active');
            startX = e.pageX - gallery.offsetLeft;
            scrollLeft = gallery.scrollLeft;
        });

        gallery.addEventListener('mouseleave', () => {
            isDown = false;
            gallery.classList.remove('active');
        });

        gallery.addEventListener('mouseup', () => {
            isDown = false;
            gallery.classList.remove('active');
        });

        gallery.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - gallery.offsetLeft;
            const walk = (x - startX) * 2; // Rychlost scrollu
            gallery.scrollLeft = scrollLeft - walk;
        });
    }
});