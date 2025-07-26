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

    // Navigation Highlight - Simplified and more reliable
    setupNavigationHighlight() {
        const navItems = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('section[id]');

        // Create array of section data for easier processing
        const sectionData = Array.from(sections).map(section => ({
            id: section.id,
            element: section,
            navLink: document.querySelector(`.nav-item[href="#${section.id}"]`)
        }));

        console.log('Section data:', sectionData.map(s => s.id));

        const updateActiveNav = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Check if we're at the very top
            if (scrollY < 50) {
                navItems.forEach(nav => nav.classList.remove('active'));
                return;
            }
            
            // Check if we're at the very bottom
            if (scrollY + windowHeight >= documentHeight - 50) {
                navItems.forEach(nav => nav.classList.remove('active'));
                const lastSection = sectionData[sectionData.length - 1];
                if (lastSection && lastSection.navLink) {
                    lastSection.navLink.classList.add('active');
                    console.log('Bottom reached, activated:', lastSection.id);
                }
                return;
            }

            let activeSection = null;
            let minDistance = Infinity;

            // Find the section closest to the center of the viewport
            sectionData.forEach(sectionInfo => {
                const section = sectionInfo.element;
                const rect = section.getBoundingClientRect();
                const sectionCenter = rect.top + rect.height / 2;
                const viewportCenter = windowHeight / 2;
                const distance = Math.abs(sectionCenter - viewportCenter);

                // Only consider sections that are at least partially visible
                if (rect.bottom > 0 && rect.top < windowHeight) {
                    if (distance < minDistance) {
                        minDistance = distance;
                        activeSection = sectionInfo;
                    }
                }
            });

            // Alternative method: find section that occupies most of the viewport
            if (!activeSection) {
                let maxVisibleArea = 0;
                
                sectionData.forEach(sectionInfo => {
                    const section = sectionInfo.element;
                    const rect = section.getBoundingClientRect();
                    
                    // Calculate visible area
                    const visibleTop = Math.max(0, rect.top);
                    const visibleBottom = Math.min(windowHeight, rect.bottom);
                    const visibleHeight = Math.max(0, visibleBottom - visibleTop);
                    
                    if (visibleHeight > maxVisibleArea) {
                        maxVisibleArea = visibleHeight;
                        activeSection = sectionInfo;
                    }
                });
            }

            // Update navigation
            navItems.forEach(nav => nav.classList.remove('active'));
            
            if (activeSection && activeSection.navLink) {
                activeSection.navLink.classList.add('active');
                console.log('Activated section:', activeSection.id);
            }
        };

        // Throttled scroll handler
        let scrollTimeout;
        const handleScroll = () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(updateActiveNav, 10);
        };

        // Event listeners
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', updateActiveNav, { passive: true });
        window.addEventListener('load', updateActiveNav);

        // Initial call
        setTimeout(updateActiveNav, 100);
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
