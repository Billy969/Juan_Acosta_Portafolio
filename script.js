const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.side-navbar a');
const particlesContainer = document.createElement('div');
particlesContainer.classList.add('particles');
document.body.appendChild(particlesContainer);

// Traducciones para títulos dinámicos
const dynamicTitles = {
  en: ["Petroleum Engineer", "Software Developer", "Data Engineer"],
  es: ["Ingeniero de Petróleos", "Desarrollador de Software", "Ingeniero de Datos"]
};
let lang = "en"; // Estado global de idioma

const dynamicTitleElement = document.getElementById('dynamic-title');
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 150;
const deletingSpeed = 90;
const pauseTime = 1500;

function typeEffect() {
    const currentTitle = dynamicTitles[lang][titleIndex % dynamicTitles[lang].length];

    if (!isDeleting) {
        dynamicTitleElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    } else {
        dynamicTitleElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    }

    if (charIndex === currentTitle.length && !isDeleting) {
        isDeleting = true;
        setTimeout(typeEffect, pauseTime);
    } else if (charIndex === 0 && isDeleting) {
        isDeleting = false;
        titleIndex++;
        if (titleIndex >= dynamicTitles[lang].length) titleIndex = 0;
        setTimeout(typeEffect, typingSpeed + pauseTime);
    } else {
        setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
    }
}

// Función para revelar secciones al hacer scroll
function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.8;
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionId = section.id;
        const correspondingNavLink = document.querySelector(`.side-navbar a[data-section="${sectionId}"]`);
        if (sectionTop < triggerBottom && sectionTop > -section.offsetHeight) {
            section.classList.add('visible');
            if (correspondingNavLink) {
                navLinks.forEach(link => link.classList.remove('active'));
                correspondingNavLink.classList.add('active');
            }
        } else {
            if (correspondingNavLink && sectionTop > triggerBottom) {
                correspondingNavLink.classList.remove('active');
            }
        }
    });
}

// Suavizado del scroll para los enlaces del índice
document.querySelectorAll('.side-navbar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Generar partículas de fondo
function generateParticles() {
    const numParticles = 30;
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 8 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.setProperty('--y-end', `${Math.random() * 200 - 100}vh`);
        particle.style.setProperty('--x-end', `${Math.random() * 200 - 100}vw`);
        particle.style.setProperty('--scale-end', `${Math.random() * 0.5 + 0.5}`);
        particlesContainer.appendChild(particle);
    }
}

// Cambia todos los textos según idioma
function setLanguage(newLang) {
    lang = newLang;

    // Navegación
    document.querySelectorAll('.side-navbar a').forEach(link => {
        if (link.dataset[lang]) link.textContent = link.dataset[lang];
    });

    // H1, H2, y otros data-en/data-es
    document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = el.dataset[lang];
    });

    // Texto de los botones
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(lang + '-btn').classList.add('active');

    // Reiniciar typing effect con títulos del idioma correcto
    titleIndex = 0;
    charIndex = 0;
    isDeleting = false;
    // Detener animación previa (si la hay)
    clearTimeout(window.typeTimeout);
    typeEffect();
}

// Eventos de cambio de idioma
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('en-btn').addEventListener('click', () => setLanguage('en'));
    document.getElementById('es-btn').addEventListener('click', () => setLanguage('es'));

    // Animación de escritura para el título principal
    const introH1 = document.querySelector('.intro-text h1');
    introH1.style.width = '0';
    setTimeout(() => {
        introH1.style.animation = 'typing 2s steps(28, end) forwards, blink-caret .75s step-end infinite';
    }, 100);
    generateParticles();
    typeEffect();
});

// Eventos de scroll y carga para revelar secciones
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);