document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = [];

    navLinks.forEach(link => {
        const id = link.getAttribute("href").substring(1);
        const section = document.getElementById(id);
        if (section) sections.push({ id, link, section });
    });

    function setActive(id) {
        navLinks.forEach(l => {
            const isActive = l.getAttribute("href") === "#" + id;
            l.classList.toggle("active", isActive);
            if (isActive) l.setAttribute("aria-current", "true");
            else l.removeAttribute("aria-current");
        });
    }

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setActive(entry.target.id);
            });
        }, { rootMargin: "-40% 0px -55% 0px" });

        sections.forEach(s => observer.observe(s.section));
    }
});