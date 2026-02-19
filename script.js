// ===== AURORA BACKGROUND =====
const aurora = document.createElement('div');
aurora.className = 'aurora';
document.body.appendChild(aurora);

// ===== MATRIX CODE RAIN =====
const matrixCanvas = document.createElement('canvas');
matrixCanvas.id = 'matrix-canvas';
document.body.appendChild(matrixCanvas);
const matrixCtx = matrixCanvas.getContext('2d');

function resizeMatrix() {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
}
resizeMatrix();
window.addEventListener('resize', resizeMatrix);

const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/{}[]();:=+-*&|!?#$%@~`^';
const fontSize = 14;
let columns = Math.floor(matrixCanvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
    matrixCtx.fillStyle = 'rgba(10, 15, 15, 0.05)';
    matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

    matrixCtx.fillStyle = '#14b8a6';
    matrixCtx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Vary colors
        if (Math.random() > 0.9) {
            matrixCtx.fillStyle = '#06b6d4';
        } else if (Math.random() > 0.95) {
            matrixCtx.fillStyle = '#fff';
        } else {
            matrixCtx.fillStyle = '#14b8a6';
        }

        matrixCtx.fillText(char, x, y);

        if (y > matrixCanvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

// ===== 3D HERO PARALLAX TILT =====
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

if (hero && heroContent) {
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 50;
        const rotateY = (centerX - x) / 50;

        heroContent.style.transform = `
            rotateX(${-rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(20px)
        `;
    });

    hero.addEventListener('mouseleave', () => {
        heroContent.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
    });
}

// ===== SPOTLIGHT CURSOR EFFECT =====
const spotlight = document.createElement('div');
spotlight.className = 'spotlight';
document.body.appendChild(spotlight);

let spotlightX = 0, spotlightY = 0;
let currentSpotX = 0, currentSpotY = 0;

document.addEventListener('mousemove', (e) => {
    spotlightX = e.clientX;
    spotlightY = e.clientY;
});

function animateSpotlight() {
    currentSpotX += (spotlightX - currentSpotX) * 0.1;
    currentSpotY += (spotlightY - currentSpotY) * 0.1;
    spotlight.style.left = currentSpotX + 'px';
    spotlight.style.top = currentSpotY + 'px';
    requestAnimationFrame(animateSpotlight);
}
animateSpotlight();

// ===== MAGNETIC PARTICLES - Cursor attracts nearby particles =====
let globalMouseX = 0, globalMouseY = 0;
document.addEventListener('mousemove', (e) => {
    globalMouseX = e.clientX;
    globalMouseY = e.clientY;
});

// ===== WATER RIPPLE ON CLICK =====
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    // Create multiple ripples
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.left = e.clientX + 'px';
            ripple.style.top = e.clientY + 'px';
            ripple.style.borderColor = ['rgba(20, 184, 166, 0.8)', 'rgba(168, 85, 247, 0.6)', 'rgba(6, 182, 212, 0.7)'][i];
            ripple.style.animationDuration = (1 + i * 0.2) + 's';
            document.body.appendChild(ripple);
            setTimeout(() => ripple.remove(), 1500);
        }, i * 100);
    }
});

// ===== CODE SYMBOL TRAIL =====
let lastCodeTime = 0;
const codeThrottle = 100;
const codeSymbols = ['{ }', '< />', '[ ]', '( )', '//', '/*', '*/', '$ _', '=> ', '++', '&&', '||', '!=', '==', '::'];
const codeColors = ['#14b8a6', '#06b6d4', '#a855f7', '#22c55e', '#eab308', '#ec4899'];

document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastCodeTime < codeThrottle) return;
    if (Math.random() > 0.4) return; // 40% chance
    lastCodeTime = now;

    const code = document.createElement('div');
    code.className = 'code-trail';
    code.textContent = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
    code.style.color = codeColors[Math.floor(Math.random() * codeColors.length)];
    code.style.left = (e.clientX + (Math.random() - 0.5) * 20) + 'px';
    code.style.top = (e.clientY + (Math.random() - 0.5) * 20) + 'px';
    document.body.appendChild(code);
    setTimeout(() => code.remove(), 1000);
});

// ===== CUSTOM CURSOR FOR HERO ELEMENTS =====
const customCursor = document.createElement('div');
customCursor.className = 'custom-cursor';
document.body.appendChild(customCursor);

let cursorVisible = false;
let heroMouseX = 0, heroMouseY = 0;

// Track mouse position for custom cursor
document.addEventListener('mousemove', (e) => {
    heroMouseX = e.clientX;
    heroMouseY = e.clientY;
    if (cursorVisible) {
        customCursor.style.left = heroMouseX + 'px';
        customCursor.style.top = heroMouseY + 'px';
    }
});

// Use event delegation on the hero section for better coverage
const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.addEventListener('mouseover', (e) => {
        const target = e.target.closest('.hero-cta a, .hero-cta .btn, .hero-socials a');
        if (target) {
            cursorVisible = true;
            customCursor.classList.add('visible');
            customCursor.style.left = heroMouseX + 'px';
            customCursor.style.top = heroMouseY + 'px';
        }
    });

    heroSection.addEventListener('mouseout', (e) => {
        const target = e.target.closest('.hero-cta a, .hero-cta .btn, .hero-socials a');
        const relatedTarget = e.relatedTarget ? e.relatedTarget.closest('.hero-cta a, .hero-cta .btn, .hero-socials a') : null;

        // Only hide if we're leaving a button and not entering another button
        if (target && !relatedTarget) {
            cursorVisible = false;
            customCursor.classList.remove('visible');
        }
    });

    // Lightning on click for hero buttons
    heroSection.addEventListener('click', (e) => {
        const target = e.target.closest('.hero-cta a, .hero-cta .btn, .hero-socials a');
        if (target) {
            createLightning(e.clientX, e.clientY);
        }
    });
}

// ===== MAGNETIC BUTTONS =====
// Exclude hero buttons to prevent cursor flickering
document.querySelectorAll('.btn').forEach(btn => {
    // Skip buttons in hero section
    if (btn.closest('.hero-cta') || btn.closest('.hero-socials')) {
        return; // Already handled above
    }

    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });

    // Lightning on click
    btn.addEventListener('click', (e) => {
        createLightning(e.clientX, e.clientY);
    });
});

// ===== LIGHTNING EFFECT =====
function createLightning(x, y) {
    const lightning = document.createElement('canvas');
    lightning.className = 'lightning';
    lightning.width = 400;
    lightning.height = 400;
    lightning.style.left = (x - 200) + 'px';
    lightning.style.top = (y - 200) + 'px';

    const ctx = lightning.getContext('2d');

    function drawBolt(startX, startY, endX, endY, width) {
        ctx.beginPath();
        ctx.moveTo(startX, startY);

        let currentX = startX;
        let currentY = startY;
        const segments = 8;

        for (let i = 0; i < segments; i++) {
            const progress = (i + 1) / segments;
            const targetX = startX + (endX - startX) * progress;
            const targetY = startY + (endY - startY) * progress;

            currentX = targetX + (Math.random() - 0.5) * 50;
            currentY = targetY + (Math.random() - 0.5) * 30;

            ctx.lineTo(currentX, currentY);

            // Branch
            if (Math.random() > 0.7 && width > 1) {
                drawBolt(currentX, currentY,
                    currentX + (Math.random() - 0.5) * 100,
                    currentY + Math.random() * 80,
                    width * 0.5);
            }
        }

        ctx.strokeStyle = `rgba(20, 184, 166, ${width / 3})`;
        ctx.lineWidth = width;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Glow
        ctx.strokeStyle = `rgba(255, 255, 255, ${width / 6})`;
        ctx.lineWidth = width * 2;
        ctx.filter = 'blur(3px)';
        ctx.stroke();
        ctx.filter = 'none';
    }

    // Draw multiple bolts
    for (let i = 0; i < 3; i++) {
        ctx.clearRect(0, 0, 400, 400);
        drawBolt(200, 0, 200, 400, 3);

        setTimeout(() => {
            ctx.clearRect(0, 0, 400, 400);
            drawBolt(200, 0, 200, 400, 3);
        }, 50 + i * 50);
    }

    document.body.appendChild(lightning);

    // Flash effect
    document.body.style.filter = 'brightness(1.3)';
    setTimeout(() => document.body.style.filter = '', 50);

    setTimeout(() => lightning.remove(), 300);
}

// ===== FLOATING 3D SHAPES =====
function createFloatingShapes() {
    const shapes = ['△', '○', '□', '◇', '⬡', '⬢'];
    const colors = ['#14b8a6', '#06b6d4', '#a855f7', '#ec4899'];

    for (let i = 0; i < 15; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        shape.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        shape.style.color = colors[Math.floor(Math.random() * colors.length)];
        shape.style.fontSize = (Math.random() * 30 + 20) + 'px';
        shape.style.left = Math.random() * 100 + 'vw';
        shape.style.top = Math.random() * 100 + 'vh';

        const duration = 20 + Math.random() * 30;
        const delay = Math.random() * -30;

        shape.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 0.1 },
            { transform: `translateY(-${window.innerHeight}px) rotate(360deg)`, opacity: 0.2 },
            { transform: `translateY(-${window.innerHeight * 2}px) rotate(720deg)`, opacity: 0.1 }
        ], {
            duration: duration * 1000,
            delay: delay * 1000,
            iterations: Infinity,
            easing: 'linear'
        });

        document.body.appendChild(shape);
    }
}
createFloatingShapes();

// ===== TEXT SCRAMBLE ON HOVER =====
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.originalText = el.textContent;
    }

    scramble() {
        const length = this.originalText.length;
        let iteration = 0;

        const interval = setInterval(() => {
            this.el.textContent = this.originalText
                .split('')
                .map((char, index) => {
                    if (index < iteration) return this.originalText[index];
                    return this.chars[Math.floor(Math.random() * this.chars.length)];
                })
                .join('');

            iteration += 1/3;

            if (iteration >= length) {
                clearInterval(interval);
                this.el.textContent = this.originalText;
            }
        }, 30);
    }
}

// Apply to section titles
document.querySelectorAll('.section-title').forEach(title => {
    const scrambler = new TextScramble(title);
    title.addEventListener('mouseenter', () => scrambler.scramble());
});

// ===== GRAVITY PULL EFFECT ON SCROLL =====
let scrollY = 0;
window.addEventListener('scroll', () => {
    const newScrollY = window.scrollY;
    const delta = newScrollY - scrollY;
    scrollY = newScrollY;

    // Make particles react to scroll
    if (typeof particles !== 'undefined') {
        particles.forEach(p => {
            p.y += delta * 0.1;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
        });
    }
});

// ===== DOUBLE CLICK MEGA EXPLOSION =====
document.addEventListener('dblclick', (e) => {
    // Mega confetti burst
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createConfettiExplosion(e.clientX + (Math.random() - 0.5) * 100, e.clientY + (Math.random() - 0.5) * 100);
        }, i * 50);
    }

    // Screen shake
    document.body.style.animation = 'shake 0.3s ease';
    setTimeout(() => document.body.style.animation = '', 300);

    // Spawn lots of code symbols
    const bigSymbols = ['{ }', '</>', '[ ]', '( )', '=>', '++', '/**/', '#!', '::'];
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const code = document.createElement('div');
            code.className = 'code-trail';
            code.textContent = bigSymbols[Math.floor(Math.random() * bigSymbols.length)];
            code.style.color = codeColors[Math.floor(Math.random() * codeColors.length)];
            code.style.left = (e.clientX + (Math.random() - 0.5) * 200) + 'px';
            code.style.top = (e.clientY + (Math.random() - 0.5) * 200) + 'px';
            code.style.fontSize = (16 + Math.random() * 24) + 'px';
            document.body.appendChild(code);
            setTimeout(() => code.remove(), 1500);
        }, i * 30);
    }
});

// Add shake animation
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

// ===== CLICK CONFETTI EXPLOSION =====
const confettiColors = ['#14b8a6', '#06b6d4', '#a855f7', '#ec4899', '#f97316', '#eab308', '#22c55e', '#fff'];
const confettiShapes = ['square', 'circle', 'triangle'];

document.addEventListener('click', (e) => {
    // Don't trigger on form inputs
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    createConfettiExplosion(e.clientX, e.clientY);
});

function createConfettiExplosion(x, y) {
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';

        const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        const size = Math.random() * 10 + 5;
        const shape = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];

        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        confetti.style.backgroundColor = color;

        if (shape === 'circle') {
            confetti.style.borderRadius = '50%';
        } else if (shape === 'triangle') {
            confetti.style.width = '0';
            confetti.style.height = '0';
            confetti.style.backgroundColor = 'transparent';
            confetti.style.borderLeft = size/2 + 'px solid transparent';
            confetti.style.borderRight = size/2 + 'px solid transparent';
            confetti.style.borderBottom = size + 'px solid ' + color;
        }

        // Random direction
        const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
        const velocity = Math.random() * 200 + 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - 150; // Upward bias

        confetti.style.setProperty('--vx', vx + 'px');
        confetti.style.setProperty('--vy', vy + 'px');

        confetti.animate([
            { transform: 'translateY(0) rotate(0deg) scale(1)', opacity: 1 },
            { transform: `translate(${vx}px, ${vy + 300}px) rotate(${Math.random() * 720 - 360}deg) scale(0)`, opacity: 0 }
        ], {
            duration: 1000 + Math.random() * 500,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 1500);
    }
}

// ===== SHOOTING STARS =====
function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';

    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * (window.innerHeight * 0.5);

    star.style.left = startX + 'px';
    star.style.top = startY + 'px';

    document.body.appendChild(star);

    star.animate([
        {
            transform: 'translateX(0) translateY(0) rotate(-45deg)',
            opacity: 0
        },
        {
            opacity: 1,
            offset: 0.1
        },
        {
            transform: `translateX(${300 + Math.random() * 200}px) translateY(${150 + Math.random() * 100}px) rotate(-45deg)`,
            opacity: 0
        }
    ], {
        duration: 1000 + Math.random() * 1000,
        easing: 'linear'
    });

    setTimeout(() => star.remove(), 2000);
}

// Spawn shooting stars periodically
setInterval(createShootingStar, 2000);
setTimeout(() => createShootingStar(), 500); // Initial star

// ===== MAGIC SPARKLE MOUSE TRAIL =====
let lastSparkleTime = 0;
const sparkleThrottle = 50;

document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastSparkleTime < sparkleThrottle) return;
    lastSparkleTime = now;

    if (Math.random() > 0.5) return; // 50% chance to spawn

    createSparkle(e.clientX, e.clientY);
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';

    const colors = ['#14b8a6', '#06b6d4', '#fff', '#a855f7', '#eab308'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 8 + 4;

    // Create a star shape using SVG
    sparkle.innerHTML = `
        <svg width="${size * 2}" height="${size * 2}" viewBox="0 0 24 24" fill="${color}">
            <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"/>
        </svg>
    `;

    sparkle.style.left = (x - size) + 'px';
    sparkle.style.top = (y - size) + 'px';

    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 800);
}

// ===== KONAMI CODE EASTER EGG =====
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateUltraMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateUltraMode() {
    // MEGA CONFETTI EXPLOSION
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createConfettiExplosion(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
        }, i * 100);
    }

    // Rainbow mode for 5 seconds
    document.body.style.animation = 'rainbow-bg 0.5s linear infinite';

    const rainbowStyle = document.createElement('style');
    rainbowStyle.id = 'rainbow-mode';
    rainbowStyle.textContent = `
        @keyframes rainbow-bg {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);

    // Show secret message
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        font-weight: bold;
        color: white;
        text-shadow: 0 0 20px #14b8a6, 0 0 40px #a855f7, 0 0 60px #ec4899;
        z-index: 99999;
        animation: mega-pulse 0.3s ease infinite;
        text-align: center;
        font-family: 'Fira Code', monospace;
    `;
    message.innerHTML = '{ ULTRA_MODE: true }<br>&lt;/&gt; HACK THE PLANET &lt;/&gt;';
    document.body.appendChild(message);

    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes mega-pulse {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.1); }
        }
    `;
    document.head.appendChild(pulseStyle);

    // Spawn tons of shooting stars
    for (let i = 0; i < 20; i++) {
        setTimeout(createShootingStar, i * 150);
    }

    // Reset after 5 seconds
    setTimeout(() => {
        document.body.style.animation = '';
        document.getElementById('rainbow-mode')?.remove();
        message.remove();
        pulseStyle.remove();
    }, 5000);
}

// ===== Particle Physics Background =====
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let mouse = { x: null, y: null, radius: 150 };

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Track mouse position
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

// Particle class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        // Teal/cyan color palette
        const colors = [
            'rgba(20, 184, 166, 0.8)',   // teal
            'rgba(6, 182, 212, 0.7)',    // cyan
            'rgba(13, 148, 136, 0.6)',   // darker teal
            'rgba(94, 234, 212, 0.5)',   // light teal
            'rgba(103, 232, 249, 0.4)'   // light cyan
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        // MAGNETIC ATTRACTION - particles gently pulled toward cursor
        if (globalMouseX && globalMouseY) {
            let dx = globalMouseX - this.x;
            let dy = globalMouseY - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            // Strong repulsion when very close, gentle attraction from afar
            if (distance < 100) {
                // Push away when close
                let force = (100 - distance) / 100;
                this.x -= (dx / distance) * force * 3;
                this.y -= (dy / distance) * force * 3;
            } else if (distance < 300) {
                // Gentle pull when medium distance
                let force = (300 - distance) / 300 * 0.5;
                this.x += (dx / distance) * force;
                this.y += (dy / distance) * force;
            }
        }

        // Slowly drift back to base position
        let dx = this.baseX - this.x;
        let dy = this.baseY - this.y;
        this.x += dx * 0.02;
        this.y += dy * 0.02;

        // Add slight floating movement
        this.baseX += this.vx;
        this.baseY += this.vy;

        // Bounce off edges
        if (this.baseX < 0 || this.baseX > canvas.width) this.vx *= -1;
        if (this.baseY < 0 || this.baseY > canvas.height) this.vy *= -1;

        // Keep base position in bounds
        this.baseX = Math.max(0, Math.min(canvas.width, this.baseX));
        this.baseY = Math.max(0, Math.min(canvas.height, this.baseY));

        this.draw();
    }
}

// Initialize particles
function initParticles() {
    particles = [];
    const numberOfParticles = Math.floor((canvas.width * canvas.height) / 8000);
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
    }
}
initParticles();
window.addEventListener('resize', initParticles);

// Connect particles with lines
function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                let opacity = 1 - (distance / 120);
                ctx.strokeStyle = `rgba(20, 184, 166, ${opacity * 0.3})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let particle of particles) {
        particle.update();
    }
    connectParticles();

    requestAnimationFrame(animateParticles);
}
animateParticles();

// ===== Typing Effect =====
const typedTextElement = document.getElementById('typed-text');
const titles = [
    'Software Engineer',
    'Full-Stack Developer',
    'Problem Solver',
    'Tech Enthusiast'
];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        typedTextElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedTextElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500; // Pause before new word
    }

    setTimeout(typeText, typingSpeed);
}

typeText();

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScrollY = window.scrollY;
});

// ===== Mobile Navigation =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');

        // If it's just "#" or it's a logo, scroll to top
        if (href === '#' || this.classList.contains('logo') || this.classList.contains('footer-logo')) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Logo Click - Scroll to Top =====
document.querySelectorAll('.logo, .footer-logo').forEach(logo => {
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate stats numbers
            if (entry.target.classList.contains('about-stats')) {
                animateStats();
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.skill-category, .project-card, .timeline-item, .about-stats, .contact-method').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add visible class styles
const style = document.createElement('style');
style.textContent = `
    .skill-category.visible, .project-card.visible, .timeline-item.visible, .about-stats.visible, .contact-method.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ===== Animate Stats Numbers =====
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateNumber = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target;
            }
        };

        updateNumber();
    });
}

// ===== Active Navigation Highlight =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Add active styles for nav items
const navActiveStyle = document.createElement('style');
navActiveStyle.textContent = `
    .nav-links a.active {
        color: var(--text-primary);
    }
    .nav-links a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(navActiveStyle);

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Create mailto link as fallback
    const mailtoLink = `mailto:joshua.komonen@email.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;

    // Show success message
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Message Ready!
    `;
    btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

    // Open email client
    window.location.href = mailtoLink;

    // Reset form and button after delay
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        this.reset();
    }, 3000);
});

// ===== Parallax Effect for Hero Orbs =====
const orbs = document.querySelectorAll('.gradient-orb');

window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = mouseX * speed;
        const y = mouseY * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===== Project Cards Tilt Effect =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===== Skill Cards Stagger Animation =====
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach((category, index) => {
    category.style.transitionDelay = `${index * 0.1}s`;
});

// ===== Timeline Items Stagger Animation =====
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.15}s`;
});

// ===== Scroll Progress Indicator =====
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #06b6d4 100%);
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = `${scrollPercent}%`;
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class for initial animations
    document.body.classList.add('loaded');

    // Trigger animations for hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';

        setTimeout(() => {
            heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// ===== Preload Images (for smoother experience) =====
const preloadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
};

if ('requestIdleCallback' in window) {
    requestIdleCallback(preloadImages);
} else {
    setTimeout(preloadImages, 1000);
}
