// Mobile Menu Functionality
function showMenu() {
    const navLinks = document.getElementById('navLinks');
    const overlay = document.querySelector('.nav-overlay');
    navLinks.style.right = '0';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
}

function hideMenu() {
    const navLinks = document.getElementById('navLinks');
    const overlay = document.querySelector('.nav-overlay');
    navLinks.style.right = '-300px';
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Function to handle section visibility
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const navLinks = document.getElementById('navLinks');
    const menuIcon = document.querySelector('.fa-bars');
    const closeIcon = document.querySelector('.fa-times');

    menuIcon.addEventListener('click', showMenu);
    closeIcon.addEventListener('click', hideMenu);

    // Section visibility handling
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    const logo = document.querySelector('.logo');

    // Hide all sections except home initially
    sections.forEach(section => {
        if (section.id !== 'home') {
            section.style.opacity = '0';
            section.style.display = 'none';
            section.style.transform = 'translateY(20px)';
        }
    });

    // Function to handle section visibility with animations
    function showSection(sectionId) {
        // Hide all sections with fade out and slide up
        sections.forEach(section => {
            if (section.style.display !== 'none') {
                section.style.opacity = '0';
                section.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });

        // Show target section with fade in and slide up
        setTimeout(() => {
            const targetSection = document.getElementById(sectionId);
            targetSection.style.display = 'block';
            targetSection.style.transform = 'translateY(20px)';
            
            // Force reflow
            targetSection.offsetHeight;
            
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';
            
            // Animate content elements
            const elements = targetSection.querySelectorAll('.section-header, .feature-card, .facility-card, .plan-card, .testimonial-card, .about-section, .info-item');
            elements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(20px)';
                    el.style.transition = 'all 0.5s ease';
                    
                    // Force reflow
                    el.offsetHeight;
                    
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 300);

        // Update active nav item with animation
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${sectionId}`) {
                item.classList.add('active');
                item.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    item.style.transform = 'scale(1)';
                }, 200);
            }
        });

        // Hide mobile menu if open
        hideMenu();

        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Add click event listeners to nav items
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = item.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });

    // Logo click to return to home with animation
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        logo.style.transform = 'scale(0.9)';
        setTimeout(() => {
            logo.style.transform = 'scale(1)';
            showSection('home');
        }, 200);
    });

    // Add hover effects to navigation items
    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (!item.classList.contains('active')) {
                item.style.transform = 'translateY(-2px)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (!item.classList.contains('active')) {
                item.style.transform = 'translateY(0)';
            }
        });
    });

    // Header scroll effect with smooth transition
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
            header.style.transform = 'translateY(-100%)';
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
            header.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // Form submission handling with animation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('.submit-button');
            submitButton.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                submitButton.style.transform = 'scale(1)';
                
                // Get form data
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                // Here you would typically send the data to a server
                console.log('Form submitted:', data);
                
                // Show success message with animation
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(20px)';
                
                this.appendChild(successMessage);
                
                setTimeout(() => {
                    successMessage.style.opacity = '1';
                    successMessage.style.transform = 'translateY(0)';
                }, 100);
                
                this.reset();
                
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    successMessage.style.transform = 'translateY(-20px)';
                    setTimeout(() => successMessage.remove(), 300);
                }, 3000);
            }, 200);
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation
    document.querySelectorAll('.feature-card, .facility-card, .plan-card, .testimonial-card, .gallery-item').forEach(el => {
        observer.observe(el);
    });

    // Add click event listener for overlay
    const overlay = document.querySelector('.nav-overlay');
    overlay.addEventListener('click', hideMenu);

    // Section Menu Functionality
    const sectionMenus = document.querySelectorAll('.section-menu');
    
    sectionMenus.forEach(menu => {
        const dropdown = menu.querySelector('.section-dropdown');
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target)) {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateY(10px)';
            }
        });

        // Toggle dropdown on click
        menu.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Close all other dropdowns
            sectionMenus.forEach(otherMenu => {
                if (otherMenu !== menu) {
                    const otherDropdown = otherMenu.querySelector('.section-dropdown');
                    otherDropdown.style.opacity = '0';
                    otherDropdown.style.visibility = 'hidden';
                    otherDropdown.style.transform = 'translateY(10px)';
                }
            });

            // Toggle current dropdown
            const isVisible = dropdown.style.visibility === 'visible';
            
            if (isVisible) {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateY(10px)';
            } else {
                dropdown.style.opacity = '1';
                dropdown.style.visibility = 'visible';
                dropdown.style.transform = 'translateY(0)';
            }
        });

        // Handle dropdown item clicks
        const dropdownItems = dropdown.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const action = item.querySelector('i').className;
                const sectionTitle = menu.closest('.section-header').querySelector('h2').textContent;
                
                if (action.includes('share')) {
                    // Implement share functionality
                    if (navigator.share) {
                        navigator.share({
                            title: sectionTitle,
                            text: 'Check out this section from Study Lane Library!',
                            url: window.location.href
                        });
                    } else {
                        alert('Share functionality is not supported on this browser.');
                    }
                } else if (action.includes('bookmark')) {
                    // Implement save functionality
                    alert('Section saved to bookmarks!');
                } else if (action.includes('print')) {
                    // Implement print functionality
                    window.print();
                }
                
                // Close dropdown after action
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateY(10px)';
            });
        });
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            hideMenu();
        }
    });
});

// Add scroll event listener for header background
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
} 