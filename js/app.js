// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Performance optimization: Use passive event listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeMobileMenu();
    initializeSmoothScroll();
    initializeImpactCounter();
    initializeNewsletterForm();
    initializeButtonEffects(); // Add button effects initialization
    weatherModule.init(); // Initialize weather module
    initializeCtaButtons();
    initializeFeatureButtons();
    initializeFormsIfPresent();
    appearanceManager.init(); // Initialize appearance manager
    authManager.init(); // Initialize authentication manager
}, { passive: true });

// Mobile menu functionality with improved accessibility
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileMenuBtn || !navLinks) return;

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        
        // Accessibility
        const isExpanded = navLinks.classList.contains('active');
        mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', false);
        }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', false);
        }
    });
}

// Smooth scroll with performance optimization
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL without triggering scroll
                history.pushState(null, '', targetId);
            }
        });
    });
}

// Animated impact counter with Intersection Observer
function initializeImpactCounter() {
    const counterElement = document.querySelector('.impact-number');
    if (!counterElement) return;

    const targetNumber = 5280; // Example: 5,280 kg collected
    let currentNumber = 0;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(counterElement);

    function animateCounter() {
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = targetNumber / steps;
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            currentNumber += increment;
            
            if (currentStep === steps) {
                currentNumber = targetNumber;
                clearInterval(interval);
            }

            counterElement.textContent = Math.round(currentNumber).toLocaleString() + ' kg';
        }, duration / steps);
    }
}

// Initialize button ripple effects
function initializeButtonEffects() {
    // Select all buttons and interactive elements that should have 3D effects
    const buttons = document.querySelectorAll('button, .feature-btn, .retry-btn, .nav-links a.highlight, .footer-form button');
    
    buttons.forEach(button => {
        // Add button-3d class if not already present
        if (!button.classList.contains('button-3d')) {
            button.classList.add('button-3d');
        }

        // Add ripple effect handler
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Remove existing ripple class
            this.classList.remove('ripple');
            
            // Set ripple position
            this.style.setProperty('--ripple-x', `${x}px`);
            this.style.setProperty('--ripple-y', `${y}px`);
            
            // Add ripple class to trigger animation
            this.classList.add('ripple');

            // Add loading state for async operations
            if (this.dataset.action) {
                this.classList.add('loading');
                // Remove loading state after animation
                setTimeout(() => this.classList.remove('loading'), 1000);
            }
        });

        // Add hover state handler for mobile
        button.addEventListener('touchstart', function() {
            this.classList.add('hover');
        }, { passive: true });

        button.addEventListener('touchend', function() {
            this.classList.remove('hover');
        }, { passive: true });
    });
}

// Page transition effects
function initializePageTransitions() {
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Theme management
const themeManager = {
    init() {
        this.loadTheme();
        this.setupThemeSelector();
    },

    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'default';
        this.setTheme(savedTheme);
    },

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    },

    setupThemeSelector() {
        const themeSelector = document.querySelector('.theme-selector');
        if (themeSelector) {
            themeSelector.value = localStorage.getItem('theme') || 'default';
            themeSelector.addEventListener('change', (e) => {
                this.setTheme(e.target.value);
            });
        }
    }
};

// Modal functionality
function initializeModal() {
    const modal = document.getElementById('registerModal');
    const closeBtn = modal.querySelector('.close-modal');
    const registerForm = document.getElementById('registerForm');
    const joinButtons = document.querySelectorAll('[data-action="join"], a[href*="join"]');

    // Open modal
    joinButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle form submission
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData.entries());
        
        try {
            // Here you would typically send the data to your backend
            console.log('Registration data:', data);
            
            // Show success message
            alert('Registration successful! Welcome to ShoreSquad!');
            
            // Close modal and reset form
            modal.classList.remove('active');
            registerForm.reset();
            document.body.style.overflow = '';
        } catch (error) {
            console.error('Registration error:', error);
            alert('There was an error processing your registration. Please try again.');
        }
    });
}

// Initialize all interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    initializeMobileMenu();
    initializePageTransitions();
    initializeButtonEffects();
    
    // Theme and appearance
    themeManager.init();
    appearanceManager.init();
    
    // Weather module
    if (document.querySelector('#weather')) {
        weatherModule.init();
    }
    
    // Forms initialization
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        initializeNewsletterForm();
    }
    
    const squadJoinForm = document.getElementById('squad-join-form');
    if (squadJoinForm) {
        initializeSquadJoinForm();
    }
    
    // Modal initialization
    initializeModal();
}, { passive: true });

// Newsletter form handling
function initializeNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = form.querySelector('button');
        const input = form.querySelector('input[type="email"]');
        
        button.classList.add('loading');
        input.disabled = true;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            showFormSuccess(form, 'Thanks for subscribing! 🌊');
            form.reset();
        } catch (error) {
            showFormError(form, 'Oops! Please try again.');
        } finally {
            button.classList.remove('loading');
            input.disabled = false;
        }
    });
}

// Squad join form handling
function initializeSquadJoinForm() {
    const form = document.getElementById('squad-join-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = form.querySelector('button');
        const inputs = form.querySelectorAll('input');
        
        button.classList.add('loading');
        inputs.forEach(input => input.disabled = true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            showFormSuccess(form, 'Welcome to ShoreSquad! 🌊');
            form.reset();
        } catch (error) {
            showFormError(form, 'Oops! Please try again.');
        } finally {
            button.classList.remove('loading');
            inputs.forEach(input => input.disabled = false);
        }
    });
}

// Form feedback helpers
function showFormSuccess(form, message) {
    showFormMessage(form, message, 'success');
}

function showFormError(form, message) {
    showFormMessage(form, message, 'error');
}

function showFormMessage(form, message, type) {
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    form.appendChild(messageDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Weather Module with OpenWeatherMap integration
const weatherModule = {
    apiKey: 'YOUR_OPENWEATHERMAP_API_KEY', // Replace with your API key
    weatherResult: document.getElementById('weather-result'),
    retryButton: document.getElementById('retry-weather'),

    async init() {
        this.setupRetryButton();
        await this.getCurrentWeather();
        await this.getForecast();
    },

    setupRetryButton() {
        if (this.retryButton) {
            this.retryButton.addEventListener('click', async () => {
                this.retryButton.style.display = 'none';
                await this.getCurrentWeather();
            });
        }
    },

    async getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by your browser'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                position => resolve(position),
                error => reject(error),
                { enableHighAccuracy: true }
            );
        });
    },

    async getCurrentWeather() {
        try {
            const position = await this.getCurrentPosition();
            const { latitude, longitude } = position.coords;
            
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}&units=metric`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.displayCurrentWeather(data);
        } catch (error) {
            console.error('Error fetching weather:', error);
            this.handleError(error);
        }
    },

    displayCurrentWeather(data) {
        if (!this.weatherResult) return;

        const temp = Math.round(data.main.temp);
        const condition = data.weather[0].main.toLowerCase();
        const icon = this.getWeatherIcon(condition);

        this.weatherResult.innerHTML = `
            <div class="weather-icon">${icon}</div>
            <div class="weather-text">${temp}°C - ${condition}</div>
        `;
    },

    getWeatherIcon(condition) {
        const icons = {
            'clear': '☀️',
            'clouds': '☁️',
            'rain': '🌧️',
            'drizzle': '🌦️',
            'thunderstorm': '⛈️',
            'snow': '❄️',
            'mist': '🌫️',
            'fog': '🌫️',
            'haze': '🌫️'
        };
        return icons[condition] || '🌤️';
    },

    handleError(error) {
        console.error('Weather error:', error);
        if (this.weatherResult) {
            this.weatherResult.innerHTML = `
                <div class="weather-error">
                    <p>Unable to load weather data</p>
                </div>
            `;
        }
        if (this.retryButton) {
            this.retryButton.style.display = 'block';
        }
    },

    async getForecast() {
        // Existing forecast functionality
        // ...existing forecast code...
    }
};

// Initialize weather module when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // ...existing initialization code...
    weatherModule.init(); // Initialize weather module
}, { passive: true });

// Placeholder for maps integration
const mapsModule = {
    init: async function() {
        // Will be implemented with actual maps API
        console.log('Maps module ready for integration');
    }
};

// Appearance Management
const appearanceManager = {
    settings: {
        theme: 'default'
    },

    init() {
        this.loadSettings();
        this.applySettings();
        this.setupEventListeners();
    },

    loadSettings() {
        const savedSettings = localStorage.getItem('appearanceSettings');
        if (savedSettings) {
            try {
                this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
            } catch (e) {
                console.error('Error loading appearance settings:', e);
            }
        }
    },

    saveSettings() {
        localStorage.setItem('appearanceSettings', JSON.stringify(this.settings));
    },

    applySettings() {
        document.body.setAttribute('data-theme', this.settings.theme);
    },

    setupEventListeners() {
        // Theme selector
        const themeSelector = document.querySelector('.theme-selector');
        if (themeSelector) {
            // Set initial value
            themeSelector.value = this.settings.theme;
            
            themeSelector.addEventListener('change', (e) => {
                this.updateSetting('theme', e.target.value);
            });
        }
    },

    updateSetting(key, value) {
        this.settings[key] = value;
        this.saveSettings();
        this.applySettings();
    }
};

// Authentication Management
const authManager = {
    init() {
        this.checkAuthState();
        this.setupAuthUI();
    },

    checkAuthState() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        this.updateAuthState(isLoggedIn, userData);
    },

    updateAuthState(isLoggedIn, userData = {}) {
        localStorage.setItem('isLoggedIn', isLoggedIn);
        localStorage.setItem('userData', JSON.stringify(userData));
        this.updateUI(isLoggedIn, userData);
    },

    updateUI(isLoggedIn, userData) {
        const navLinks = document.querySelector('.nav-links');
        if (!navLinks) return;

        // Remove existing auth buttons
        const existingAuthBtn = navLinks.querySelector('.auth-btn');
        if (existingAuthBtn) {
            existingAuthBtn.remove();
        }

        // Add appropriate button based on auth state
        const authBtn = document.createElement('a');
        authBtn.className = 'auth-btn highlight';
        
        if (isLoggedIn) {
            authBtn.textContent = 'Sign Out';
            authBtn.href = '#';
            authBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.signOut();
            });
        } else {
            authBtn.textContent = 'Join Squad';
            authBtn.href = 'pages/community.html';
        }

        navLinks.appendChild(authBtn);

        // Update any user-specific UI elements
        document.body.classList.toggle('logged-in', isLoggedIn);
    },

    signOut() {
        // Clear auth state
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userData');
        
        // Update UI
        this.updateAuthState(false, {});
        
        // Show feedback to user
        const notification = document.createElement('div');
        notification.className = 'notification success';
        notification.textContent = 'Successfully signed out!';
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    },

    setupAuthUI() {
        // Update join buttons to handle authentication
        const joinButtons = document.querySelectorAll('[data-action="join"]');
        joinButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                if (!localStorage.getItem('isLoggedIn')) {
                    const modal = document.getElementById('registerModal');
                    if (modal) modal.classList.add('active');
                }
            });
        });

        // Handle registration form submission
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(registerForm);
                const userData = Object.fromEntries(formData.entries());
                
                // In a real app, you would send this to your backend
                // For demo, we'll just store in localStorage
                this.updateAuthState(true, userData);
                
                // Close modal and reset form
                const modal = document.getElementById('registerModal');
                if (modal) {
                    modal.classList.remove('active');
                    registerForm.reset();
                }

                // Show success message
                const notification = document.createElement('div');
                notification.className = 'notification success';
                notification.textContent = 'Welcome to ShoreSquad!';
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.remove();
                }, 3000);
            });
        }
    }
};

// Initialize authentication manager
document.addEventListener('DOMContentLoaded', () => {
    authManager.init();
}, { passive: true });