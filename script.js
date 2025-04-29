// FORM VALIDATION
const form = document.getElementById('form');
const errorMessage = document.getElementById('error-message');
const confirmationMessage = document.getElementById('confirmation-message');

// Basic validation before submission
form.addEventListener('submit', (event) => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Check for empty fields
    if (!name || !email || !message) {
        event.preventDefault(); // Block submission if errors exist
        errorMessage.textContent = 'Llena todos los campos 😤';
        errorMessage.style.display = 'block'; // Show error message
        confirmationMessage.style.display = 'none'; // Hide confirmation
        return;
    }

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        event.preventDefault(); // Block submission if invalid email
        errorMessage.textContent = 'Por favor, ingresa un correo válido bro :p';
        errorMessage.style.display = 'block'; // Show error message
        confirmationMessage.style.display = 'none'; // Hide confirmation
        return;
    }

    // Display confirmation message
    errorMessage.style.display = 'none';
    confirmationMessage.textContent = `Gracias por tu mensaje, ${name}. Te responderé pronto :3`;
    confirmationMessage.style.display = 'block';
});

// TRANSLATION CONTENT
const i18n = {
    es: {
        welcome: "¡Bienvenido!",
        role: "Programador",
        "nav-about": "Sobre mí",
        "nav-skills": "Habilidades",
        "nav-projects": "Proyectos",
        "nav-contact": "Contacto",
        about: "Sobre mí",
        "about-text": "Soy un programador apasionado por la tecnología y el desarrollo de software...",
        skills: "Habilidades",
        "featured-projects": "Proyectos destacados",
        send: "Enviar",
        "contact-form": "Formulario de contacto",
        "name-label": "Nombre:",
        "message-label": "Mensaje:",
        contact: "Contacto",
        rights: "Todos los derechos reservados.",
        "developed-by": "Desarrollado por Mattius Holguin Blanco",
        view_full: "Ver versión completa",
        source_code: "ver código fuente",
    },
    en: {
        welcome: "Welcome!",
        role: "Programmer",
        "nav-about": "About me",
        "nav-skills": "Skills",
        "nav-projects": "Projects",
        "nav-contact": "Contact",
        about: "About me",
        "about-text": "I am a programmer passionate about technology and software development...",
        skills: "Skills",
        "featured-projects": "Featured Projects",
        send: "Send",
        "contact-form": "Contact form",
        "name-label": "Name:",
        "message-label": "Message:",
        contact: "Contact",
        rights: "All rights reserved.",
        "developed-by": "Developed by Mattius Holguin Blanco",
        view_full: "View Full Version",
        source_code: "Source Code",
    },
};

// Function to translate page content
function translatePage(lang) {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (i18n[lang] && i18n[lang][key]) {
            el.textContent = i18n[lang][key];
        }
    });
}

// Detect browser language and translate the page
document.addEventListener("DOMContentLoaded", () => {
    const userLang = navigator.language.startsWith('es') ? 'es' : 'en'; // Detect language
    translatePage(userLang);
});

// THEME SWITCHER FUNCTIONALITY
const themeButton = document.getElementById("theme-button");
const themeDropdown = document.getElementById("theme-dropdown");
const arrow = document.querySelector(".arrow");

themeButton.addEventListener("click", () => {
    themeDropdown.classList.toggle("visible"); // Toggle dropdown visibility
    arrow.classList.toggle("rotated"); // Rotate arrow icon
});

document.querySelectorAll(".color-box").forEach((box) => {
    box.addEventListener("click", () => {
        const color = box.style.backgroundColor;
        document.documentElement.style.setProperty("--primary", color);
        themeButton.style.backgroundColor = color;

        // Save color to localStorage
        localStorage.setItem("selectedTheme", color);

        // Close dropdown menu
        themeDropdown.classList.remove("visible");
    });
});

// Apply saved theme on page load
window.addEventListener("load", () => {
    const savedColor = localStorage.getItem("selectedTheme");
    if (savedColor) {
        document.documentElement.style.setProperty("--primary", savedColor);
        themeButton.style.backgroundColor = savedColor;
    }
});

// PDF LINK FUNCTIONALITY
document.getElementById('cv').addEventListener('click', () => {
    const pdfPath = './civilV/Mattius_Holguin_Blanco.pdf';
    fetch(pdfPath)
        .then((response) => {
            if (!response.ok) {
                throw new Error('File not found');
            }
            window.open(pdfPath, '_blank'); // Opens PDF if accessible
        })
        .catch((error) => {
            alert('Error: Unable to open the file. Verify the path or permissions.');
            console.error(error);
        });
});
