// GWorks Website Main JavaScript
// Enhanced with debugging and improved functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log('GWorks website loaded successfully');
    
    // Initialize all components
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeHeaderScroll();
    initializeForms();
    initializeNewsletter();
    initializeCopyAddress();
    initializeLoadMore();
    initializeSearch();
    initializeQuoteModal();
    initializeImageModal();
    initializeAnimations();
    initializeCounters();
    initializeTestimonialsSlider();
    initializeProjectGallery();
    
    console.log('All components initialized');
});

// Mobile Menu Toggle
function initializeMobileMenu() {
    const mobileMenuButton = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('nav');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            console.log('Mobile menu button clicked');
            mobileMenu.classList.toggle('hidden');
            console.log('Mobile menu hidden:', mobileMenu.classList.contains('hidden'));
            
            // Animate hamburger
            const spans = this.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }
}

// Smooth Scrolling for Anchor Links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Header Scroll Effect
function initializeHeaderScroll() {
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Form Handling
function initializeForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    });
}

function handleFormSubmission(form) {
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showNotification('Form submitted successfully! We will get back to you soon.', 'success');
        form.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Newsletter Subscription
function initializeNewsletter() {
    const newsletterForm = document.querySelector('#newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSubscription(this);
        });
    }
}

function handleNewsletterSubscription(form) {
    const email = form.querySelector('input[type="email"]').value;
    if (email) {
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        form.reset();
    }
}

// Copy Address to Clipboard
function initializeCopyAddress() {
    const copyButtons = document.querySelectorAll('.copy-address');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const address = this.getAttribute('data-address');
            copyToClipboard(address);
        });
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Address copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy address', 'error');
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 transform translate-x-full`;
    
    // Set notification styles based on type
    switch(type) {
        case 'success':
            notification.className += ' bg-green-500 text-white';
            break;
        case 'error':
            notification.className += ' bg-red-500 text-white';
            break;
        case 'warning':
            notification.className += ' bg-yellow-500 text-white';
            break;
        default:
            notification.className += ' bg-blue-500 text-white';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Load More Articles
function initializeLoadMore() {
    const loadMoreButton = document.querySelector('#load-more');
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', loadMoreArticles);
    }
}

function loadMoreArticles() {
    const articlesContainer = document.querySelector('.articles-grid');
    const loadMoreButton = document.querySelector('#load-more');
    
    if (articlesContainer && loadMoreButton) {
        // Simulate loading more articles
        loadMoreButton.textContent = 'Loading...';
        loadMoreButton.disabled = true;
        
        setTimeout(() => {
            // Add more articles (this would normally fetch from server)
            const newArticle = document.createElement('div');
            newArticle.className = 'article-card bg-white rounded-lg shadow-md overflow-hidden animate-fade-in';
            newArticle.innerHTML = `
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2">New Article Title</h3>
                    <p class="text-gray-600 mb-4">This is a newly loaded article...</p>
                    <a href="#" class="text-blue-600 hover:text-blue-800">Read More →</a>
                </div>
            `;
            articlesContainer.appendChild(newArticle);
            
            loadMoreButton.textContent = 'Load More';
            loadMoreButton.disabled = false;
        }, 1000);
    }
}

// Search Functionality
function initializeSearch() {
    const searchToggle = document.querySelector('#search-toggle');
    if (searchToggle) {
        searchToggle.addEventListener('click', toggleSearch);
    }
    
    // Create search container
    createSearchContainer();
}

function toggleSearch() {
    console.log('Toggle search called');
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer) {
        searchContainer.classList.toggle('hidden');
        console.log('Search container hidden:', searchContainer.classList.contains('hidden'));
    } else {
        console.log('Search container not found');
    }
}

function createSearchContainer() {
    if (document.querySelector('.search-container')) return;
    
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 hidden';
    searchContainer.innerHTML = `
        <div class="bg-white rounded-lg p-6 w-full max-w-md">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">Search</h3>
                <button class="text-gray-500 hover:text-gray-700" onclick="toggleSearch()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <input type="text" placeholder="Search..." class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <div class="mt-4">
                <button class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Search
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(searchContainer);
}

// Quote Modal
function initializeQuoteModal() {
    const quoteButtons = document.querySelectorAll('.quote-btn');
    quoteButtons.forEach(button => {
        button.addEventListener('click', openQuoteModal);
    });
    
    // Close modal on outside click
    document.addEventListener('click', function(e) {
        const modal = document.querySelector('#quote-modal');
        if (e.target === modal) {
            closeQuoteModal();
        }
    });
}

function openQuoteModal() {
    const modal = document.querySelector('#quote-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeQuoteModal() {
    const modal = document.querySelector('#quote-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function handleQuoteSubmission(form) {
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        showNotification('Quote request sent successfully! We will contact you soon.', 'success');
        form.reset();
        closeQuoteModal();
        
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Animation System
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// Testimonials Slider
function initializeTestimonialsSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }
    
    // Auto-advance testimonials
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
    
    // Show first testimonial
    if (testimonials.length > 0) {
        showTestimonial(0);
    }
}

// Project Gallery
function initializeProjectGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openImageModal(img.src, img.alt);
            }
        });
    });
}

// Image Modal
function openImageModal(src, alt) {
    const modal = document.createElement('div');
    modal.className = 'image-modal fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="relative max-w-4xl max-h-full">
            <img src="${src}" alt="${alt}" class="max-w-full max-h-full object-contain">
            <button class="absolute top-4 right-4 text-white text-2xl hover:text-gray-300" onclick="closeImageModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.querySelector('.image-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Back to Top Button
window.addEventListener('scroll', function() {
    const backToTop = document.querySelector('#back-to-top');
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
});

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('#dark-mode-toggle i');
    if (icon) {
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    }
}

// Floating Contact Button
function toggleContactMenu() {
    const menu = document.querySelector('#contact-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// Debug Element Visibility Function
function debugElementVisibility(elementId, description = '') {
    const element = document.getElementById(elementId);
    if (element) {
        const isHidden = element.classList.contains('hidden');
        const computedStyle = window.getComputedStyle(element);
        const display = computedStyle.display;
        const visibility = computedStyle.visibility;
        const opacity = computedStyle.opacity;

        console.log(`Debug ${description} (${elementId}):`, {
            hiddenClass: isHidden,
            display: display,
            visibility: visibility,
            opacity: opacity,
            element: element
        });

        // Add debug styling
        if (isHidden) {
            element.classList.add('debug-hidden');
        } else {
            element.classList.add('debug-visible');
        }

        // Remove debug styling after 2 seconds
        setTimeout(() => {
            element.classList.remove('debug-hidden', 'debug-visible');
        }, 2000);
    } else {
        console.log(`Element with ID '${elementId}' not found`);
    }
}

// Export debug function for global access
window.GWorks = {
    debugElementVisibility: debugElementVisibility
};

console.log('GWorks main.js loaded and ready'); 