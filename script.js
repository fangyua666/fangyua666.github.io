document.addEventListener('DOMContentLoaded', () => {
    const topBar = document.querySelector('.top-bar');
    const navLinks = document.querySelectorAll('.top-nav a');

    const getOffset = () => {
        if (!topBar) return 0;
        const styles = window.getComputedStyle(topBar);
        const isSticky = styles.position === 'sticky' || styles.position === 'fixed';
        return isSticky ? topBar.getBoundingClientRect().height + 12 : 0;
    };

    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            const targetId = link.getAttribute('href');
            if (!targetId || !targetId.startsWith('#')) return;

            const targetSection = document.querySelector(targetId);
            if (!targetSection) return;

            event.preventDefault();
            const targetTop = targetSection.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: Math.max(0, targetTop - getOffset()),
                behavior: 'smooth'
            });
        });
    });

    const sections = document.querySelectorAll('main section');
    const linkMap = new Map();

    navLinks.forEach(link => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            if (!linkMap.has(targetId)) {
                linkMap.set(targetId, []);
            }
            linkMap.get(targetId).push(link);
        }
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const id = `#${entry.target.id}`;
                linkMap.forEach(links => links.forEach(l => l.classList.remove('active')));
                if (linkMap.has(id)) {
                    linkMap.get(id).forEach(link => link.classList.add('active'));
                }
            }
        });
    }, {
        root: null,
        threshold: 0.2
    });

    sections.forEach(section => observer.observe(section));

    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 280) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});