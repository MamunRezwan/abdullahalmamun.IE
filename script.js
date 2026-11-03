/* =========================
   MOBILE MENU
========================= */

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("show");

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.toggle("fa-bars", !navbar.classList.contains("show"));
            icon.classList.toggle("fa-xmark", navbar.classList.contains("show"));
        }
    });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("show");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });
    });
}


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});


/* =========================
   BACK TO TOP
========================= */

const backTop = document.getElementById("backTop");

if (backTop) {
    window.addEventListener("scroll", () => {
        backTop.classList.toggle("show", window.scrollY > 500);
    });

    backTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* =========================
   CONTACT FORM - GOOGLE APPS SCRIPT
========================= */

const contactForm = document.getElementById("contactForm");

const scriptURL = "https://script.google.com/macros/s/AKfycbxEu6nG7ofbi6_6bsrmguVj4_WxC4IJ9sn_NDC2wo6E7znYmXXP_KBkwQEpUFWXlyM/exec";

if (contactForm) {

    contactForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {
            alert("Please fill in all fields.");
            return;
        }

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const originalButtonHTML = submitButton.innerHTML;

        try {

            submitButton.disabled = true;
            submitButton.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';

            const formData = new URLSearchParams();

            formData.append("name", name);
            formData.append("email", email);
            formData.append("subject", subject);
            formData.append("message", message);

            await fetch(scriptURL, {
                method: "POST",
                mode: "no-cors",
                body: formData
            });

            alert(
                "Thank you! Your message has been submitted. " +
                "Please allow some time for email delivery."
            );

            contactForm.reset();

        } catch (error) {

            console.error("Contact Form Error:", error);

            alert(
                "Unable to submit your message. " +
                "Please try again later."
            );

        } finally {

            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonHTML;

        }

    });
}


/* =========================
   CURRENT YEAR
========================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================
   SIMPLE SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    ".service-card, .portfolio-card, .tool, .about-content, .skills-content"
);

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });

}


/* =========================
   SERVICE CARD LEARN MORE
========================= */

document.querySelectorAll('.service-card .learn-more').forEach(function(link) {

    link.addEventListener('click', function(event) {

        event.preventDefault();

        const card = this.closest('.service-card');
        const details = card.querySelector('.service-extra');

        if (!details) return;

        const isOpen = !details.hidden;

        details.hidden = isOpen;

        this.textContent = isOpen ? 'Learn More →' : 'Show Less ↑';

        this.setAttribute('aria-expanded', String(!isOpen));

    });

});
