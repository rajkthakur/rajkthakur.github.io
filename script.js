// Performance optimization: Use requestAnimationFrame for smooth animations
let animationId;

// Theme switching functionality
const themeToggle = document.getElementById('themeToggle');
const themeMenu = document.getElementById('themeMenu');
const themeOptions = document.querySelectorAll('.theme-option');

// Load saved theme
const savedTheme = localStorage.getItem('website-theme') || 'general';
document.documentElement.setAttribute('data-theme', savedTheme);
updateActiveTheme(savedTheme);

// Toggle theme menu with proper ARIA attributes
themeToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = themeMenu.classList.contains('active');
    themeMenu.classList.toggle('active');
    themeToggle.setAttribute('aria-expanded', !isExpanded);
});

// Close theme menu when clicking outside or pressing Escape
document.addEventListener('click', () => {
    themeMenu.classList.remove('active');
    themeToggle.setAttribute('aria-expanded', 'false');
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && themeMenu.classList.contains('active')) {
        themeMenu.classList.remove('active');
        themeToggle.setAttribute('aria-expanded', 'false');
        themeToggle.focus();
    }
});

// Theme option selection with keyboard support
themeOptions.forEach((option, index) => {
    option.addEventListener('click', (e) => {
        e.stopPropagation();
        selectTheme(option);
    });
    
    option.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectTheme(option);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (index + 1) % themeOptions.length;
            themeOptions[nextIndex].focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = (index - 1 + themeOptions.length) % themeOptions.length;
            themeOptions[prevIndex].focus();
        }
    });
});

function selectTheme(option) {
    const theme = option.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('website-theme', theme);
    updateActiveTheme(theme);
    themeMenu.classList.remove('active');
    themeToggle.setAttribute('aria-expanded', 'false');
    updateThemeIcon(theme);
}

function updateActiveTheme(theme) {
    themeOptions.forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-theme') === theme) {
            option.classList.add('active');
        }
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-icon');
    const icons = {
        'general': '🌙',
        'reader': '📖'
    };
    themeIcon.textContent = icons[theme] || '🌙';
}

// Initialize theme icon
updateThemeIcon(savedTheme);

// Smooth scrolling for navigation with focus management
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
            // Smooth scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Set focus to target for accessibility
            target.setAttribute('tabindex', '-1');
            target.focus();
            
            // Remove tabindex after focus
            target.addEventListener('blur', () => {
                target.removeAttribute('tabindex');
            }, { once: true });
        }
    });
});

// Intersection Observer for fade-in animations with performance optimization
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing once visible to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Navigation active state with debouncing
let navUpdateTimeout;
const navObserver = new IntersectionObserver((entries) => {
    clearTimeout(navUpdateTimeout);
    navUpdateTimeout = setTimeout(() => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.nav-item').forEach(nav => {
                    nav.classList.remove('active');
                    if (nav.getAttribute('href') === `#${id}`) {
                        nav.classList.add('active');
                    }
                });
            }
        });
    }, 100);
}, {
    threshold: 0.3,
    rootMargin: '-20% 0px -20% 0px'
});

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Observe all sections for navigation
document.querySelectorAll('section[id]').forEach(section => {
    navObserver.observe(section);
});

// Optimized particle system (only for desktop and when user hasn't requested reduced motion)
function createParticles() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth <= 768;
    
    if (prefersReducedMotion || isMobile) {
        return; // Skip particles for better performance and accessibility
    }
    
    const particles = document.createElement('div');
    particles.className = 'particles';
    particles.setAttribute('aria-hidden', 'true');
    document.body.appendChild(particles);
    
    const particleCount = 30; // Reduced count for better performance
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particles.appendChild(particle);
    }
}

// Debounced resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Handle any resize-specific logic here
        const newIsMobile = window.innerWidth <= 768;
        // You can add responsive adjustments here if needed
    }, 250);
});

// Initialize particles only if appropriate
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
});

// Keyboard navigation improvements
document.addEventListener('keydown', (e) => {
    // Allow keyboard navigation through nav items
    if (e.target.classList.contains('nav-item')) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const navItems = Array.from(document.querySelectorAll('.nav-item'));
            const currentIndex = navItems.indexOf(e.target);
            const nextIndex = (currentIndex + 1) % navItems.length;
            navItems[nextIndex].focus();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const navItems = Array.from(document.querySelectorAll('.nav-item'));
            const currentIndex = navItems.indexOf(e.target);
            const prevIndex = (currentIndex - 1 + navItems.length) % navItems.length;
            navItems[prevIndex].focus();
        }
    }
});

// Performance monitoring (optional - can be removed in production)
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    });
}

// Error handling for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Create a fallback placeholder
            const placeholder = document.createElement('div');
            placeholder.className = 'gif-placeholder';
            placeholder.style.cssText = `
                background: linear-gradient(45deg, #667eea, #764ba2);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 4rem;
                color: white;
                width: 100%;
                height: 100%;
                border-radius: 15px;
            `;
            placeholder.textContent = '🖼️';
            placeholder.setAttribute('aria-label', 'Image placeholder');
            
            this.parentElement.replaceChild(placeholder, this);
        });
    });
});

// Service Worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment if you want to add a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}
