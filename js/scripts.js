// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Custom cursor functionality
  const cursorFollower = document.getElementById("cursor-follower");

  // Only initialize custom cursor on non-touch devices and screens larger than 480px
  if (cursorFollower && !isTouchDevice() && window.innerWidth > 480) {
    // Set initial position off-screen
    let mouseX = -100;
    let mouseY = -100;

    // Update follower position when mouse moves
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Update follower position
      updateCursorPosition();
    });

    function updateCursorPosition() {
      if (cursorFollower) {
        cursorFollower.style.left = mouseX + "px";
        cursorFollower.style.top = mouseY + "px";
      }
    }

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .carousel-controls .dot, .carousel-item"
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursorFollower.classList.add("hover");
      });

      element.addEventListener("mouseleave", () => {
        cursorFollower.classList.remove("hover");
      });
    });
  }

  // Detect touch devices
  function isTouchDevice() {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  function setupScrollAnimations(
    selector = ".fade-slide-up",
    visibleClass = "visible",
    threshold = 0.1
  ) {
    const elements = document.querySelectorAll(selector);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(visibleClass);
          } else {
            entry.target.classList.remove(visibleClass); // retrigger on re-entry
          }
        });
      },
      { threshold }
    );

    elements.forEach((el) => observer.observe(el));
  }

  // Setup scroll animations for elements with the class 'fade-slide-up'
  setupScrollAnimations();

  // Carousel functionality
  const carousel = document.querySelector(".carousel");
  const items = document.querySelectorAll(".carousel-item");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");

  if (carousel && items.length && dots.length) {
    let currentIndex = 0;
    const totalItems = items.length;

    // Initialize carousel
    updateCarousel();

    // Event listeners
    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
      });
    }

    dots.forEach((dot) => {
      dot.addEventListener("click", function () {
        currentIndex = parseInt(this.dataset.index);
        updateCarousel();
      });
    });

    // Auto-advance carousel every 5 seconds
    const carouselInterval = setInterval(function () {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    }, 5000);

    // Update carousel position and active dot
    function updateCarousel() {
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Update active dot
      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }
  }

  // Enhanced Flower Animation with responsive behavior
  const flower = document.querySelector(".metallic-flower");

  if (flower) {
    // Function to check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.8
      );
    }

    // Function to animate the flower with responsive adjustments
    function animateFlower(flower) {
      if (flower.classList.contains("animate")) return; // Already animated

      const blurredCircle = flower.querySelector(".blurred-circle");
      const petals = flower.querySelectorAll(".petal");
      const centerCircle = flower.querySelector(".center-circle");
      const particlesContainer = flower.querySelector(".particles");

      // Animate the flower and blurred circle
      flower.classList.add("animate");
      if (blurredCircle) blurredCircle.classList.add("animate");

      // Calculate timing based on screen size
      const timingFactor =
        window.innerWidth <= 480 ? 0.7 : window.innerWidth <= 809 ? 0.85 : 1;

      // Staggered animation for petals
      petals.forEach((petal, index) => {
        setTimeout(() => {
          petal.classList.add("animate");
        }, (200 + index * 300) * timingFactor);
      });

      // Animate center circle with delay
      if (centerCircle) {
        setTimeout(() => {
          centerCircle.classList.add("animate");
          // Start creating particles after center appears
          if (particlesContainer) createParticles(particlesContainer);
        }, 800 * timingFactor);
      }
    }

    // Function to create responsive particles
    function createParticles(container) {
      // Determine number of initial particles based on screen size
      const particleCount =
        window.innerWidth <= 480 ? 5 : window.innerWidth <= 809 ? 10 : 15;

      // Initial batch of particles
      for (let i = 0; i < particleCount; i++) {
        createParticle(container);
      }

      // Set interval rate based on screen size
      const intervalRate =
        window.innerWidth <= 480 ? 1200 : window.innerWidth <= 809 ? 1000 : 800;

      // Set interval to continuously create particles
      const particleInterval = setInterval(() => {
        createParticle(container);
      }, intervalRate);

      // Store the interval ID on the container element to clear it if needed
      container.dataset.particleInterval = particleInterval;

      // Add window resize handler to adjust particles when window size changes
      window.addEventListener(
        "resize",
        debounce(function () {
          // Clear existing interval
          clearInterval(parseInt(container.dataset.particleInterval));

          // Remove all existing particles
          while (container.firstChild) {
            container.removeChild(container.firstChild);
          }

          // Restart with new responsive settings
          createParticles(container);
        }, 250)
      );
    }

    // Function to create a single responsive particle
    function createParticle(container) {
      const particle = document.createElement("div");
      particle.classList.add("particle");

      // Get container dimensions for responsive positioning
      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.width / 2;
      const centerY = containerRect.height / 2;

      // Random starting position near the center
      const angle = Math.random() * Math.PI * 2;
      const scaleFactor =
        Math.min(containerRect.width, containerRect.height) / 500; // Scale factor based on container size relative to original 500px
      const distance = (50 + Math.random() * 20) * scaleFactor;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;

      // Random x-offset for animation, scaled for container width
      const xOffset = (-50 + Math.random() * 100) * scaleFactor;

      particle.style.setProperty("--x-offset", `${xOffset}px`);
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      // Random size, scaled down for smaller screens
      const sizeScale =
        window.innerWidth <= 480 ? 0.7 : window.innerWidth <= 809 ? 0.85 : 1;
      const size = (1 + Math.random() * 3) * sizeScale;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Random opacity and color
      const opacity = 0.3 + Math.random() * 0.5;
      const hue = Math.random() * 30; // slight silver/blue variation
      particle.style.backgroundColor = `hsla(${
        210 + hue
      }, 70%, 80%, ${opacity})`;

      // Animation duration also scaled for smaller screens
      const durationScale = window.innerWidth <= 480 ? 0.8 : 1;
      const duration = (2 + Math.random() * 3) * durationScale;
      particle.style.animation = `particleFloat ${duration}s ease-out forwards`;

      container.appendChild(particle);

      // Remove particle after animation completes
      setTimeout(() => {
        if (particle.parentNode === container) {
          particle.remove();
        }
      }, duration * 1000 + 100); // Add a small buffer to ensure animation completes
    }

    // Debounce function for resize events
    function debounce(func, wait) {
      let timeout;
      return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          func.apply(context, args);
        }, wait);
      };
    }

    // Check on scroll if the flower is visible
    document.addEventListener("scroll", function () {
      if (isInViewport(flower)) {
        animateFlower(flower);
      }
    });

    // Check on page load (in case element is already in viewport)
    if (isInViewport(flower)) {
      animateFlower(flower);
    }

    // Recalculate on resize
    window.addEventListener(
      "resize",
      debounce(function () {
        if (isInViewport(flower) && !flower.classList.contains("animate")) {
          animateFlower(flower);
        }
      }, 250)
    );
  }

  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const mainNav = document.querySelector(".main-nav");

  if (hamburgerIcon && mainNav) {
    hamburgerIcon.addEventListener("click", function () {
      this.classList.toggle("open");
      mainNav.classList.toggle("open");
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll(".main-nav a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        hamburgerIcon.classList.remove("open");
        mainNav.classList.remove("open");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        !mainNav.contains(event.target) &&
        !hamburgerIcon.contains(event.target) &&
        mainNav.classList.contains("open")
      ) {
        hamburgerIcon.classList.remove("open");
        mainNav.classList.remove("open");
      }
    });
  }
});
