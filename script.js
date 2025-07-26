// Simple, working JavaScript for navigation and theme toggle

document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully');
    
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
    
    // Navigation highlighting
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Clear all active states
        navItems.forEach(nav => nav.classList.remove('active'));
        
        // Find active section
        let activeSection = null;
        let maxVisibleHeight = 0;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const visibleTop = Math.max(0, rect.top);
            const visibleBottom = Math.min(windowHeight, rect.bottom);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            
            if (visibleHeight > maxVisibleHeight && visibleHeight > 100) {
                maxVisibleHeight = visibleHeight;
                activeSection = section;
            }
        });
        
        // Activate corresponding nav item
        if (activeSection) {
            const activeNav = document.querySelector(`a[href="#${activeSection.id}"]`);
            if (activeNav) {
                activeNav.classList.add('active');
            }
        }
    }
    
    // Smooth scrolling for navigation links
    navItems.forEach(navItem => {
        navItem.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update navigation on scroll
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveNav, 50);
    });
    
    // Initial navigation update
    setTimeout(updateActiveNav, 500);
    
    console.log('Navigation and theme toggle initialized');
});
