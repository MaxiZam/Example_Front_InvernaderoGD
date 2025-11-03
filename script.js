(function(){
    // Slider value display updates
    const sliders = document.querySelectorAll(".slider-input")
    sliders.forEach((slider) => {
        const valueDisplay = slider.nextElementSibling
        if (valueDisplay && valueDisplay.classList.contains("slider-value")) {
            slider.addEventListener("input", function () {
                valueDisplay.textContent = this.value + "%"
            })
        }
    })

    // Actuator toggle functionality
    const deviceControls = document.querySelectorAll(".device-control .btn")
    deviceControls.forEach((button) => {
        button.addEventListener("click", function () {
            const statusElement =
            this.closest(".device-control").querySelector(".device-status")
            const isActive = statusElement.classList.contains("device-status--active")

            if (isActive) {
                statusElement.classList.remove("device-status--active")
                statusElement.classList.add("device-status--inactive")
                statusElement.querySelector("span:last-child").textContent = "Inactivo"
                this.textContent = "Activar"
                this.classList.remove("btn-primary")
                this.classList.add("btn-outline")
            } else {
                statusElement.classList.remove("device-status--inactive")
                statusElement.classList.add("device-status--active")
                statusElement.querySelector("span:last-child").textContent = "Activo"
                this.textContent = "Desactivar"
                this.classList.remove("btn-outline")
                this.classList.add("btn-primary")
            }
        })
    })

    // Stream tile selection
    const streamTiles = document.querySelectorAll(".stream-tile")
    streamTiles.forEach((tile) => {
        tile.addEventListener("click", function () {
            streamTiles.forEach((t) => t.setAttribute("aria-pressed", "false"))
            this.setAttribute("aria-pressed", "true")
        })

        tile.addEventListener("keypress", function (e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                this.click()
            }
        })
    })

    // Role toggle functionality
    const roleButtons = document.querySelectorAll(".role-btn")
    roleButtons.forEach((button) => {
        button.addEventListener("click", function () {
            roleButtons.forEach((btn) => btn.classList.remove("role-btn--active"))
            this.classList.add("role-btn--active")
        })
    })

    // Filter bar toggle
    const filterButtons = document.querySelectorAll(".filter-bar .btn")
    filterButtons.forEach((button) => {
        button.addEventListener("click", function () {
            filterButtons.forEach((btn) => {
                btn.classList.remove("btn-primary")
                btn.classList.add("btn-outline")
            })
            this.classList.remove("btn-outline")
            this.classList.add("btn-primary")
        })
    })

    // Simple fade-in animation for sections on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    }

    const fadeInObserver = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1"
                entry.target.style.transform = "translateY(0)"
            }
        })
    }, observerOptions)

    const sections = document.querySelectorAll("section")
    sections.forEach((section) => {
        section.style.opacity = "0"
        section.style.transform = "translateY(20px)"
        section.style.transition =
        "opacity var(--animation-duration-standard) var(--animation-curve-primary), transform var(--animation-duration-standard) var(--animation-curve-primary)"
        fadeInObserver.observe(section)
    })
})();

(function(){
    // Navigation toggle functionality
    const navigationToggle = document.getElementById("navigation-toggle")
    const navigationMenu = document.getElementById("navigation-menu")

    if (navigationToggle && navigationMenu) {
        navigationToggle.addEventListener("click", function () {
            const isExpanded = this.getAttribute("aria-expanded") === "true"

            // Toggle aria-expanded
            this.setAttribute("aria-expanded", !isExpanded)

            // Toggle menu visibility
            navigationMenu.classList.toggle("navigation-menu-open")

            // Update aria-label
            this.setAttribute(
                "aria-label",
                isExpanded ? "Abrir menú de navegación" : "Cerrar menú de navegación"
            )
        })

        // Close menu when clicking outside
        document.addEventListener("click", function (event) {
            const isClickInside =
            navigationToggle.contains(event.target) ||
            navigationMenu.contains(event.target)

            if (
                !isClickInside &&
                navigationMenu.classList.contains("navigation-menu-open")
            ) {
                navigationToggle.setAttribute("aria-expanded", "false")
                navigationMenu.classList.remove("navigation-menu-open")
                navigationToggle.setAttribute("aria-label", "Abrir menú de navegación")
            }
        })

        // Close menu when pressing Escape key
        document.addEventListener("keydown", function (event) {
            if (
                event.key === "Escape" &&
                navigationMenu.classList.contains("navigation-menu-open")
            ) {
                navigationToggle.setAttribute("aria-expanded", "false")
                navigationMenu.classList.remove("navigation-menu-open")
                navigationToggle.setAttribute("aria-label", "Abrir menú de navegación")
                navigationToggle.focus()
            }
        })

        // Close menu when clicking on a link
        const menuLinks = navigationMenu.querySelectorAll(".navigation-menu-link")
        menuLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                if (navigationMenu.classList.contains("navigation-menu-open")) {
                    navigationToggle.setAttribute("aria-expanded", "false")
                    navigationMenu.classList.remove("navigation-menu-open")
                    navigationToggle.setAttribute(
                        "aria-label",
                        "Abrir menú de navegación"
                    )
                }
            })
        })
    }

    // Add scroll effect to navigation
    const navigation = document.getElementById("navigation-main")
    let lastScroll = 0

    window.addEventListener("scroll", function () {
        const currentScroll = window.pageYOffset

        if (currentScroll > 50) {
            navigation.style.boxShadow = "var(--shadow-level-2)"
        } else {
            navigation.style.boxShadow = "var(--shadow-level-1)"
        }

        lastScroll = currentScroll
    })
})();

(function(){
    // Enhance footer accessibility with keyboard navigation
    const footerLinks = document.querySelectorAll(
        ".footer-link, .footer-legal-link, .footer-contact-link, .footer-social-link"
    )

    footerLinks.forEach((link) => {
        link.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                link.click()
            }
        })
    })

    // Add smooth reveal animation on scroll
    const footerObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1"
                    entry.target.style.transform = "translateY(0)"
                }
            })
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
        }
    )

    const footerColumns = document.querySelectorAll(".footer-column")
    footerColumns.forEach((column, index) => {
        column.style.opacity = "0"
        column.style.transform = "translateY(20px)"
        column.style.transition = `opacity 0.5s ease ${
            index * 0.1
        }s, transform 0.5s ease ${index * 0.1}s`
        footerObserver.observe(column)
    })

    // Enhance CTA button interaction
    const ctaButton = document.querySelector(".footer-cta .btn")
    if (ctaButton) {
        ctaButton.addEventListener("mouseenter", () => {
            ctaButton.style.transform = "translateY(-2px)"
        })

        ctaButton.addEventListener("mouseleave", () => {
            ctaButton.style.transform = "translateY(0)"
        })
    }

    // Add year update for copyright
    const copyrightElement = document.querySelector(".footer-copyright")
    if (copyrightElement) {
        const currentYear = new Date().getFullYear()
        copyrightElement.textContent = copyrightElement.textContent.replace(
            "2025",
            currentYear
        )
    }
})()