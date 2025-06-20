// متغيرات عامة
let typingText = '';
let typingSpeed = 100;
let eraseSpeed = 50;
let delayBetweenTexts = 2000;

// النصوص المتحركة
const texts = [
    'من التصيد الإلكتروني',
    'من المحتالين',
    'من المواقع المزيفة',
    'حساباتك الشخصية'
];

// تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // بدء النص المتحرك
    startTypingAnimation();
    
    // إضافة مستمعي الأحداث
    addEventListeners();
    
    // تحريك العدادات عند الوصول إليها
    observeStatsSection();
    
    // إضافة التأثيرات البصرية
    addVisualEffects();
});

// النص المتحرك
function startTypingAnimation() {
    const typingElement = document.getElementById('typingText');
    let textIndex = 0;
    
    function typeText() {
        const currentText = texts[textIndex];
        let charIndex = 0;
        
        function addChar() {
            if (charIndex < currentText.length) {
                typingElement.textContent += currentText.charAt(charIndex);
                charIndex++;
                setTimeout(addChar, typingSpeed);
            } else {
                setTimeout(eraseText, delayBetweenTexts);
            }
        }
        
        function eraseText() {
            if (typingElement.textContent.length > 0) {
                typingElement.textContent = typingElement.textContent.slice(0, -1);
                setTimeout(eraseText, eraseSpeed);
            } else {
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(typeText, 500);
            }
        }
        
        addChar();
    }
    
    typeText();
}

// إضافة مستمعي الأحداث
function addEventListeners() {
    // النقر على بطاقات التجربة
    const demoCards = document.querySelectorAll('.demo-card');
    demoCards.forEach(card => {
        card.addEventListener('click', function() {
            const platform = this.dataset.platform;
            openDemo(platform);
        });
        
        // تأثير الحركة عند التحويم
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // التبديل بين التبويبات
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            switchTab(tabId);
        });
    });
    
    // شريط التنقل المتجاوب
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // التمرير السلس
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// فتح التجربة التفاعلية
function openDemo(platform) {
    const modal = document.getElementById('demoModal');
    const modalTitle = document.getElementById('modalTitle');
    const demoFrame = document.getElementById('demoFrame');
    
    let url = '';
    let title = '';
    
    switch(platform) {
        case 'instagram':
            url = 'login.html';
            title = '🔍 تجربة Instagram التعليمية';
            break;
        case 'facebook':
            url = 'facebook-login.html';
            title = '🔍 تجربة Facebook التعليمية';
            break;
        case 'quiz':
            url = 'quiz.html';
            title = '🧠 اختبار مهارات الكشف';
            break;
    }
    
    modalTitle.textContent = title;
    demoFrame.src = url;
    modal.classList.add('active');
    
    // إضافة تحليلات استخدام
    trackUsage(platform);
}

// إغلاق النافذة المنبثقة
function closeModal() {
    const modal = document.getElementById('demoModal');
    const demoFrame = document.getElementById('demoFrame');
    
    modal.classList.remove('active');
    demoFrame.src = '';
}

// بدء التجربة
function startDemo() {
    // تأثير بصري
    const btn = event.target;
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
        scrollToSection('demo');
    }, 150);
}

// التمرير إلى قسم معين
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // تعديل للشريط العلوي
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// التبديل بين التبويبات
function switchTab(tabId) {
    // إزالة الفئة النشطة من جميع الأزرار والألواح
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // إضافة الفئة النشطة للعناصر المحددة
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// مراقبة قسم الإحصائيات لتحريك العدادات
function observeStatsSection() {
    const statsSection = document.getElementById('stats');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// تحريك العدادات
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 30);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// إضافة التأثيرات البصرية
function addVisualEffects() {
    // تأثير الجسيمات المتحركة
    createFloatingParticles();
    
    // تأثير المؤشر التفاعلي
    addCustomCursor();
    
    // تأثير التمرير المتقدم
    addScrollEffects();
}

// إنشاء جسيمات متحركة
function createFloatingParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
            pointer-events: none;
        `;
        hero.appendChild(particle);
    }
    
    // إضافة CSS للحركة
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// مؤشر تفاعلي مخصص
function addCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        display: none;
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.display = 'block';
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });
}

// تأثيرات التمرير المتقدمة
function addScrollEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        // تأثير parallax للخلفية
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${parallax}px)`;
        }
        
        // تأثير fade للعناصر
        const elements = document.querySelectorAll('.demo-card, .learning-card');
        elements.forEach(element => {
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const windowHeight = window.innerHeight;
            
            if (scrolled > elementTop - windowHeight + elementHeight / 2) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });
}

// تتبع الاستخدام
function trackUsage(action) {
    console.log(`تم تسجيل الاستخدام: ${action}`);
    // يمكن إضافة تحليلات حقيقية هنا
}

// إضافة الإشعارات التفاعلية
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4facfe' : type === 'warning' ? '#fa709a' : '#667eea'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// إضافة CSS للإشعارات
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyle);
