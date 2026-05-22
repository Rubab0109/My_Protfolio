// ========== HAMBURGER MENU =========
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ========== SMOOTH SCROLLING =========
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

// ========== SCROLL REVEAL ANIMATION =========
const revealElements = document.querySelectorAll('.project-card, .service-card, .about-card');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight && elementBottom > 0) {
            element.classList.add('reveal', 'show');
        }
    });
};

// Trigger on scroll
window.addEventListener('scroll', revealOnScroll);
// Trigger on load
revealOnScroll();

// ========== NAVBAR ACTIVE LINK =========
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========== CONTACT FORM HANDLING =========
const contactForm = document.getElementById('contactForm');

if (contactForm) {
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Validate form
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Create mailto link
    const mailtoLink = `mailto:umerubab.dev@example.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    showNotification('Message prepared! Your email client will open.');
    
    // Reset form
    contactForm.reset();
});
}

// ========== NOTIFICATION FUNCTION =========
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #001f3f;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        animation: slideInNotification 0.5s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInNotification {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutNotification {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutNotification 0.5s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 4000);
}

// ========== ADD STAGGERED ANIMATION TO SKILL CARDS =========
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
    card.style.animation = `fadeIn 0.8s ease-out ${0.1 * index}s forwards`;
    card.style.opacity = '0';
});

// ========== BUTTON RIPPLE EFFECT =========
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
            animation: rippleAnimation 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to stylesheet
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleAnimation {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ========== SCROLL PROGRESS BAR =========
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #0066cc, #87ceeb);
    z-index: 999;
    width: 0%;
    transition: width 0.3s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrollPercentage + '%';
});

// ========== PAGE LOAD ANIMATION =========
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ========== DETAIL BUTTON FUNCTIONALITY =========
document.querySelectorAll('button.btn-outline').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const projectCard = this.closest('.project-card');
        const projectTitle = projectCard.querySelector('h3').textContent;
        const projectDescription = projectCard.querySelector('.project-description').textContent;
        const projectTech = Array.from(projectCard.querySelectorAll('.tech-tag')).map(tag => tag.textContent).join(', ');
        
        // Create modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease-out;
        `;
        
        const content = document.createElement('div');
        content.style.cssText = `
            background: white;
            padding: 40px;
            border-radius: 15px;
            max-width: 600px;
            width: 90%;
            box-shadow: 0 10px 50px rgba(0, 0, 0, 0.3);
            animation: slideInDown 0.5s ease-out;
            position: relative;
        `;
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕';
        closeBtn.style.cssText = `
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #001f3f;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        `;
        
        closeBtn.addEventListener('mouseover', () => {
            closeBtn.style.background = '#f0f4ff';
        });
        closeBtn.addEventListener('mouseout', () => {
            closeBtn.style.background = 'none';
        });
        
        content.innerHTML = `
            <h2 style="color: #001f3f; margin-bottom: 15px; font-size: 1.8rem;">${projectTitle}</h2>
            <p style="color: #666666; line-height: 1.8; margin-bottom: 20px;">${projectDescription}</p>
            <div style="margin-top: 20px;">
                <h4 style="color: #0066cc; margin-bottom: 10px;">Technologies Used:</h4>
                <p style="color: #666666;">${projectTech}</p>
            </div>
            <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                <p style="color: #999999; font-size: 0.9rem;">This project showcases expertise in AI development, web technologies, and modern development practices. For more information, please check the GitHub repository or contact for collaboration.</p>
            </div>
        `;
        
        content.appendChild(closeBtn);
        modal.appendChild(content);
        document.body.appendChild(modal);
        
        // Add animations to style
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            @keyframes slideInDown {
                from {
                    transform: translateY(-50px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(modalStyle);
        
        // Close modal on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.animation = 'fadeIn 0.3s ease-out reverse';
                setTimeout(() => modal.remove(), 300);
            }
        });
        
        // Close button functionality
        closeBtn.addEventListener('click', () => {
            modal.style.animation = 'fadeIn 0.3s ease-out reverse';
            setTimeout(() => modal.remove(), 300);
        });
        
        // Close on Escape key
        const closeOnEscape = (e) => {
            if (e.key === 'Escape') {
                modal.style.animation = 'fadeIn 0.3s ease-out reverse';
                setTimeout(() => modal.remove(), 300);
                document.removeEventListener('keydown', closeOnEscape);
            }
        };
        document.addEventListener('keydown', closeOnEscape);
    });
});

// ========== SMOOTH HOVER EFFECT ON CARDS =========
document.querySelectorAll('.service-card, .project-card, .about-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) * 0.05;
        const rotateY = (centerX - x) * 0.05;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ========== KEYBOARD NAVIGATION =========
document.addEventListener('keydown', (e) => {
    // Skip to main content with Ctrl+Shift+M
    if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === 'M') {
        document.querySelector('#home').focus();
    }
});

// ========== INITIALIZATION =========
console.log('Portfolio loaded successfully!');
