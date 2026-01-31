document.addEventListener('DOMContentLoaded', () => {
    const revealTargets = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
        revealTargets.forEach((item) => item.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    revealTargets.forEach((item) => observer.observe(item));
});
