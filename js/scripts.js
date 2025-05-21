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

  // Smooth scroll 
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
