
const dropdownAction = document.querySelector(".dropdown-action");
const dropdownMenu = document.querySelector(".dropdown-menu");

// Mostrar el menú cuando el mouse entra en el botón
dropdownAction.addEventListener("mouseenter", () => {
    dropdownMenu.classList.remove("hidden");
    dropdownAction.classList.add("bg-[#F6520A]");
    dropdownAction.classList.add("text-white");
});

// Ocultar el menú solo si el mouse no está sobre el menú ni sobre el botón
dropdownAction.addEventListener("mouseleave", () => {
    setTimeout(() => {
        if (!dropdownMenu.matches(':hover') && !dropdownAction.matches(':hover')) {
            dropdownMenu.classList.add("hidden");
            dropdownAction.classList.remove("bg-[#F6520A]");
            dropdownAction.classList.remove("text-white");
        }
    }, 100); // Pequeño retraso para evitar comportamientos bruscos
});

// Evitar que se oculte si el mouse entra al menú
dropdownMenu.addEventListener("mouseenter", () => {
    dropdownMenu.classList.remove("hidden");
    dropdownAction.classList.add("bg-[#F6520A]");
    dropdownAction.classList.add("text-white");
});

// Ocultar el menú cuando el mouse sale del menú y del botón
dropdownMenu.addEventListener("mouseleave", () => {
    setTimeout(() => {
        if (!dropdownMenu.matches(':hover') && !dropdownAction.matches(':hover')) {
            dropdownMenu.classList.add("hidden");
            dropdownAction.classList.remove("bg-[#F6520A]");
            dropdownAction.classList.remove("text-white");
        }
    }, 100); // Pequeño retraso para asegurarse
});

//==== CAROUSEL  ====//
document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector("#controls-carousel");
    const items = carousel.querySelectorAll("[data-carousel-item]");
    const prevButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");

    let currentIndex = 0;
    const intervalTime = 3000;
    let autoSlideInterval;

    function showSlide(newIndex) {
        if (newIndex === currentIndex) return;
        const oldIndex = currentIndex;
        currentIndex = newIndex;

        // Desvanece la diapositiva anterior
        items[oldIndex].classList.remove("fade-in");
        items[oldIndex].classList.add("fade-out");
        setTimeout(() => {
            items[oldIndex].classList.add("hidden", "opacity-0");
            items[oldIndex].classList.remove("block", "fade-out");
        }, 700);

        // Muestra la nueva diapositiva con fade-in
        items[newIndex].classList.remove("hidden", "opacity-0", "fade-out");
        items[newIndex].classList.add("block", "fade-in");
        setTimeout(() => {
            items[newIndex].classList.remove("fade-in");
        }, 700);
    }

    function nextSlide() {
        const newIndex = (currentIndex + 1) % items.length;
        showSlide(newIndex);
    }

    function prevSlide() {
        const newIndex = (currentIndex - 1 + items.length) % items.length;
        showSlide(newIndex);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, intervalTime);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    items.forEach((item, i) => {
        if (i === 0) {
            item.classList.remove("hidden", "opacity-0");
            item.classList.add("block");
        } else {
            item.classList.add("hidden", "opacity-0");
        }
    });

    startAutoSlide();

    prevButton.addEventListener("click", () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    nextButton.addEventListener("click", () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    carousel.addEventListener("mouseenter", stopAutoSlide);
    carousel.addEventListener("mouseleave", startAutoSlide);
});

//==== ACORDEON  ====//
document.addEventListener("DOMContentLoaded", () => {
    const triggers = document.querySelectorAll("[data-accordion-target]");

    triggers.forEach((trigger) => {
        const targetSelector = trigger.getAttribute("data-accordion-target");
        const target = document.querySelector(targetSelector);
        const icon = trigger.querySelector("[data-accordion-icon]");

        // Quita "hidden" para permitir transición (Tailwind suele usar "hidden" por defecto).
        // Ajustamos estilos para animar altura y opacidad.
        target.classList.remove("hidden");
        target.style.overflow = "hidden";
        target.style.transition = "max-height 0.3s ease, opacity 0.3s ease";

        // Estado inicial: abierto o cerrado según "aria-expanded"
        const isExpanded = trigger.getAttribute("aria-expanded") === "true";
        if (isExpanded) {
            icon?.classList.add("rotate-180");
            target.style.maxHeight = target.scrollHeight + "px";
            target.style.opacity = "1";
        } else {
            icon?.classList.remove("rotate-180");
            target.style.maxHeight = "0";
            target.style.opacity = "0";
        }

        // Al hacer click, expandir o colapsar
        trigger.addEventListener("click", () => {
            const currentlyExpanded = trigger.getAttribute("aria-expanded") === "true";

            if (currentlyExpanded) {
                trigger.setAttribute("aria-expanded", "false");
                icon?.classList.remove("rotate-180");
                target.style.maxHeight = "0";
                target.style.opacity = "0";
            } else {
                trigger.setAttribute("aria-expanded", "true");
                icon?.classList.add("rotate-180");
                target.style.maxHeight = target.scrollHeight + "px";
                target.style.opacity = "1";
            }
        });
    });
});

