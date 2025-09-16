// Script.js

const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.side-navbar a');
const particlesContainer = document.createElement('div');
particlesContainer.classList.add('particles');
document.body.appendChild(particlesContainer);

const dynamicTitleElement = document.getElementById('dynamic-title');
const titles = [
    "Petroleum Engineer",
    "Software Developer",
    "Data Engineer"
];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 150; // Velocidad de escritura
const deletingSpeed = 75; // Velocidad de borrado (más rápida)
const pauseTime = 1500; // Tiempo de pausa antes de borrar o escribir el siguiente

function typeEffect() {
    const currentTitle = titlesLoop(titleIndex);

    if (!isDeleting) {
        // Escribiendo
        dynamicTitleElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    } else {
        // Borrando
        dynamicTitleElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    }

    // Lógica para cambiar de estado (escribir -> borrar, borrar -> siguiente)
    if (charIndex === currentTitle.length && !isDeleting) {
        // Terminó de escribir, pasar a borrar
        isDeleting = true;
        setTimeout(typeEffect, pauseTime); // Pausa antes de borrar
    } else if (charIndex === 0 && isDeleting) {
        // Terminó de borrar, pasar al siguiente título
        isDeleting = false;
        titleIndex++;
        if (titleIndex >= titles.length) {
            titleIndex = 0; // Reiniciar el bucle
        }
        setTimeout(typeEffect, typingSpeed + pauseTime); // Pequeña pausa antes de escribir el siguiente
    } else {
        // Continuar escribiendo o borrando
        setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
    }
}

function titlesLoop(index) {
    return titles[(index) % titles.length];
}

// Función para revelar secciones al hacer scroll
function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.8; // Reduce el umbral para que aparezcan antes

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionId = section.id;
        const correspondingNavLink = document.querySelector(`.side-navbar a[data-section="${sectionId}"]`);

        if (sectionTop < triggerBottom && sectionTop > -section.offsetHeight) {
            // Agrega la clase 'visible' cuando la sección entra en el viewport
            section.classList.add('visible');
            // Activa el enlace de navegación correspondiente
            if (correspondingNavLink) {
                navLinks.forEach(link => link.classList.remove('active'));
                correspondingNavLink.classList.add('active');
            }
        } else {
            // Opcional: Para que las secciones se "oculten" si vuelves a subir
            // section.classList.remove('visible');
            // Desactiva el enlace de navegación si la sección no está visible
            if (correspondingNavLink && sectionTop > triggerBottom) { // Solo desactiva si está por debajo del umbral
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
                top: targetSection.offsetTop - 70, // Ajusta el offset para el header fijo
                behavior: 'smooth'
            });

            // Actualiza la clase activa inmediatamente al hacer clic
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Generar partículas de fondo
function generateParticles() {
    const numParticles = 30; // Cantidad de partículas
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 8 + 2; // Tamaño entre 2px y 10px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`; // Duración entre 5 y 15 segundos
        particle.style.animationDelay = `${Math.random() * 5}s`; // Retraso aleatorio
        particle.style.setProperty('--y-end', `${Math.random() * 200 - 100}vh`); // Desplazamiento vertical aleatorio
        particle.style.setProperty('--x-end', `${Math.random() * 200 - 100}vw`); // Desplazamiento horizontal aleatorio
        particle.style.setProperty('--scale-end', `${Math.random() * 0.5 + 0.5}`); // Escala final
        particlesContainer.appendChild(particle);
    }
}

// Evento que se dispara cuando todo el contenido del DOM ha sido cargado
document.addEventListener('DOMContentLoaded', () => {
    // Animación de escritura para el título principal
    const introH1 = document.querySelector('.intro-text h1');
    introH1.style.width = '0'; // Asegura que empiece invisible

    setTimeout(() => {
        introH1.style.animation = 'typing 2s steps(28, end) forwards, blink-caret .75s step-end infinite';
    }, 100); // Pequeño retraso para asegurar que CSS se aplique

    generateParticles(); // Iniciar la generación de partículas
    typeEffect(); // Iniciar el efecto de texto dinámico
});

// Eventos de scroll y carga para revelar secciones
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll); // Para que se active al cargar la página por si hay contenido en la vista

