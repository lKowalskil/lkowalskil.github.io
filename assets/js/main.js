(function () {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('site-menu');
    const yearEl = document.getElementById('current-year');

    if (yearEl) {
        yearEl.textContent = new Date().getFullYear().toString();
    }

    if (!toggle || !menu) {
        return;
    }

    // Simple accessible toggle for the mobile navigation menu.
    toggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', isOpen.toString());
    });

    menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            if (menu.classList.contains('is-open')) {
                menu.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
})();
