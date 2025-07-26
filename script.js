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

    // Navigation Highlight - Simplified with immediate feedback
    setupNavigationHighlight() {
        const navItems = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('section[id]');

        console.log('Setting up navigation highlighting...');
        console.log('Found nav items:', navItems.length);
        console.log('Found sections:', sections.length);

        // Test function to manually activate navigation
        window.testNavHighlight = (sectionId) => {
            navItems.forEach(nav => nav.classList.remove('active'));
            const targetNav = document.querySelector(`.nav-item[href="#${sectionId}"]`);
            if (targetNav) {
                targetNav.classList.add('active');
                console.log('Manually activated:', sectionId);
            }
        };

        // Add click handlers to navigation items for immediate feedback
        navItems.forEach(navItem => {
            navItem.addEventListener('click', (e) => {
                // Remove active from all items
                navItems.forEach(nav => {
                    nav.classList.remove('active');
                    nav.removeAttribute('data-active');
                    nav.style.backgroundColor = '';
                    nav.style.color = '';
                    nav.style.boxShadow = '';
                });
                
                // Add active to clicked item
                navItem.classList.add('active');
                navItem.setAttribute('data-active', 'true');
                navItem.style.backgroundColor = '#6366f1';
                navItem.style.color = 'white';
                navItem.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.5)';
                console.log('Clicked nav item:', navItem.textContent);
            });
        });

        const updateActiveNav = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            
            console.log('Updating nav, scroll position:', scrollY);
            
            // Simple approach: find which section is most visible
            let activeSection = null;
            let maxVisibleHeight = 0;

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const visibleTop = Math.max(0, rect.top);
                const visibleBottom = Math.min(windowHeight, rect.bottom);
                const visibleHeight = Math.max(0, visibleBottom - visibleTop);
                
                console.log(`Section ${section.id}:`, {
                    top: rect.top,
                    bottom: rect.bottom,
                    visibleHeight: visibleHeight
                });

                if (visibleHeight > maxVisibleHeight && visibleHeight > 100) {
                    maxVisibleHeight = visibleHeight;
                    activeSection = section;
                }
            });

            // Clear all active states
            navItems.forEach(nav => {
                nav.classList.remove('active');
                nav.removeAttribute('data-active');
                nav.style.backgroundColor = ''; // Clear any inline styles
                nav.style.color = '';
            });

            if (activeSection) {
                const sectionId = activeSection.id;
                const activeNav = document.querySelector(`.nav-item[href="#${sectionId}"]`);
                
                console.log('Active section:', sectionId);
                console.log('Found nav element:', !!activeNav);
                
                if (activeNav) {
                    activeNav.classList.add('active');
                    activeNav.setAttribute('data-active', 'true');
                    // Add inline style as backup
                    activeNav.style.backgroundColor = '#6366f1';
                    activeNav.style.color = 'white';
                    activeNav.style.borderRadius = '1.5rem';
                    activeNav.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.5)';
                    console.log('Applied active class and styles to:', sectionId);
                }
            }
        };

        // Use a simple scroll handler
        let scrollTimer;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(updateActiveNav, 50);
        }, { passive: true });

        // Initial call
        setTimeout(updateActiveNav, 500);
        
        console.log('Navigation highlighting setup complete');
        console.log('Test with: testNavHighlight("about") in console');
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
    
    // Add debug function to window for manual testing
    window.debugNavigation = () => {
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-item');
        
        console.log('=== Navigation Debug Info ===');
        console.log('Sections found:', sections.length);
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            console.log(`${index + 1}. Section "${section.id}":`, {
                top: rect.top,
                bottom: rect.bottom,
                height: rect.height,
                visible: rect.bottom > 0 && rect.top < window.innerHeight
            });
        });
        
        console.log('Nav items found:', navItems.length);
        navItems.forEach((nav, index) => {
            console.log(`${index + 1}. Nav "${nav.textContent}":`, {
                href: nav.getAttribute('href'),
                active: nav.classList.contains('active')
            });
        });
        
        console.log('Current scroll position:', window.scrollY);
        console.log('Window height:', window.innerHeight);
        console.log('Document height:', document.documentElement.scrollHeight);
    };
    
    console.log('Debug function added. Type debugNavigation() in console to test.');
});

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    document.documentElement.style.setProperty('--transition-duration', '0.01ms');
}
