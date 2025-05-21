/**
 * Apply randomized 3D transforms and prepare circle visuals for animation.
 */
function initializeCircleTransforms() {
  document.querySelectorAll(".circle_div").forEach((el) => {
    // Skip if already populated
    if (el.children.length > 0) return;

    const rx = Math.random() * 30 - 60;
    const ry = Math.random() * 30 - 60;
    const rz = Math.random() * 30 - 60;

    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--rz", `${rz}deg`);
    el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`;

    // Prepare opacity and transition
    el.style.opacity = "0";
    el.style.transition = "opacity 1s ease-in-out";
  });
}

/**
 * Start the 3D ring animations with fade-in effect.
 */
function triggerCircleFadeIn() {
  setTimeout(() => {
    document.querySelectorAll(".circle_div").forEach((el) => {
      el.style.opacity = "1";
      el.style.animationPlayState = "running";
    });
  }, 100); // slight delay to allow initial setup
}

/**
 * Return references to annotation elements.
 */
function getAnnotations() {
  return {
    top: document.querySelector(".annot_top"),
    bottom: document.querySelector(".annot_bottom"),
    left: document.querySelector(".annot_left"),
    right: document.querySelector(".annot_right"),
    center: document.querySelector(".annot_center"),
  };
}

/**
 * Fade out, update text, fade back in.
 */
function fadeUpdate(el, text) {
  el.style.opacity = "0";
  setTimeout(() => {
    el.textContent = text;
    el.style.opacity = "1";
  }, 500); // syncs with CSS opacity transition
}

/**
 * Set initial annotation text (Phase 1).
 */
function setPhase1(annotations) {
  console.log("Phase 1");
  fadeUpdate(annotations.top, "Obscure");
  fadeUpdate(annotations.bottom, "Complex");
  fadeUpdate(annotations.left, "Fragmented");
  fadeUpdate(annotations.right, "Disconnected");
  fadeUpdate(annotations.center, "??");
}

/**
 * Set updated annotation text (Phase 2).
 */
function setPhase2(annotations) {
  console.log("Phase 2");
  fadeUpdate(annotations.top, "Mission");
  fadeUpdate(annotations.bottom, "Precision");
  fadeUpdate(annotations.left, "Transformation");
  fadeUpdate(annotations.right, "Superiority");
  fadeUpdate(annotations.center, "Zeroth");
}

/**
 * Cycle through annotation phases based on animation state.
 */
function annotationCycle(annotations) {
  const animationDuration = 15000; // ms

  // Phase 1 → chaos
  setPhase1(annotations);

  // Phase 2 → focus, at 90% of forward animation
  setTimeout(() => setPhase2(annotations), animationDuration * 0.45); 

  // Phase 1 again on reverse (start of reverse is 15s after)
  setTimeout(() => setPhase1(annotations), animationDuration - 3000); // 3s before end of forward animation
}

// --- Main Execution ---

const annotations = getAnnotations();

initializeCircleTransforms();
triggerCircleFadeIn();
setTimeout(() => {
  annotationCycle(annotations);
  setInterval(() => annotationCycle(annotations), 30000);
}, 0);
