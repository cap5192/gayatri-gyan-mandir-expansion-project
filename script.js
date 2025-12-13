/**
 * Gayatri Gyan Mandir - Interactive Scripts
 * Modern, Beautiful, Spiritual
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    // initDonationForm(); // Removed - donate button links directly to donation page
    initScrollReveal();
    initSmoothScroll();
    initMobileMenu();
});

/**
 * Navbar scroll behavior
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.background = 'rgba(255, 249, 240, 0.95)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(255, 249, 240, 0.8)';
        }

        lastScroll = currentScroll;
    });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');

            // Create mobile menu if it doesn't exist
            let mobileMenu = document.querySelector('.mobile-menu');

            if (!mobileMenu) {
                mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';
                mobileMenu.innerHTML = `
                    <nav class="mobile-nav">
                        <a href="#about">About</a>
                        <a href="#mission">Mission</a>
                        <a href="#project">Expansion</a>
                        <a href="#contribute">Contribute</a>
                        <a href="#contribute" class="mobile-cta">Donate Now</a>
                    </nav>
                `;
                document.body.appendChild(mobileMenu);

                // Add styles for mobile menu
                const style = document.createElement('style');
                style.textContent = `
                    .mobile-menu {
                        position: fixed;
                        top: 70px;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(255, 249, 240, 0.98);
                        backdrop-filter: blur(20px);
                        z-index: 999;
                        padding: 2rem;
                        transform: translateX(100%);
                        transition: transform 0.3s ease;
                    }
                    .mobile-menu.active {
                        transform: translateX(0);
                    }
                    .mobile-nav {
                        display: flex;
                        flex-direction: column;
                        gap: 1.5rem;
                    }
                    .mobile-nav a {
                        font-size: 1.25rem;
                        font-weight: 500;
                        color: #374151;
                        padding: 0.5rem 0;
                        border-bottom: 1px solid #E5E7EB;
                    }
                    .mobile-nav .mobile-cta {
                        background: linear-gradient(135deg, #FF6B2C 0%, #FFB347 100%);
                        color: white;
                        text-align: center;
                        padding: 1rem;
                        border-radius: 9999px;
                        border: none;
                        margin-top: 1rem;
                    }
                    .mobile-menu-btn.active span:nth-child(1) {
                        transform: rotate(45deg) translate(5px, 5px);
                    }
                    .mobile-menu-btn.active span:nth-child(2) {
                        opacity: 0;
                    }
                    .mobile-menu-btn.active span:nth-child(3) {
                        transform: rotate(-45deg) translate(7px, -6px);
                    }
                `;
                document.head.appendChild(style);

                // Close menu on link click
                mobileMenu.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        mobileMenu.classList.remove('active');
                        menuBtn.classList.remove('active');
                    });
                });
            }

            mobileMenu.classList.toggle('active');
        });
    }
}

// Donation form functionality removed - donate button links directly to donation page

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Add styles
    const colors = {
        success: { bg: '#10B981', border: '#059669' },
        warning: { bg: '#F59E0B', border: '#D97706' },
        error: { bg: '#EF4444', border: '#DC2626' },
        info: { bg: '#3B82F6', border: '#2563EB' }
    };

    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: ${colors[type].bg};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;

    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.25rem;
                cursor: pointer;
                padding: 0;
                line-height: 1;
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/**
 * Scroll reveal animations
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.about-card, .mission-card, .feature-card, .contribute-way');

    // Add reveal class
    reveals.forEach(el => {
        el.classList.add('reveal');
    });

    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        reveals.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;

            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    }

    // Initial check
    checkReveal();

    // Check on scroll
    window.addEventListener('scroll', checkReveal, { passive: true });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Add parallax effect to hero section
 */
function initParallax() {
    const hero = document.querySelector('.hero');
    const orbs = document.querySelectorAll('.gradient-orb');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;

        orbs.forEach((orb, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            orb.style.transform = `translateY(${rate * direction * 0.5}px)`;
        });
    }, { passive: true });
}

// Initialize parallax
initParallax();

/**
 * Counter animation for stats
 */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .stat-value');

    counters.forEach(counter => {
        const target = counter.innerText.replace(/[^0-9]/g, '');
        const suffix = counter.innerText.replace(/[0-9,]/g, '');

        if (!target) return;

        let count = 0;
        const increment = parseInt(target) / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const updateCounter = () => {
            count += increment;
            if (count < parseInt(target)) {
                counter.innerText = Math.ceil(count).toLocaleString() + suffix;
                setTimeout(updateCounter, stepTime);
            } else {
                counter.innerText = parseInt(target).toLocaleString() + suffix;
            }
        };

        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

// Initialize counters
animateCounters();
