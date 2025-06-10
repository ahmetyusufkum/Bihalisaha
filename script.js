// AOS Animasyon Kütüphanesi Başlatma
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Navbar Scroll Efekti
const navbar = document.querySelector('.navbar');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = 'var(--shadow)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Mobil Menü Toggle
mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Aktif Menü Linkini Belirleme
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Mobil menüyü kapat
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
});

// Form Gönderimi
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        try {
            submitButton.disabled = true;
            submitButton.textContent = 'Gönderiliyor...';

            // API endpoint'inizi buraya ekleyin
            // const response = await fetch('/api/submit', {
            //     method: 'POST',
            //     body: formData
            // });

            // Şimdilik başarılı gönderim simülasyonu
            await new Promise(resolve => setTimeout(resolve, 1000));

            showNotification('Mesajınız başarıyla gönderildi!', 'success');
            form.reset();
        } catch (error) {
            showNotification('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
});

// Bildirim Gösterme Fonksiyonu
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animasyon için setTimeout
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Bildirimi kaldır
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Lazy Loading için Intersection Observer
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Sayfa Yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    // Sayfa yüklendiğinde navbar'ı kontrol et
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = 'var(--shadow)';
    }

    // Mobil menü için event listener'ları ekle
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
});

// Modal açma/kapama
const downloadBtn = document.querySelector('.cta-buttons .btn.primary');
const downloadBtnNav = document.querySelector('.btn-login');
const modal = document.getElementById('download-modal');
const closeModal = document.querySelector('.close-modal');

function openDownloadModal(e) {
    e.preventDefault();
    modal.classList.add('show');
}

if (downloadBtn && modal && closeModal) {
    downloadBtn.addEventListener('click', openDownloadModal);
    closeModal.addEventListener('click', function() {
        modal.classList.remove('show');
    });
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
}
if (downloadBtnNav && modal) {
    downloadBtnNav.addEventListener('click', openDownloadModal);
}

// Hero arka plan slider
const heroBgs = document.querySelectorAll('.hero-bg');
let heroBgIndex = 0;
if (heroBgs.length > 1) {
    setInterval(() => {
        heroBgs[heroBgIndex].classList.remove('active');
        heroBgIndex = (heroBgIndex + 1) % heroBgs.length;
        heroBgs[heroBgIndex].classList.add('active');
    }, 5000);
}

// Hero arka plan slider
const courtReserveBtns = document.querySelectorAll('.court-card .btn');
if (courtReserveBtns && modal) {
    courtReserveBtns.forEach(btn => {
        btn.addEventListener('click', openDownloadModal);
    });
}

// Hemen Kaydol, Üye Ol, Rezervasyon Yap butonları için modal açma
const modalTriggerTexts = [
    'Hemen Kaydol',
    'Üye Ol',
    'Rezervasyon Yap'
];
document.querySelectorAll('.btn.primary').forEach(btn => {
    if (modalTriggerTexts.includes(btn.textContent.trim())) {
        btn.addEventListener('click', openDownloadModal);
    }
}); 