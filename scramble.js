// Text Scramble Effect - claude ai
class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = 'abcdefghijklmnopqrstuvwxyz!<>-_\\/[]{}—=+*^?#_~`|';
      this.update = this.update.bind(this);
    }
    
    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise(resolve => this.resolve = resolve);
      this.queue = [];
      
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40) + 30;
        this.queue.push({ from, to, start, end });
      }
      
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
    
    update() {
      let output = '';
      let complete = 0;
      
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.10) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="scramble-char">${char}</span>`;
        } else {
          output += from;
        }
      }
      
      this.el.innerHTML = output;
      
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
    
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }
  
  // Track which elements are currently being scrambled
  const activeScrambles = new Set();
  
  // Function to scramble any text element with anti-spam protection
  function scrambleElement(element) {
    // Check if this element is already being scrambled
    if (activeScrambles.has(element)) {
      return false; // Already scrambling, do nothing
    }
    
    // Mark this element as being scrambled
    activeScrambles.add(element);
    
    const originalText = element.textContent;
    
    // Create initial scrambled state
    element.textContent = '';
    for (let i = 0; i < originalText.length; i++) {
      element.textContent += '.';
    }
    
    const fx = new TextScramble(element);
    
    // Start the effect with a small delay
    setTimeout(() => {
      fx.setText(originalText).then(() => {
        // Remove from active scrambles when complete
        activeScrambles.delete(element);
      });
    }, 1);
    
    return true; // Successfully started scrambling
  }
  
  // Add cooldown to prevent spam clicking
  let lastClickTime = 0;
  const COOLDOWN_PERIOD = 2000; // 2 seconds cooldown
  
  // Initialize the effect when the DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    // Initial name scramble
    const nameElement = document.querySelector('header h1');
    scrambleElement(nameElement);
    
    // Setup the about link to trigger scramble when clicked
    const aboutLink = document.querySelector('a[href="#about-me"]');
    aboutLink.addEventListener('click', function(e) {
      // Check if user is already at the top
      if (window.scrollY < 100) {
        // Check cooldown
        const now = Date.now();
        if (now - lastClickTime < COOLDOWN_PERIOD) {
          e.preventDefault();
          return; // Still in cooldown period
        }
        
        // Scramble the "About Me" heading
        const aboutHeading = document.querySelector('.about-me-text h1');
        const scrambleStarted = scrambleElement(aboutHeading);
        
        if (scrambleStarted) {
          e.preventDefault(); // Prevent default scroll behavior
          lastClickTime = now; // Update last click time
        }
      }
    });

    const projectLink = document.querySelector('a[href="#projects"]');
    projectLink.addEventListener('click', function(e) {
      // Check if user is already at the top
      if (window.scrollY > 700) {
        // Check cooldown
        const now = Date.now();
        if (now - lastClickTime < COOLDOWN_PERIOD) {
          e.preventDefault();
          return; // Still in cooldown period
        }
        
        // Scramble the "Project" heading
        const projectsHeading = document.querySelector('.project-info h1');
        const scrambleStarted = scrambleElement(projectsHeading);

        if (scrambleStarted) {
            e.preventDefault(); // Prevent default scroll behavior
            lastClickTime = now; // Update last click time
        }
      }
    });
  });