/**
 * ZERIONSMP - Premium Minecraft Network
 * Modern JavaScript with Smooth Animations
 */

// ============================================
// DOM ELEMENTS
// ============================================
const navbar = document.querySelector('.navbar');
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.getElementById('scrollTop');
const copyIpBtn = document.getElementById('copy-ip');
const serverIp = document.getElementById('server-ip');
const particlesContainer = document.getElementById('particles-container');

// ============================================
// PARTICLE SYSTEM
// ============================================
function createParticles() {
    const particleCount = 25;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 8 + 4;
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.bottom = '-20px';
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.4 + 0.1;
        
        particlesContainer.appendChild(particle);
    }
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function handleNavbarScroll() {
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
        navbar.style.top = '10px';
    } else {
        navbar.style.top = '20px';
    }
}

// ============================================
// MOBILE MENU
// ============================================
function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    mobileToggle.classList.toggle('active');
    
    // Animate hamburger
    const spans = mobileToggle.querySelectorAll('span');
    if (mobileToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

function closeMobileMenu() {
    navLinks.classList.remove('active');
    mobileToggle.classList.remove('active');
    const spans = mobileToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
}

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinkItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
function handleScrollTop() {
    const scrollY = window.scrollY;
    
    if (scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ============================================
// COPY SERVER IP
// ============================================
async function copyServerIp() {
    const ip = serverIp.textContent;
    
    try {
        await navigator.clipboard.writeText(ip);
        copyIpBtn.classList.add('copied');
        
        setTimeout(() => {
            copyIpBtn.classList.remove('copied');
        }, 2000);
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = ip;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        copyIpBtn.classList.add('copied');
        setTimeout(() => {
            copyIpBtn.classList.remove('copied');
        }, 2000);
    }
}

// ============================================
// ANIMATED COUNTERS
// ============================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('de-DE');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('de-DE');
        }
    }, 16);
}

// Counter observer
const counterObserverOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target) || 0;
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, counterObserverOptions);

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.feature-card, .stat-card, .section-header'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => observer.observe(el));
}

// ============================================
// PARALLAX EFFECT
// ============================================
function initParallax() {
    const heroPattern = document.querySelector('.minecraft-pattern');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
            heroPattern.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
    });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// ============================================
// MOUSE GLOW EFFECT FOR CARDS
// ============================================
function initMouseGlow() {
    const cards = document.querySelectorAll('.feature-card, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// ============================================
// MINECRAFT SERVER STATUS API
// ============================================
const SERVER_IP = 'zerionsmp.de';
const SERVER_PORT = 25565;

async function fetchServerStatus() {
    try {
        const response = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}:${SERVER_PORT}`);
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch server status:', error);
        return null;
    }
}

function updatePlayerCount(element, count, animate = false) {
    if (!element) return;
    
    if (animate) {
        animateCounter(element, count, 1500);
    } else {
        element.textContent = count.toLocaleString('de-DE');
    }
}

// ============================================
// VOTE DATA FROM MC-LISTE.DE
// ============================================
async function fetchVoteCount() {
    try {
        // Versuche zuerst den lokalen PHP-Proxy (wenn auf Server mit PHP gehostet)
        const proxyUrl = './api/votes.php';
        const response = await fetch(proxyUrl);
        
        if (!response.ok) throw new Error('Proxy Error');
        
        const data = await response.json();
        if (data.success && data.votes) {
            return data.votes;
        }
        
        throw new Error('Invalid data');
    } catch (error) {
        console.log('Vote proxy not available, using fallback:', error);
        // Fallback: Statischer Wert oder zuvor gespeicherter Wert aus localStorage
        const savedVotes = localStorage.getItem('zerionsmp_votes');
        return savedVotes ? parseInt(savedVotes) : 2847;
    }
}

function saveVoteCount(votes) {
    localStorage.setItem('zerionsmp_votes', votes);
    localStorage.setItem('zerionsmp_votes_time', Date.now());
}

// ============================================
// REAL SERVER DATA
// ============================================
async function loadServerData() {
    const onlinePlayersEl = document.getElementById('online-players');
    const onlinePlayersMiniEl = document.getElementById('online-players-mini');
    const totalVotesEl = document.getElementById('total-votes');
    const playersBar = document.getElementById('players-bar');
    
    // Show loading state
    if (onlinePlayersEl) onlinePlayersEl.textContent = '...';
    if (onlinePlayersMiniEl) onlinePlayersMiniEl.textContent = '...';
    
    const data = await fetchServerStatus();
    
    if (data && data.online) {
        const playerCount = data.players?.online || 0;
        const maxPlayers = data.players?.max || 100;
        
        // Update player counts
        if (onlinePlayersEl) {
            onlinePlayersEl.dataset.target = playerCount;
            counterObserver.observe(onlinePlayersEl);
        }
        
        if (onlinePlayersMiniEl) {
            setTimeout(() => {
                updatePlayerCount(onlinePlayersMiniEl, playerCount, true);
            }, 500);
        }
        
        // Update progress bar
        if (playersBar) {
            const percentage = Math.min((playerCount / maxPlayers) * 100, 100);
            setTimeout(() => {
                playersBar.style.width = `${percentage}%`;
            }, 500);
        }
    } else {
        // Server offline or error
        const offlineText = 'Offline';
        if (onlinePlayersEl) onlinePlayersEl.textContent = offlineText;
        if (onlinePlayersMiniEl) onlinePlayersMiniEl.textContent = offlineText;
        if (playersBar) playersBar.style.width = '0%';
    }
    
    // Fetch Votes from mc-liste.de via proxy
    const voteCount = await fetchVoteCount();
    if (totalVotesEl) {
        totalVotesEl.dataset.target = voteCount;
        counterObserver.observe(totalVotesEl);
        saveVoteCount(voteCount);
    }
    
    // Refresh every 60 seconds
    setInterval(async () => {
        const freshData = await fetchServerStatus();
        if (freshData && freshData.online) {
            const newCount = freshData.players?.online || 0;
            if (onlinePlayersEl) onlinePlayersEl.textContent = newCount.toLocaleString('de-DE');
            if (onlinePlayersMiniEl) onlinePlayersMiniEl.textContent = newCount.toLocaleString('de-DE');
        }
        
        // Refresh votes every 5 minutes (300 seconds)
        const lastVoteUpdate = localStorage.getItem('zerionsmp_votes_time');
        if (!lastVoteUpdate || Date.now() - parseInt(lastVoteUpdate) > 300000) {
            const freshVotes = await fetchVoteCount();
            if (totalVotesEl) {
                totalVotesEl.textContent = freshVotes.toLocaleString('de-DE');
            }
            saveVoteCount(freshVotes);
        }
    }, 60000);
}

// Legacy function name for backwards compatibility
function simulateServerData() {
    loadServerData();
}

// ============================================
// VOTE BUTTON PULSE
// ============================================
function initVoteButtonPulse() {
    const voteBtn = document.querySelector('.vote-btn');
    if (!voteBtn) return;
    
    setInterval(() => {
        voteBtn.style.transform = 'scale(1.02)';
        setTimeout(() => {
            voteBtn.style.transform = 'scale(1)';
        }, 200);
    }, 5000);
}

// ============================================
// LOADING ANIMATION
// ============================================
function initLoadingAnimation() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
}

// ============================================
// CURSOR TRAIL EFFECT (Desktop only)
// ============================================
function initCursorTrail() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let trail = [];
    const trailLength = 8;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateTrail() {
        trail.push({ x: mouseX, y: mouseY });
        
        if (trail.length > trailLength) {
            trail.shift();
        }
        
        requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
}

// ============================================
// INITIALIZATION
// ============================================
function init() {
    // Create particles
    createParticles();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize parallax
    initParallax();
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Initialize mouse glow
    initMouseGlow();
    
    // Simulate server data
    simulateServerData();
    
    // Initialize vote button pulse
    initVoteButtonPulse();
    
    // Loading animation
    initLoadingAnimation();
    
    // Cursor trail (desktop only)
    initCursorTrail();
    
    // Event listeners
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        updateActiveNavLink();
        handleScrollTop();
    });
    
    mobileToggle.addEventListener('click', toggleMobileMenu);
    
    scrollTopBtn.addEventListener('click', scrollToTop);
    
    if (copyIpBtn) {
        copyIpBtn.addEventListener('click', copyServerIp);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Keyboard accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', init);

// Re-initialize after all images load
window.addEventListener('load', () => {
    // Refresh animations after images load
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        if (isElementInViewport(el)) {
            el.classList.add('visible');
        }
    });
});

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
