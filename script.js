// Modern JavaScript with improved performance and smooth interactions

class ModernPortfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.setupSmoothScrolling();
        this.setupIntersectionObserver();
        this.setupNavigationHighlight();
        this.setupPerformanceOptimizations();
    }

    // Theme Toggle Functionality
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('.theme-icon');
        
        // Load saved theme or default to dark
        const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
        document.body.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme, themeIcon);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
            this.updateThemeIcon(newTheme, themeIcon);
            
            // Add smooth transition effect
            document.body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }

    updateThemeIcon(theme, iconElement) {
        iconElement.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    // Smooth Scrolling with offset for fixed navigation
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 100; // Account for fixed nav
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without jumping
                    history.pushState(null, null, `#${targetId}`);
                }
            });
        });
    }

    // Intersection Observer for animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Stop observing once visible for performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    // Navigation Highlight - More robust approach
    setupNavigationHighlight() {
        const navItems = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('section[id]');

        console.log('Found sections:', Array.from(sections).map(s => s.id)); // Debug log

        // Function to update active navigation
        const updateActiveNav = () => {
            const scrollPosition = window.scrollY + 200; // Offset for better detection
            let activeSection = null;

            // Find the current section based on scroll position
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionBottom = sectionTop + sectionHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    activeSection = section;
                }
            });

            // If no section is found, check if we're at the top
            if (!activeSection && window.scrollY < 100) {
                // Don't highlight any section when at the very top
                navItems.forEach(nav => nav.classList.remove('active'));
                return;
            }

            // If still no section found, use the last section if we're at the bottom
            if (!activeSection && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
                activeSection = sections[sections.length - 1];
            }

            if (activeSection) {
                const id = activeSection.getAttribute('id');
                console.log('Active section:', id); // Debug log
                
                // Remove active class from all nav items
                navItems.forEach(nav => nav.classList.remove('active'));
                
                // Add active class to current nav item
                const activeNav = document.querySelector(`.nav-item[href="#${id}"]`);
                if (activeNav) {
                    activeNav.classList.add('active');
                    console.log('Activated nav:', activeNav.textContent); // Debug log
                } else {
                    console.log('No nav found for section:', id); // Debug log
                }
            }
        };

        // Use scroll event with throttling for better performance
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateActiveNav();
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Listen to scroll events
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Also use intersection observer as backup
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    console.log('Intersection observer detected:', id); // Debug log
                }
            });
        }, {
            threshold: [0.1, 0.5],
            rootMargin: '-20% 0px -20% 0px'
        });

        // Observe all sections
        sections.forEach(section => {
            navObserver.observe(section);
        });

        // Initial call
        updateActiveNav();

        // Handle page load
        window.addEventListener('load', updateActiveNav);
    }

    // Performance Optimizations
    setupPerformanceOptimizations() {
        // Debounced resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });

        // Setup scroll progress bar
        this.setupScrollProgress();
    }

    handleResize() {
        // Handle any resize-specific logic
        const isMobile = window.innerWidth <= 768;
        document.body.classList.toggle('mobile', isMobile);
    }

    setupScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 2px;
            background: linear-gradient(90deg, #6366f1, #8b5cf6);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        let ticking = false;

        const updateProgress = () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBar.style.width = Math.min(scrollPercent, 100) + '%';
            ticking = false;
        };

        const requestProgressUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateProgress);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestProgressUpdate, { passive: true });
    }
}

// Keyboard Navigation Enhancement
class KeyboardNavigation {
    constructor() {
        this.setupKeyboardShortcuts();
        this.setupFocusManagement();
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Skip if user is typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            switch(e.key) {
                case 'h':
                case 'Home':
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    break;
                case 'e':
                    e.preventDefault();
                    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                case 'c':
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                case 't':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        document.getElementById('themeToggle')?.click();
                    }
                    break;
            }
        });
    }

    setupFocusManagement() {
        // Improve focus visibility
        const style = document.createElement('style');
        style.textContent = `
            *:focus {
                outline: 2px solid #6366f1 !important;
                outline-offset: 2px !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ModernPortfolio();
    new KeyboardNavigation();
});

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    document.documentElement.style.setProperty('--transition-duration', '0.01ms');
}
