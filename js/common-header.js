// Function to load header
function loadHeader() {
    fetch('../common-header.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            initHeaderScripts();
            initMobileMenu(); // Initialize mobile menu functionality
        })
        .catch(error => {
            console.error('Error loading header:', error);
        });
}


// Function to initialize header scripts
function initHeaderScripts() {
    // Mobile menu toggle functionality
    const navbarToggle = document.querySelector('.navbar-toggle');
    const responsiveMenu = document.querySelector('.responsive-menu');
    const mainMenu = document.querySelector('.main-menu');
    
    if (navbarToggle && responsiveMenu && mainMenu) {
        navbarToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            responsiveMenu.classList.toggle('active');
            mainMenu.classList.toggle('active');
        });
    }
    
    // Submenu toggle for mobile
    const submenuItems = document.querySelectorAll('.submenu > .nav-link');
    submenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (window.innerWidth <= 991) {
                e.preventDefault();
                const submenu = this.nextElementSibling;
                if (submenu) {
                    submenu.classList.toggle('show');
                }
            }
        });
    });
}

// Mobile Menu Functionality
function initMobileMenu() {
    // Create burger menu button
    const navbarToggle = document.querySelector('.navbar-toggle');
    if (!navbarToggle) return;
    
    // Create burger icon
    navbarToggle.innerHTML = `
        <button class="navbar-toggler" type="button" aria-label="Toggle navigation">
            <span class="toggler-bar top-bar"></span>
            <span class="toggler-bar middle-bar"></span>
            <span class="toggler-bar bottom-bar"></span>
        </button>
    `;
    
    const navbarToggler = document.querySelector('.navbar-toggler');
    const responsiveMenu = document.querySelector('.responsive-menu');
    const mainMenu = document.querySelector('.main-menu');
    const body = document.body;
    
    // Clone main menu to responsive menu
    if (mainMenu && responsiveMenu) {
        responsiveMenu.innerHTML = mainMenu.innerHTML;
    }
    
    // Toggle mobile menu
    navbarToggler.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        responsiveMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar-toggler') && !e.target.closest('.responsive-menu')) {
            navbarToggler.classList.remove('active');
            responsiveMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    
    // Handle submenu toggle on mobile
    responsiveMenu.addEventListener('click', function(e) {
        const navLink = e.target.closest('.nav-link');
        if (navLink && navLink.nextElementSibling && navLink.nextElementSibling.tagName === 'UL') {
            if (window.innerWidth <= 991) {
                e.preventDefault();
                navLink.classList.toggle('submenu-open');
                navLink.nextElementSibling.classList.toggle('show');
            }
        }
    });
    
    // Close menu when clicking a link
    responsiveMenu.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && !e.target.classList.contains('nav-link')) {
            navbarToggler.classList.remove('active');
            responsiveMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
}

// Add CSS for mobile menu
function addMobileMenuStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Mobile Menu Styles */
        .navbar-toggler {
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            padding: 10px;
            z-index: 1001;
            position: relative;
            width: 30px;
            height: 24px;
        }
        
        .toggler-bar {
            display: block;
            position: absolute;
            width: 100%;
            height: 2px;
            background: #000;
            transition: all 0.3s ease;
        }
        
        .top-bar {
            top: 0;
        }
        
        .middle-bar {
            top: 50%;
            transform: translateY(-50%);
        }
        
        .bottom-bar {
            bottom: 0;
        }
        
        .navbar-toggler.active .top-bar {
            transform: translateY(10px) rotate(45deg);
        }
        
        .navbar-toggler.active .middle-bar {
            opacity: 0;
        }
        
        .navbar-toggler.active .bottom-bar {
            transform: translateY(-10px) rotate(-45deg);
        }
        
        /* Responsive menu */
        .responsive-menu {
            position: fixed;
            top: 0;
            left: -100%;
            width: 80%;
            max-width: 300px;
            height: 100vh;
            background: #fff;
            z-index: 1000;
            padding: 80px 20px 20px;
            overflow-y: auto;
            transition: all 0.3s ease;
            box-shadow: 2px 0 10px rgba(0,0,0,0.1);
        }
        
        .responsive-menu.active {
            left: 0;
        }
        
        /* Mobile styles */
        @media (max-width: 991px) {
            .navbar-toggler {
                display: block;
            }
            
            .main-menu {
                display: none !important;
            }
            
            .responsive-menu .navbar-nav {
                flex-direction: column;
            }
            
            .responsive-menu .nav-item {
                margin-bottom: 15px;
            }
            
            .responsive-menu .nav-link {
                padding: 10px 0;
                position: relative;
            }
            
            .responsive-menu .submenu .nav-link:after {
                content: '+';
                position: absolute;
                right: 0;
            }
            
            .responsive-menu .submenu .nav-link.submenu-open:after {
                content: '-';
            }
            
            .responsive-menu .submenu ul {
                position: static;
                opacity: 1;
                visibility: visible;
                box-shadow: none;
                padding-left: 15px;
                display: none;
            }
            
            .responsive-menu .submenu ul.show {
                display: block;
            }
            
            .header-btn {
                margin-top: 20px;
            }
        }
        
        .menu-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        body.menu-open .menu-overlay {
            opacity: 1;
            visibility: visible;
        }
    `;
    document.head.appendChild(style);
}

// Load header when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    addMobileMenuStyles(); // Add mobile menu styles first
    loadHeader();
});