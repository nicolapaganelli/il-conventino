// Language switching functionality
let currentLang = localStorage.getItem('selectedLanguage') || 'de';

function updateContent(lang) {
    currentLang = lang;
    localStorage.setItem('selectedLanguage', lang);
    document.documentElement.lang = lang;

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const keys = element.dataset.i18n.split('.');
        let value = translations[lang];
        keys.forEach(key => {
            if (value) {
                value = value[key];
            }
        });
        
        if (value) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = value;
            } else {
                element.textContent = value;
            }
        }
    });

    // Update specific elements without data-i18n
    document.querySelector('.hero p').textContent = translations[lang].hero.subtitle;
    document.querySelector('.hero .cta-button').textContent = translations[lang].hero.cta;
    
    // Update features
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        const features = ['architecture', 'pool', 'garden', 'wine'];
        const feature = features[index];
        card.querySelector('h3').textContent = translations[lang].features[feature].title;
        card.querySelector('p').textContent = translations[lang].features[feature].desc;
    });

    // Update gallery captions
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryTypes = ['main', 'pool', 'garden'];
    galleryItems.forEach((item, index) => {
        const type = galleryTypes[index];
        item.querySelector('h3').textContent = translations[lang].gallery[type].title;
        item.querySelector('p').textContent = translations[lang].gallery[type].desc;
    });

    // Update pricing
    const priceCard = document.querySelector('.price-card');
    priceCard.querySelector('h3').textContent = translations[lang].pricing.apartment.title;
    priceCard.querySelector('.price').textContent = translations[lang].pricing.apartment.price;
    const features = priceCard.querySelectorAll('ul li');
    translations[lang].pricing.apartment.features.forEach((feature, index) => {
        features[index].textContent = feature;
    });
    priceCard.querySelector('.book-button').textContent = translations[lang].pricing.apartment.cta;

    // Update contact form
    const form = document.querySelector('#contact-form');
    form.querySelector('input[type="text"]').placeholder = translations[lang].contact.form.name;
    form.querySelector('input[type="email"]').placeholder = translations[lang].contact.form.email;
    form.querySelector('textarea').placeholder = translations[lang].contact.form.message;
    form.querySelector('button').textContent = translations[lang].contact.form.submit;

    // Update footer
    document.querySelector('.footer-section p').textContent = translations[lang].footer.slogan;
    document.querySelector('.footer-bottom p').textContent = `© 2024 Il Conventino Agriturismo. ${translations[lang].footer.copyright}`;

    // Update current language display
    const currentLangButton = document.querySelector('.current-lang');
    currentLangButton.querySelector('img').src = `https://flagcdn.com/24x18/${lang === 'en' ? 'gb' : lang}.png`;
    currentLangButton.querySelector('span').textContent = lang.toUpperCase();
}

// Language switcher event listeners
document.querySelectorAll('.lang-dropdown li').forEach(li => {
    li.addEventListener('click', () => {
        const lang = li.dataset.lang;
        updateContent(lang);
    });
});

// Initialize with saved language or default
document.addEventListener('DOMContentLoaded', () => {
    updateContent(currentLang);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Add scroll-based header styling
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
        header.style.backgroundColor = 'var(--white)';
        header.style.boxShadow = 'none';
    }
});

// Initialize map (if using a map service)
function initMap() {
    // This function would be implemented based on your chosen map service
    // (Google Maps, Mapbox, etc.)
    console.log('Map initialization would go here');
}

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });
}); 