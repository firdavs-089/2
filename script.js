// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ===== Loading Screen =====
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
    }, 2000);

    // ===== Header Scroll Effect =====
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ===== Theme Toggle =====
    const themeToggle = document.getElementById('theme-toggle-checkbox');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeToggle.checked = true;
        if (mobileThemeToggle) mobileThemeToggle.checked = true;
    }

    // Theme toggle event listeners
    themeToggle.addEventListener('change', toggleTheme);
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('change', toggleTheme);
    }

    function toggleTheme() {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
            themeToggle.checked = false;
            if (mobileThemeToggle) mobileThemeToggle.checked = false;
        } else {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
            themeToggle.checked = true;
            if (mobileThemeToggle) mobileThemeToggle.checked = true;
        }
    }

    // ===== Mobile Menu Toggle =====
    const menuToggle = document.querySelector('.menu-toggle');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');

    menuToggle.addEventListener('click', toggleMobileMenu);
    mobileMenuClose.addEventListener('click', closeMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('open');
        overlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ===== Hero Carousel =====
    const carouselItems = document.querySelectorAll('.carousel-item');
    const carouselDots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentSlide = 0;
    let autoSlideInterval;

    // Initialize carousel
    function initCarousel() {
        showSlide(currentSlide);
        startAutoSlide();

        // Event listeners
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);

        carouselDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });

        // Pause auto slide on hover
        const carouselContainer = document.querySelector('.carousel-container');
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }

    function showSlide(index) {
        // Hide all slides
        carouselItems.forEach(item => {
            item.classList.remove('active');
        });

        // Deactivate all dots
        carouselDots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show current slide and activate current dot
        carouselItems[index].classList.add('active');
        carouselDots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % carouselItems.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
        showSlide(currentSlide);
    }

    function startAutoSlide() {
        stopAutoSlide(); // Clear any existing interval
        autoSlideInterval = setInterval(nextSlide, 6000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Initialize carousel
    initCarousel();

    // ===== Modal Functionality =====
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const showSignupBtn = document.getElementById('show-signup');
    const showLoginBtn = document.getElementById('show-login');

    // Open modal function
    function openModal(modal) {
        closeAllModals(); // Close any open modals first
        modal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal function
    function closeModal(modal) {
        modal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close all modals
    function closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
    }

    // Event listeners for opening modals
    loginBtn.addEventListener('click', () => {
        openModal(loginModal);
    });

    signupBtn.addEventListener('click', () => {
        openModal(signupModal);
    });

    // Event listeners for mobile menu buttons
    const mobileLoginBtn = document.querySelector('.mobile-auth .login-btn');
    const mobileSignupBtn = document.querySelector('.mobile-auth .signup-btn');

    if (mobileLoginBtn) {
        mobileLoginBtn.addEventListener('click', () => {
            closeMobileMenu();
            openModal(loginModal);
        });
    }

    if (mobileSignupBtn) {
        mobileSignupBtn.addEventListener('click', () => {
            closeMobileMenu();
            openModal(signupModal);
        });
    }

    // Event listeners for closing modals
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeAllModals();
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Switch between login and signup
    showSignupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(loginModal);
        openModal(signupModal);
    });

    showLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(signupModal);
        openModal(loginModal);
    });

    // Close modal when clicking outside
    overlay.addEventListener('click', () => {
        closeAllModals();
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // ===== Password Toggle =====
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // ===== Form Validation =====
    const loginForm = document.querySelector('#login-modal form');
    const signupForm = document.querySelector('#signup-modal form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simulate successful login
            alert('Login successful!');
            closeAllModals();
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // Simulate successful signup
            alert('Account created successfully!');
            closeAllModals();
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // ===== Movie Card Hover Animation =====
    const movieCards = document.querySelectorAll('.movie-card');
    
    movieCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.movie-poster-play').style.transform = 'scale(1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.movie-poster-play').style.transform = 'scale(0)';
        });
    });

    // ===== Language Selector =====
    const languageSelect = document.getElementById('language-select');
    const mobileLanguageSelect = document.getElementById('mobile-language-select');
    
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        languageSelect.value = savedLanguage;
        if (mobileLanguageSelect) mobileLanguageSelect.value = savedLanguage;
    }
    
    // Language change event listeners
    languageSelect.addEventListener('change', function() {
        const selectedLanguage = this.value;
        localStorage.setItem('language', selectedLanguage);
        if (mobileLanguageSelect) mobileLanguageSelect.value = selectedLanguage;
        
        // In a real application, this would trigger language change
        console.log(`Language changed to: ${selectedLanguage}`);
    });
    
    if (mobileLanguageSelect) {
        mobileLanguageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            localStorage.setItem('language', selectedLanguage);
            languageSelect.value = selectedLanguage;
            
            // In a real application, this would trigger language change
            console.log(`Language changed to: ${selectedLanguage}`);
        });
    }

    // ===== Newsletter Form =====
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value.trim() === '') {
                alert('Please enter your email address');
                return;
            }
            
            // Simulate successful subscription
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        });
    }

    // ===== API Integration =====
    // This would be where you'd integrate with the movie API
    // For example:
    /*
    async function fetchMovies() {
        try {
            const response = await fetch('http://localhost:5000/api/movies');
            const data = await response.json();
            
            // Process and display the movies
            displayMovies(data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }
    
    function displayMovies(movies) {
        const movieGrid = document.querySelector('.movie-grid');
        movieGrid.innerHTML = '';
        
        movies.forEach(movie => {
            // Create movie card elements
            // Append to movie grid
        });
    }
    
    // Call the function to fetch movies
    fetchMovies();
    */
});