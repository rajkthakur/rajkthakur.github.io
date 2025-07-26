// Minimal, bulletproof navigation highlighting

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up navigation...');
    
    // Get navigation items and sections
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');
    
    console.log('Found nav items:', navItems.length);
    console.log('Found sections:', sections.length);
    
    // Test if we can find elements
    navItems.forEach((item, index) => {
        console.log(`Nav ${index}:`, item.textContent, item.href);
    });
    
    sections.forEach((section, index) => {
        console.log(`Section ${index}:`, section.id);
    });
    
    // Function to set active navigation
    function setActiveNav(activeId) {
        console.log('Setting active nav to:', activeId);
        
        // Remove active from all
        navItems.forEach(nav => {
            nav.classList.remove('active');
            nav.style.backgroundColor = '';
            nav.style.color = '';
        });
        
        // Find and activate the correct nav item
        const targetNav = document.querySelector(`a[href="#${activeId}"]`);
        if (targetNav) {
            targetNav.classList.add('active');
            targetNav.style.backgroundColor = '#6366f1 !important';
            targetNav.style.color = 'white !important';
            targetNav.style.borderRadius = '1.5rem';
            console.log('Activated nav for:', activeId);
        } else {
            console.log('Could not find nav for:', activeId);
        }
    }
    
    // Add click handlers
    navItems.forEach(navItem => {
        navItem.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const sectionId = href.replace('#', '');
            console.log('Clicked nav:', sectionId);
            setActiveNav(sectionId);
        });
    });
    
    // Simple scroll handler
    function handleScroll() {
        const scrollPos = window.scrollY + 200;
        
        let activeSection = null;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                activeSection = section.id;
            }
        });
        
        if (activeSection) {
            setActiveNav(activeSection);
        }
    }
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial call
    setTimeout(handleScroll, 1000);
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
            
            const icon = this.querySelector('.theme-icon');
            if (icon) {
                icon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
            }
        });
    }
    
    // Load saved theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }
    
    console.log('Navigation setup complete');
    
    // Global test function
    window.testNav = function(sectionId) {
        setActiveNav(sectionId);
    };
    
    console.log('Test with: testNav("about")');
});
