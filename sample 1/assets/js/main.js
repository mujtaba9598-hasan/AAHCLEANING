// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Wipe Reveals
document.addEventListener("DOMContentLoaded", (event) => {
  const wipeElements = document.querySelectorAll('.wipe-reveal');
  
  wipeElements.forEach((el) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      },
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1.5,
      ease: "power4.inOut"
    });
  });

  // Dynamic WhatsApp Message based on path
  const waBtn = document.getElementById('wa-floating-btn');
  if (waBtn) {
    const path = window.location.pathname;
    let pageContext = "your website";
    if (path.includes('sofa')) pageContext = "Sofa Cleaning";
    else if (path.includes('carpet')) pageContext = "Carpet Cleaning";
    else if (path.includes('glass')) pageContext = "Glass Cleaning";
    else if (path.includes('villa')) pageContext = "Villa Cleaning";
    else if (path.includes('about')) pageContext = "the About page";
    else if (path.includes('services')) pageContext = "the Services page";
    
    const msg = encodeURIComponent(`Hello Abdul Aziz Habib Cleaning Service, I'm reaching out from ${pageContext} and would like to inquire about your services.`);
    waBtn.href = `https://wa.me/971558786055?text=${msg}`;
  }
});

// Contact Form Morphing Button Logic
function handleFormSubmit(event) {
    event.preventDefault();
    const btn = document.getElementById('submit-btn');
    if (!btn) return;
    
    // Morph to sparkle state
    btn.classList.add('sending');
    btn.innerHTML = '✨';
    
    // Simulate API call
    setTimeout(() => {
        btn.classList.remove('sending');
        btn.classList.add('sent');
        btn.style.width = 'auto';
        btn.style.borderRadius = '0.5rem'; // Tailwind rounded-lg
        btn.innerHTML = 'Message Sent Successfully ✓';
    }, 2000);
}
