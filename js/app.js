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
}, { passive: true });

// Mobile menu functionality with improved accessibility
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileMenuBtn || !navLinks) return;

    mobileMenuBtn.addEventListener('click', () => {
        const isExpanded = navLinks.classList.contains('active');
        navLinks.classList.toggle('active');
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        
        // Animate hamburger to X
        mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.classList.remove('active');
        }
    });

    // Handle ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.classList.remove('active');
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

// Newsletter form with validation and feedback
function initializeNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const emailInput = form.querySelector('input[type="email"]');
        const submitButton = form.querySelector('button');
        
        if (!emailInput || !submitButton) return;
        
        // Basic validation
        if (!isValidEmail(emailInput.value)) {
            showFormFeedback('Please enter a valid email address', 'error');
            return;
        }

        // Disable form during submission
        emailInput.disabled = true;
        submitButton.disabled = true;
        
        try {
            // Simulated API call - replace with actual endpoint
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            showFormFeedback('Thanks for joining the squad! 🌊', 'success');
            form.reset();
        } catch (error) {
            showFormFeedback('Oops! Something went wrong. Please try again.', 'error');
        } finally {
            emailInput.disabled = false;
            submitButton.disabled = false;
        }
    });
}

// Utility functions
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormFeedback(message, type) {
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = `form-feedback ${type}`;
    feedbackDiv.textContent = message;
    
    const form = document.getElementById('newsletter-form');
    const existingFeedback = form.querySelector('.form-feedback');
    
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    form.appendChild(feedbackDiv);
    setTimeout(() => feedbackDiv.remove(), 5000);
}

// Placeholder for weather API integration
const weatherModule = {
    init: async function() {
        // Will be implemented with actual weather API
        console.log('Weather module ready for integration');
    }
};

// Placeholder for maps integration
const mapsModule = {
    init: async function() {
        // Will be implemented with actual maps API
        console.log('Maps module ready for integration');
    }
};