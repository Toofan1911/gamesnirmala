document.addEventListener('DOMContentLoaded', () => {

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form Submission Handler
    let form = document.getElementById("gameForm");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        fetch(form.action, {
            method: "POST",
            body: new FormData(document.getElementById("gameForm"))
        })
            .then((response) => {
                if (response.ok) {
                    window.location.href = "success.html";
                }
            })
            .catch((error) => {
                console.error("Error submitting form:", error);
            })
    })
    // Scroll Reveal Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });

    // Apply observer to sections or cards
    // NOTE: styles for '.show' need to be added if we want specific enter animations
    // For now, let's just make the cards pop up
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.6s ease ${index * 0.2}s`; // Staggered delay
        observer.observe(card);
    });

    // Custom Observer callback for animation classes
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => animationObserver.observe(card));
});
