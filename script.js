// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('count-up')) {
                startCountAnimation(entry.target);
            }
        }
    });
}, observerOptions);

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Add animation to advantage items
    const advantageItems = document.querySelectorAll('.advantage-item');
    advantageItems.forEach(item => {
        item.classList.add('fade-in');
        observer.observe(item);
    });

    // Add number counter animation to proof items
    const proofNumbers = document.querySelectorAll('.proof-item h3');
    proofNumbers.forEach(number => {
        number.classList.add('count-up');
        observer.observe(number);
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle swipe hint auto-hide
    const advantagesGrid = document.querySelector('.advantages-grid');
    const swipeHint = document.querySelector('.swipe-hint');
    
    if (advantagesGrid && swipeHint) {
        const hintTimer = setTimeout(() => swipeHint.style.display = 'none', 6000);
        advantagesGrid.addEventListener('scroll', () => clearTimeout(hintTimer), {once: true});
    }

    // Handle advantages slider dots
    (function(){
        const slider = document.querySelector('.advantages-grid');
        const slides = slider ? slider.querySelectorAll('.advantage-item') : [];
        const dotsWrap = document.querySelector('.slider-dots');
        if(!slider || !dotsWrap) return;

        /* build dots */
        slides.forEach((_, idx) => {
            const b = document.createElement('button');
            if(idx === 0) b.classList.add('active');
            b.addEventListener('click', () => slider.scrollTo({
                left: slider.scrollWidth/slides.length*idx,
                behavior: 'smooth'
            }));
            dotsWrap.appendChild(b);
        });

        /* helper: throttle scroll for perf */
        let ticking = false;
        slider.addEventListener('scroll', () => {
            if(ticking) return;
            window.requestAnimationFrame(() => {
                const center = slider.scrollLeft + slider.offsetWidth/2;
                const slideWidth = slider.scrollWidth / slides.length;
                const idx = Math.round(center / slideWidth - 0.5);
                dotsWrap.querySelectorAll('button').forEach((d,i) =>
                    d.classList.toggle('active', i === idx)
                );
                ticking = false;
            });
            ticking = true;
        }, {passive: true});
    })();
});

// Number counter animation
function startCountAnimation(element) {
    const target = parseInt(element.textContent);
    let current = 0;
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60 FPS

    function updateCount() {
        current += step;
        if (current < target) {
            element.textContent = Math.round(current);
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = target;
        }
    }

    updateCount();
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Interactive cards
document.querySelectorAll('.role-card, .point').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Handle smooth scrolling for navigation links
document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Handle active state for navigation items
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-item');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    // Define the updated section IDs
    const sectionMappings = {
        'hero': 'hero',
        'pains': 'pains',
        'solution': 'solution',
        'how-it-works': 'how-it-works',
        'benefits': 'benefits',
        'projects': 'projects',
        'pricing': 'pricing',
        'roadmap': 'roadmap',
        'founders': 'founders',
        'contact': 'contact'
    };
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-item[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-item[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', highlightNavigation);

// Initialize navigation highlight
highlightNavigation();

/* ── Mobile Navigation ───────────────────────────── */
const navToggle = document.querySelector('.nav-toggle');
const navDrawer = document.querySelector('.nav-drawer');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navDrawer.classList.toggle('open');
});

// Close drawer when clicking outside
document.addEventListener('click', (e) => {
    if (!navDrawer.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('open');
        navDrawer.classList.remove('open');
    }
});

/* boot lucide icons */
document.addEventListener('DOMContentLoaded',()=>{lucide.createIcons()});

// Initialize Lucide icons
lucide.createIcons();

// Scroll to top functionality
document.addEventListener('DOMContentLoaded', () => {
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (!scrollTopBtn) return;                // safety guard

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {         // show after 500 px
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive:true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top:0, behavior:'smooth' });
  });
}); 