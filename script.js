// Get Formspree configuration from multiple sources
function getFormspreeEndpoint() {
    // 1. Check config.js file
    if (window.SPARKWAVE_CONFIG && window.SPARKWAVE_CONFIG.formspreeEndpoint) {
        return window.SPARKWAVE_CONFIG.formspreeEndpoint;
    }
    
    // 2. Check meta tag configuration
    const metaFormspree = document.querySelector('meta[name="formspree-endpoint"]');
    if (metaFormspree && metaFormspree.content) {
        return metaFormspree.content;
    }
    
    // 3. Check URL parameter (for testing)
    const urlParams = new URLSearchParams(window.location.search);
    const urlFormspree = urlParams.get('formspree');
    if (urlFormspree) {
        return urlFormspree;
    }
    
    // 4. Fallback to placeholder (demo mode)
    return 'YOUR_FORM_ID';
}

const FORMSPREE_ENDPOINT = getFormspreeEndpoint();

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const themeIcon = document.getElementById('theme-icon');
const themeIconMobile = document.getElementById('theme-icon-mobile');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');
const demoNotice = document.getElementById('demo-notice');
const currentYearElement = document.getElementById('current-year');

// State
let isMobileMenuOpen = false;
let isSubmitting = false;
let currentTheme = 'light';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Initialize theme
    initializeTheme();
    
    // Initialize current year
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Initialize demo notice visibility
    updateDemoNoticeVisibility();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize animations
    initializeAnimations();
    
    console.log('Sparkwave Media website initialized');
});

// Theme Management
function initializeTheme() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    // Apply theme to document
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
    
    // Update icons
    updateThemeIcons();
    
    console.log('Theme initialized:', currentTheme);
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Save preference
    localStorage.setItem('theme', currentTheme);
    
    // Apply to document
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
    
    // Update icons
    updateThemeIcons();
    
    console.log('Theme toggled to:', currentTheme);
}

function updateThemeIcons() {
    const iconName = currentTheme === 'light' ? 'moon' : 'sun';
    
    if (themeIcon) {
        themeIcon.setAttribute('data-lucide', iconName);
    }
    if (themeIconMobile) {
        themeIconMobile.setAttribute('data-lucide', iconName);
    }
    
    // Refresh icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Mobile Menu Management
function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    
    if (mobileMenu) {
        mobileMenu.classList.toggle('open', isMobileMenuOpen);
    }
    
    // Update menu icon
    if (menuIcon) {
        menuIcon.setAttribute('data-lucide', isMobileMenuOpen ? 'x' : 'menu');
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
    
    console.log('Mobile menu toggled:', isMobileMenuOpen);
}

function closeMobileMenu() {
    if (isMobileMenuOpen) {
        toggleMobileMenu();
    }
}

// Smooth Scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        closeMobileMenu();
        console.log('Scrolled to:', sectionId);
    }
}

// Contact Form Management
async function handleContactFormSubmit(e) {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    isSubmitting = true;
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    console.log('Form submitted:', data);
    
    // Update button state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.btn-text');
    const originalText = buttonText.textContent;
    
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    buttonText.textContent = 'Sending';
    
    try {
        // Check if Formspree endpoint is configured
        if (!FORMSPREE_ENDPOINT || FORMSPREE_ENDPOINT === 'YOUR_FORM_ID') {
            // Demo mode - no real endpoint configured
            await simulateFormSubmission();
            
            showToast(
                'Demo Mode Active',
                'Form data logged to console. Replace FORMSPREE_ENDPOINT in script.js for real submissions.',
                'info'
            );
            
            // Reset form in demo mode
            e.target.reset();
        } else {
            // Real Formspree submission
            const response = await fetch(`https://formspree.io/f/${FORMSPREE_ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    ...data,
                    _subject: `New contact form submission from ${data.name}`
                })
            });

            if (response.ok) {
                showToast(
                    'Message sent successfully!',
                    "We'll get back to you within 24 hours.",
                    'success'
                );
                
                // Reset form on success
                e.target.reset();
            } else {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
            }
        }
    } catch (error) {
        console.error('Form submission error:', error);
        
        showToast(
            'Failed to send message',
            'Please try again or contact us directly. Check your internet connection.',
            'error'
        );
        
        // Don't reset form on error so user doesn't lose their input
    } finally {
        // Restore button state
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        buttonText.textContent = originalText;
        isSubmitting = false;
    }
}

async function simulateFormSubmission() {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
}

function updateDemoNoticeVisibility() {
    if (demoNotice) {
        const isDemo = !FORMSPREE_ENDPOINT || FORMSPREE_ENDPOINT === 'YOUR_FORM_ID';
        demoNotice.style.display = isDemo ? 'block' : 'none';
    }
}

// Toast Notifications
function showToast(title, message, type = 'success') {
    if (!toast) return;
    
    const toastTitle = document.getElementById('toast-title');
    const toastMessage = document.getElementById('toast-message');
    
    if (toastTitle) toastTitle.textContent = title;
    if (toastMessage) toastMessage.textContent = message;
    
    // Set toast type
    toast.className = `toast ${type}`;
    
    // Show toast
    toast.classList.add('show');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideToast();
    }, 5000);
    
    console.log('Toast shown:', { title, message, type });
}

function hideToast() {
    if (toast) {
        toast.classList.remove('show');
    }
}

// Animation Management
function initializeAnimations() {
    // Create intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Handle staggered animations
                const delay = entry.target.getAttribute('data-animate-delay');
                if (delay) {
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
                
                // Special handling for stats
                if (entry.target.classList.contains('stat-item')) {
                    const delay = entry.target.getAttribute('data-animate-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, parseInt(delay));
                }
            }
        });
    }, observerOptions);
    
    // Observe elements with animation attributes
    document.querySelectorAll('[data-animate]').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // Observe service cards
    document.querySelectorAll('.service-card').forEach(el => {
        observer.observe(el);
    });
    
    // Observe stat items
    document.querySelectorAll('.stat-item').forEach(el => {
        observer.observe(el);
    });
    
    console.log('Animations initialized');
}

// Event Handlers
function handleLearnMore(serviceName) {
    console.log('Learn more clicked for:', serviceName);
    showToast(
        'Service Information',
        `Learn more about ${serviceName}. This would typically open a detailed service page.`,
        'info'
    );
}

function handleSocialClick(platform) {
    console.log('Social link clicked:', platform);
    showToast(
        'Social Media',
        `This would open our ${platform} page. Links can be updated in the footer section.`,
        'info'
    );
}

function handleLegalClick(type) {
    console.log('Legal link clicked:', type);
    showToast(
        'Legal Pages',
        `This would open our ${type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'} page.`,
        'info'
    );
}

// Event Listeners Setup
function setupEventListeners() {
    // Theme toggle buttons
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme);
    }
    
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
    
    // Close mobile menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && isMobileMenuOpen) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMobileMenuOpen && 
            !mobileMenu.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMobileMenuOpen) {
            closeMobileMenu();
        }
    });
    
    console.log('Event listeners setup complete');
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Global function declarations for HTML onclick handlers
window.scrollToSection = scrollToSection;
window.handleLearnMore = handleLearnMore;
window.handleSocialClick = handleSocialClick;
window.handleLegalClick = handleLegalClick;
window.hideToast = hideToast;

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        scrollToSection,
        toggleTheme,
        toggleMobileMenu,
        handleContactFormSubmit,
        showToast,
        hideToast
    };
}

console.log('Script.js loaded successfully');