document.addEventListener('DOMContentLoaded', () => {
    // Dropdown Menu for Desktop with Smooth Transition
    const dropdownAction = document.querySelector(".dropdown-action");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    if (dropdownAction && dropdownMenu) {
        const showDropdown = () => {
            dropdownMenu.classList.remove("opacity-0", "invisible");
            dropdownMenu.classList.add("opacity-100", "visible");
            dropdownAction.classList.add("bg-[#F6520A]", "text-white");
        };

        const hideDropdown = () => {
            dropdownMenu.classList.remove("opacity-100", "visible");
            dropdownMenu.classList.add("opacity-0", "invisible");
            dropdownAction.classList.remove("bg-[#F6520A]", "text-white");
        };

        dropdownAction.addEventListener("mouseenter", showDropdown);
        dropdownAction.addEventListener("mouseleave", () => {
            setTimeout(() => {
                if (!dropdownMenu.matches(':hover') && !dropdownAction.matches(':hover')) {
                    hideDropdown();
                }
            }, 100);
        });

        dropdownMenu.addEventListener("mouseenter", showDropdown);
        dropdownMenu.addEventListener("mouseleave", () => {
            setTimeout(() => {
                if (!dropdownMenu.matches(':hover') && !dropdownAction.matches(':hover')) {
                    hideDropdown();
                }
            }, 100);
        });
    }

    // CAROUSEL //
    const carousel = document.getElementById("controls-carousel");
    const items = carousel.querySelectorAll("[data-carousel-item]");
    const prevButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");

    let currentIndex = 0;
    const intervalTime = 3000; // 3 seconds
    let autoSlideInterval;

    const totalItems = items.length;

    // Initialize carousel
    const initCarousel = () => {
        items.forEach((item, index) => {
            if (index === 0) {
                item.classList.add("opacity-100");
                item.classList.remove("opacity-0");
            } else {
                item.classList.add("opacity-0");
                item.classList.remove("opacity-100");
            }
        });
        startAutoSlide();
    };

    // Show slide based on index
    const showSlide = (newIndex) => {
        if (newIndex === currentIndex || newIndex < 0 || newIndex >= totalItems) return;

        const currentItem = items[currentIndex];
        const nextItem = items[newIndex];

        // Fade out current slide
        currentItem.classList.remove("opacity-100");
        currentItem.classList.add("opacity-0");

        // Fade in next slide
        nextItem.classList.remove("opacity-0");
        nextItem.classList.add("opacity-100");

        currentIndex = newIndex;
    };

    // Show next slide
    const nextSlide = () => {
        const newIndex = (currentIndex + 1) % totalItems;
        showSlide(newIndex);
    };

    // Show previous slide
    const prevSlide = () => {
        const newIndex = (currentIndex - 1 + totalItems) % totalItems;
        showSlide(newIndex);
    };

    // Start automatic sliding
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, intervalTime);
    };

    // Stop automatic sliding
    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };

    // Event listeners for navigation buttons
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

    // Pause auto sliding on mouse enter
    carousel.addEventListener("mouseenter", stopAutoSlide);

    // Resume auto sliding on mouse leave
    carousel.addEventListener("mouseleave", startAutoSlide);

    // Initialize the carousel on page load
    initCarousel();

    // Accordion
    const triggers = document.querySelectorAll("[data-accordion-target]");
    triggers.forEach((trigger) => {
        const targetSelector = trigger.getAttribute("data-accordion-target");
        const target = document.querySelector(targetSelector);
        const icon = trigger.querySelector("[data-accordion-icon]");

        if (!target) return;

        target.classList.remove("hidden");
        target.style.overflow = "hidden";
        target.style.transition = "max-height 0.3s ease, opacity 0.3s ease";

        const isExpanded = trigger.getAttribute("aria-expanded") === "true";
        if (isExpanded) {
            icon?.classList.add("rotate-180");
            target.style.maxHeight = `${target.scrollHeight}px`;
            target.style.opacity = "1";
        } else {
            icon?.classList.remove("rotate-180");
            target.style.maxHeight = "0";
            target.style.opacity = "0";
        }

        trigger.addEventListener("click", () => {
            const currentlyExpanded = trigger.getAttribute("aria-expanded") === "true";
            const newState = !currentlyExpanded;

            trigger.setAttribute("aria-expanded", newState);
            icon?.classList.toggle("rotate-180", newState);
            target.style.maxHeight = newState ? `${target.scrollHeight}px` : "0";
            target.style.opacity = newState ? "1" : "0";
        });
    });

    // Mobile Menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileServiciosButton = document.getElementById('mobile-servicios-button');
    const mobileSubmenu = mobileServiciosButton?.nextElementSibling;

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
        });
    }

    if (mobileServiciosButton && mobileSubmenu) {
        mobileServiciosButton.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileSubmenu.classList.toggle('hidden');
        });
    }

    document.addEventListener('click', (event) => {
        if (mobileMenu && !mobileMenu.contains(event.target) && mobileMenuButton && !mobileMenuButton.contains(event.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
});