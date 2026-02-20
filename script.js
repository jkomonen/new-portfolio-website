// ===== AURORA BACKGROUND =====
const aurora = document.createElement('div');
aurora.className = 'aurora';
document.body.appendChild(aurora);

// ===== MATRIX CODE RAIN =====
const matrixCanvas = document.getElementById('matrix-canvas');
const matrixCtx = matrixCanvas.getContext('2d');

const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォッャュョヴ';
const fontSize = 14;
let columns, drops;

function resizeMatrix() {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    columns = Math.floor(matrixCanvas.width / fontSize);
    drops = Array(columns).fill(1);
}
resizeMatrix();
window.addEventListener('resize', resizeMatrix);

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
    if (typeof suppressNextClick !== 'undefined' && suppressNextClick) { suppressNextClick = false; return; }

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

// Shooting stars disabled

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

function activateHackMode() {
    // Full-screen data-exfil stream overlay
    const stream = document.createElement('div');
    stream.id = 'hack-stream';
    stream.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        z-index: 99991; pointer-events: none;
        font-family: 'Fira Code', monospace; font-size: 0.72rem; line-height: 1.5;
        color: #00ff41; overflow: hidden;
        background: rgba(0,0,0,0.92);
        padding: 1.2rem 1.5rem;
        opacity: 0; transition: opacity 0.15s ease;
    `;
    document.body.appendChild(stream);
    requestAnimationFrame(() => { stream.style.opacity = '1'; });

    function randHex(len) {
        return Array.from({length: len}, () => Math.floor(Math.random() * 16).toString(16)).join('');
    }
    function randIP() {
        return Array.from({length: 4}, () => Math.floor(Math.random() * 256)).join('.');
    }
    const filePaths = ['/etc/passwd', '/root/.ssh/id_rsa', '/var/log/auth.log', '/home/admin/.bashrc',
                       '/proc/net/tcp', '/sys/kernel/security', '/etc/shadow', '/var/www/html/.env'];
    const actions   = ['READING', 'COPYING', 'INJECTING', 'SCANNING', 'BYPASSING', 'EXTRACTING', 'ESCALATING'];

    // Rapid scrolling lines
    const lineInterval = setInterval(() => {
        const line = document.createElement('div');
        const type = Math.floor(Math.random() * 5);
        if (type === 0) {
            line.innerHTML = `<span style="color:#444">[${Date.now()}]</span> <span style="color:#00ff41">${actions[Math.floor(Math.random()*actions.length)]}</span> ${filePaths[Math.floor(Math.random()*filePaths.length)]}`;
        } else if (type === 1) {
            line.innerHTML = `<span style="color:#0af">0x${randHex(8)}</span> &rarr; <span style="color:#f60">0x${randHex(8)}</span>&nbsp;&nbsp;${randHex(32)}`;
        } else if (type === 2) {
            line.innerHTML = `<span style="color:#f44">FIREWALL BYPASSED</span>&nbsp;&nbsp;${randIP()} <span style="color:#444">&rarr;</span> ${randIP()}`;
        } else if (type === 3) {
            line.innerHTML = `<span style="color:#ff0">PRIVILEGE ESCALATION</span>&nbsp;&nbsp;uid=0(root) gid=0(root)`;
        } else {
            line.style.color = '#1a3a1a';
            line.textContent = randHex(72);
        }
        stream.appendChild(line);
        // Keep only the last ~40 lines so it feels like a scrolling feed
        while (stream.children.length > 40) stream.removeChild(stream.firstChild);
    }, 70);

    // Body glitch — occasional inversion flash and horizontal jitter
    let glitchTick = 0;
    const glitchInterval = setInterval(() => {
        glitchTick++;
        if (glitchTick % 4 === 0) {
            document.body.style.filter = 'invert(1)';
            setTimeout(() => { document.body.style.filter = ''; }, 35);
        } else if (glitchTick % 9 === 0) {
            document.body.style.transform = `translateX(${(Math.random() - 0.5) * 10}px)`;
            setTimeout(() => { document.body.style.transform = ''; }, 55);
        }
    }, 180);

    // "TRACE COMPLETE" endscreen after 4 s
    setTimeout(() => {
        clearInterval(lineInterval);
        stream.innerHTML = '';
        const final = document.createElement('div');
        final.style.cssText = `
            position: absolute; top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            text-align: center; color: #00ff41;
            font-family: 'Fira Code', monospace;
            font-size: 2rem; font-weight: bold;
            letter-spacing: 0.2em;
            text-shadow: 0 0 20px #00ff41, 0 0 50px #00cc33;
        `;
        final.innerHTML = `TRACE COMPLETE<br><span style="font-size:0.85rem;color:#555;letter-spacing:0.35em;text-shadow:none">connection terminated</span>`;
        stream.appendChild(final);
    }, 4000);

    // Full cleanup after 5.2 s
    setTimeout(() => {
        clearInterval(lineInterval);
        clearInterval(glitchInterval);
        document.body.style.filter = '';
        document.body.style.transform = '';
        stream.style.opacity = '0';
        setTimeout(() => stream.remove(), 300);
    }, 5200);
}

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

// Black hole state (declared here so Particle.update() can reference it safely)
let blackHole = null;
let isHolding = false;
const BH_BASE_RADIUS = 40;         // base radius in px (matches 80px CSS diameter)
const BH_GROWTH_PER_PARTICLE = 0.2; // px of radius growth per absorbed particle

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
            'rgba(20, 184, 166, 1.0)',   // teal
            'rgba(6, 182, 212, 0.95)',   // cyan
            'rgba(45, 212, 191, 0.9)',   // mid teal
            'rgba(94, 234, 212, 0.9)',   // light teal
            'rgba(103, 232, 249, 0.85)' // light cyan
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
        // ETERNAL F - override all physics, drift to assigned target
        if (this.fTarget) {
            this.x += (this.fTarget.x - this.x) * (this.fLerpSpeed || 0.015);
            this.y += (this.fTarget.y - this.y) * (this.fLerpSpeed || 0.015);
            this.draw();
            return;
        }

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

        // INK DRAWING ATTRACTION — drifts toward active neon strokes
        if (activeDrawPoints && activeDrawPoints.length > 0) {
            const dp = activeDrawPoints[Math.floor(Math.random() * Math.min(activeDrawPoints.length, 40))];
            const ddx = dp.x - this.x, ddy = dp.y - this.y;
            const dd = Math.sqrt(ddx * ddx + ddy * ddy);
            if (dd < 200 && dd > 1) {
                const f = (200 - dd) / 200 * 0.35;
                this.x += (ddx / dd) * f;
                this.y += (ddy / dd) * f;
            }
        }

        // BLACK HOLE ATTRACTION
        // Safety: if absorbed but black hole is gone, respawn immediately
        if (this.absorbed && !blackHole) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.baseX = this.x;
            this.baseY = this.y;
            this.absorbed = false;
        }

        if (blackHole) {
            let bhDx = blackHole.x - this.x;
            let bhDy = blackHole.y - this.y;
            let bhDist = Math.sqrt(bhDx * bhDx + bhDy * bhDy) || 1;

            if (this.absorbed) {
                // Count down regen timer, then respawn at a random position
                this.regenTimer--;
                if (this.regenTimer <= 0) {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.baseX = this.x;
                    this.baseY = this.y;
                    this.absorbed = false;
                } else {
                    // Keep hidden at black hole center while waiting
                    this.x = blackHole.x;
                    this.y = blackHole.y;
                    this.baseX = blackHole.x;
                    this.baseY = blackHole.y;
                }
                return;
            }

            // Event horizon: absorb particle when close enough
            if (bhDist < blackHole.radius * 0.3) {
                this.absorbed = true;
                this.regenTimer = 90 + Math.floor(Math.random() * 60); // ~1.5–2.5s at 60fps
                this.x = blackHole.x;
                this.y = blackHole.y;
                this.baseX = blackHole.x;
                this.baseY = blackHole.y;
                blackHole.absorbedCount++;
                blackHole.pendingPoints = (blackHole.pendingPoints || 0) + 1;
                blackHole.radius = BH_BASE_RADIUS + blackHole.absorbedCount * BH_GROWTH_PER_PARTICLE;
                if (bhEl) {
                    const diam = blackHole.radius * 2;
                    bhEl.style.width = diam + 'px';
                    bhEl.style.height = diam + 'px';
                }
                return;
            }

            // Pull particles within a range that grows with the black hole
            let sizeScale = blackHole.radius / BH_BASE_RADIUS;
            let attractRange = blackHole.radius * 6;
            if (bhDist < attractRange) {
                // 1/dist falloff gives noticeable pull across the full range
                let bhForce = Math.min(550 * sizeScale / bhDist, 14 * sizeScale);
                this.x += (bhDx / bhDist) * bhForce;
                this.y += (bhDy / bhDist) * bhForce;
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
    ctx.fillStyle = '#182828';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
    const mailtoLink = `mailto:joshkomonen@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;

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

// ===== NYAN VIRUS =====
function activateNyanMode() {
    if (document.getElementById('nyan-sprite')) return;

    // Mute existing music
    const bgMusic = document.getElementById('bg-music');
    const prevMuted = bgMusic.muted;
    bgMusic.muted = true;

    // --- 8-bit Nyan Cat melody via Web Audio ---
    let nyanAc = null;
    try {
        nyanAc = new (window.AudioContext || window.webkitAudioContext)();
        const ac = nyanAc;
        const E = (60 / 140) / 2; // eighth note at 140 BPM
        // Db major: Db5=554 Eb5=622 Bb4=466 Ab4=415 Gb4=370 Eb4=311
        const melody = [
            554,622,554,466, 554,622,554,466,
            415,466,554,466, 415,370,
            415,466,415,370, 311,370,
            554,622,554,466, 554,622,554,466,
            415,466,554,466, 415,370,
            415,466,415,370, 311,370,
        ];
        let t = ac.currentTime + 0.05;
        melody.forEach(f => {
            const o = ac.createOscillator(), g = ac.createGain();
            o.connect(g); g.connect(ac.destination);
            o.type = 'square';
            o.frequency.value = f;
            g.gain.setValueAtTime(0.06, t);
            g.gain.exponentialRampToValueAtTime(0.001, t + E * 0.88);
            o.start(t); o.stop(t + E);
            t += E;
        });
    } catch(e) {}

    // --- VIRUS notification ---
    const notif = document.createElement('div');
    notif.className = 'virus-notification';
    notif.innerHTML = `
        <div style="font-size:1.8rem;flex-shrink:0">⚠️</div>
        <div style="flex:1">
            <div style="color:#ef4444;font-weight:700;font-size:0.82rem;letter-spacing:1px;margin-bottom:0.3rem">VIRUS DETECTED</div>
            <div style="color:#64748b;font-size:0.72rem;margin-bottom:0.5rem">nyan.exe is spreading through portfolio...</div>
            <div style="height:5px;background:#1a1a1a;border-radius:3px;overflow:hidden">
                <div class="virus-progress"></div>
            </div>
            <div style="color:#334155;font-size:0.65rem;margin-top:0.3rem;font-family:'Fira Code',monospace">Containment: IMPOSSIBLE</div>
        </div>
    `;
    document.body.appendChild(notif);
    requestAnimationFrame(() => notif.classList.add('show'));

    // --- Rainbow trail canvas ---
    const trailCanvas = document.createElement('canvas');
    trailCanvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99985;pointer-events:none;transition:opacity 0.8s ease';
    trailCanvas.width = window.innerWidth;
    trailCanvas.height = window.innerHeight;
    document.body.appendChild(trailCanvas);
    const tCtx = trailCanvas.getContext('2d');

    // --- Nyan Cat sprite ---
    const sprite = document.createElement('div');
    sprite.id = 'nyan-sprite';
    sprite.style.cssText = 'position:fixed;z-index:99990;pointer-events:none;font-size:2.8rem;line-height:1;filter:drop-shadow(0 0 10px rgba(255,180,220,0.95))';
    sprite.innerHTML = '<span style="letter-spacing:-0.25em">🍞🐱</span>';
    document.body.appendChild(sprite);

    // --- Particle colors → rainbow ---
    const savedColors = particles.map(p => p.color);
    const nyanPalette = ['rgba(255,80,140,1)','rgba(255,180,50,1)','rgba(255,255,70,1)','rgba(70,255,120,1)','rgba(70,140,255,1)','rgba(200,70,255,1)'];
    particles.forEach(p => { p.color = nyanPalette[Math.floor(Math.random() * nyanPalette.length)]; });

    // --- Animation ---
    const STRIPE_COLORS = ['#ff0000','#ff7700','#ffff00','#00cc00','#0055ff','#8800cc'];
    const STRIPE_H = 10;
    const TRAIL_H = STRIPE_COLORS.length * STRIPE_H;
    const BASE_Y = window.innerHeight * 0.45;
    let catX = -100, frameId;

    function animateNyan() {
        catX += 7;
        const bobY = BASE_Y + Math.sin(catX * 0.06) * 10;
        sprite.style.left = catX + 'px';
        sprite.style.top = (bobY - 24) + 'px';

        // Draw rainbow trail
        STRIPE_COLORS.forEach((color, i) => {
            tCtx.fillStyle = color;
            tCtx.fillRect(0, BASE_Y - TRAIL_H / 2 + i * STRIPE_H, catX - 30, STRIPE_H);
        });

        // Spawn stars/sparkles around the cat
        if (Math.random() > 0.72) {
            const star = document.createElement('div');
            const icons = ['⭐','✨','🌟','💫','★'];
            star.style.cssText = `position:fixed;font-size:${0.5 + Math.random() * 0.9}rem;left:${catX + (Math.random() - 0.5) * 90}px;top:${bobY + (Math.random() - 0.5) * 80}px;z-index:99988;pointer-events:none;animation:nyan-star-fade 0.9s ease-out forwards`;
            star.textContent = icons[Math.floor(Math.random() * icons.length)];
            document.body.appendChild(star);
            setTimeout(() => star.remove(), 950);
        }

        if (catX < window.innerWidth + 120) {
            frameId = requestAnimationFrame(animateNyan);
        } else {
            cleanup();
        }
    }
    frameId = requestAnimationFrame(animateNyan);

    function cleanup() {
        cancelAnimationFrame(frameId);
        if (nyanAc) { nyanAc.close(); nyanAc = null; }
        trailCanvas.style.opacity = '0';
        setTimeout(() => trailCanvas.remove(), 900);
        sprite.style.transition = 'opacity 0.3s';
        sprite.style.opacity = '0';
        setTimeout(() => sprite.remove(), 400);
        savedColors.forEach((c, i) => { if (particles[i]) particles[i].color = c; });
        bgMusic.muted = prevMuted;
        notif.classList.remove('show');
        setTimeout(() => notif.remove(), 500);
    }

    setTimeout(() => { if (document.getElementById('nyan-sprite')) cleanup(); }, 15000);
}

// ===== FULL-SCREEN JAPANESE MATRIX RAIN =====
let matrixRainActive = false;
const matrixRain = (() => {
    const kana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォッャュョヴ';
    const fs = 16;
    let canvas, ctx, cols, drops, speeds, animId, ready = false;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        cols = Math.floor(window.innerWidth / fs);
        drops = Array.from({ length: cols }, () => -(Math.random() * 40));
        speeds = Array.from({ length: cols }, () => 0.4 + Math.random() * 0.7);
    }

    function draw() {
        if (!matrixRainActive) return;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = `bold ${fs}px monospace`;
        for (let i = 0; i < cols; i++) {
            const char = kana[Math.floor(Math.random() * kana.length)];
            const x = i * fs;
            const y = drops[i] * fs;
            const r = Math.random();
            ctx.fillStyle = r > 0.98 ? '#fff' : r > 0.65 ? '#00ff41' : '#009921';
            if (y > 0) ctx.fillText(char, x, y);
            drops[i] += speeds[i];
            if (drops[i] * fs > canvas.height && Math.random() > 0.975) {
                drops[i] = -(Math.random() * 30);
                speeds[i] = 0.4 + Math.random() * 0.7;
            }
        }
        animId = requestAnimationFrame(draw);
    }

    function init() {
        canvas = document.createElement('canvas');
        Object.assign(canvas.style, {
            position: 'fixed', top: '0', left: '0',
            width: '100%', height: '100%',
            zIndex: '9980', pointerEvents: 'none',
            opacity: '0', transition: 'opacity 0.5s ease'
        });
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        resize();
        window.addEventListener('resize', resize);
        ready = true;
    }

    return {
        toggle() {
            if (!ready) init();
            matrixRainActive = !matrixRainActive;
            canvas.style.opacity = matrixRainActive ? '1' : '0';
            if (matrixRainActive) {
                draw();
            } else {
                cancelAnimationFrame(animId);
                setTimeout(() => { if (!matrixRainActive) ctx.clearRect(0, 0, canvas.width, canvas.height); }, 600);
            }
            return matrixRainActive;
        },
        isActive() { return matrixRainActive; }
    };
})();

// ===== HIDDEN TERMINAL (press `) =====
const terminalEl = document.createElement('div');
terminalEl.className = 'terminal-overlay';
terminalEl.innerHTML = `
    <div class="terminal-header">
        <div class="terminal-dots"><span class="dot-red"></span><span class="dot-yellow"></span><span class="dot-green"></span></div>
        <span class="terminal-title">jkomonen@portfolio:~</span>
    </div>
    <div class="terminal-body" id="terminal-body">
        <div class="terminal-line">Welcome to Joshua's terminal. Type <span class="term-accent">help</span> for available commands.</div>
    </div>
    <div class="terminal-input-row">
        <span class="terminal-prompt-label">jkomonen@portfolio:~ $&nbsp;</span>
        <input class="terminal-input" id="terminal-input" type="text" autocomplete="off" spellcheck="false" placeholder="type a command...">
    </div>
`;
document.body.appendChild(terminalEl);

const termBody = document.getElementById('terminal-body');
const termInput = document.getElementById('terminal-input');
let termOpen = false;
let termHistory = [];
let termHistoryIdx = -1;

function openTerminal() {
    terminalEl.classList.add('open');
    terminalEl.classList.remove('minimized');
    termOpen = true;
    setTimeout(() => termInput.focus(), 420);
}

function closeTerminal() {
    terminalEl.classList.remove('open', 'minimized', 'maximized');
    termOpen = false;
}

document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' && e.target !== termInput) return;
    if (e.target.tagName === 'TEXTAREA') return;
    if (e.key === '`') {
        e.preventDefault();
        termHint.classList.remove('bouncing');
        termOpen ? closeTerminal() : openTerminal();
    }
    if (e.key === 'Escape') {
        if (termOpen) closeTerminal();
        if (matrixRainActive) matrixRain.toggle();
        if (eternalFCleanup) eternalFCleanup();
    }
});

terminalEl.querySelector('.dot-red').addEventListener('click', closeTerminal);
terminalEl.querySelector('.dot-yellow').addEventListener('click', () => {
    if (!termOpen) return;
    terminalEl.classList.toggle('minimized');
    if (!terminalEl.classList.contains('minimized')) setTimeout(() => termInput.focus(), 50);
});
terminalEl.querySelector('.dot-green').addEventListener('click', () => {
    if (!termOpen) return;
    terminalEl.classList.toggle('maximized');
    setTimeout(() => termInput.focus(), 50);
});

function termPrint(html, cls) {
    const line = document.createElement('div');
    line.className = 'terminal-line' + (cls ? ' ' + cls : '');
    line.innerHTML = html;
    termBody.appendChild(line);
    termBody.scrollTop = termBody.scrollHeight;
}

const termCommands = {
    help() {
        termPrint(`Available commands:\n  <span class="term-accent">whoami</span>    – About Joshua\n  <span class="term-accent">skills</span>    – Technical skills\n  <span class="term-accent">projects</span>  – Featured projects\n  <span class="term-accent">contact</span>   – Contact info\n  <span class="term-accent">hack</span>      – Initiate hack sequence\n  <span class="term-accent">matrix</span>    – Japanese matrix rain\n  <span class="term-accent">ls</span>        – List sections\n  <span class="term-accent">date</span>      – Current date/time\n  <span class="term-accent">clear</span>     – Clear terminal\n  <span class="term-accent">exit</span>      – Close terminal\n\nSecret interactions:\n  • Close terminal, then hold <span class="term-accent">F</span> on the page for 3 seconds to pay respects\n  • Type <span class="term-accent">nyan</span> in this terminal\n  • <span class="term-accent">↑↑↓↓←→←→BA</span> anywhere on the page\n  • Hold <span class="term-accent">Shift</span> and move the mouse to draw glowing neon ink\n  • Leave the page idle for 30 seconds\n  • Click and hold anywhere to summon a <span class="term-accent">black hole</span>\n  • Double-click anywhere for a glitch burst`, 'term-pre');
    },
    whoami() {
        termPrint(`Joshua Komonen\n  Role     <span class="term-accent">Software Engineer</span>\n  Stack    Full-Stack\n  Location Remote-friendly\n  Status   <span class="term-success">● Open to opportunities</span>`, 'term-pre');
    },
    skills() {
        termPrint(`Technical Skills:\n  <span class="term-accent">Frontend</span>  React · TypeScript · Next.js · Vue.js · Tailwind\n  <span class="term-accent">Backend</span>   Node.js · Python · Java · Express · FastAPI\n  <span class="term-accent">Database</span>  PostgreSQL · MongoDB · Redis · MySQL\n  <span class="term-accent">DevOps</span>    Docker · AWS · Kubernetes · CI/CD · Git`, 'term-pre');
    },
    projects() {
        termPrint(`Featured Projects:\n  <span class="term-purple">CloudSync</span>   Real-time collaboration platform\n  <span class="term-purple">DevMetrics</span>  Dev team analytics dashboard\n  <span class="term-purple">SecureAuth</span>  Enterprise auth microservice\n  <span class="term-purple">StreamFlow</span>  High-volume event streaming`, 'term-pre');
        termPrint(`→ <a href="#projects" class="term-link" onclick="closeTerminal()">View all projects ↗</a>`);
    },
    contact() {
        termPrint(`Contact:\n  Email    <span class="term-accent">joshkomonen@gmail.com</span>\n  GitHub   <span class="term-accent">github.com/jkomonen</span>\n  LinkedIn <span class="term-accent">linkedin.com/in/joshuakomonen</span>`, 'term-pre');
        termPrint(`→ <a href="#contact" class="term-link" onclick="closeTerminal()">Send a message ↗</a>`);
    },
    hack() {
        termPrint('Initiating hack sequence...', 'term-purple');
        const bar = document.createElement('div');
        bar.className = 'terminal-line';
        bar.innerHTML = '░░░░░░░░░░░░░░░░ 0%';
        termBody.appendChild(bar);
        termBody.scrollTop = termBody.scrollHeight;
        let pct = 0;
        const iv = setInterval(() => {
            pct += Math.floor(Math.random() * 15) + 5;
            if (pct >= 100) { pct = 100; clearInterval(iv); }
            const filled = Math.floor(pct / 100 * 16);
            bar.innerHTML = '▓'.repeat(filled) + '░'.repeat(16 - filled) + ` ${pct}%`;
            if (pct === 100) {
                termBody.scrollTop = termBody.scrollHeight;
                setTimeout(() => {
                    termPrint('ACCESS GRANTED. Welcome to the mainframe.', 'term-success');
                    closeTerminal();
                    activateHackMode();
                }, 300);
            }
        }, 120);
    },
    matrix() {
        const on = matrixRain.toggle();
        if (on) {
            termPrint(`<span class="term-success">▓▒░ MATRIX ENGAGED ░▒▓</span>`, 'term-pre');
            termPrint(`Japanese rain active. Type <span class="term-accent">matrix</span> again or press <span class="term-accent">Esc</span> to exit.`);
        } else {
            termPrint(`Matrix rain: <span class="term-error">DISENGAGED</span>`);
        }
    },
    ls() {
        termPrint(`drwxr-xr-x  <span class="term-accent">about/</span>\ndrwxr-xr-x  <span class="term-accent">skills/</span>\ndrwxr-xr-x  <span class="term-accent">projects/</span>\ndrwxr-xr-x  <span class="term-accent">contact/</span>\n-rw-r--r--  resume.pdf`, 'term-pre');
    },
    date() { termPrint(new Date().toString()); },
    clear() { termBody.innerHTML = ''; },
    exit() { termPrint('Goodbye.', 'term-purple'); setTimeout(closeTerminal, 400); },
    nyan() {
        termPrint(`<span class="term-error">⚠</span> WARNING: executing <span style="color:#ff69b4">nyan.exe</span>...`);
        termPrint(`<span style="color:#ff69b4">ニャン ニャン ニャン</span>`);
        setTimeout(() => { activateNyanMode(); closeTerminal(); }, 600);
    },
    sudo() { termPrint('Nice try. You are not in the sudoers file. This incident will be reported.', 'term-error'); },
    cd() { termPrint('There is no place like ~', 'term-accent'); },
    git() { termPrint('fatal: not a git repository (or any parent up to mount point /)'); },
    rm() { termPrint('rm: cannot remove \'/\': Permission denied', 'term-error'); }
};

termInput.addEventListener('keydown', (e) => {
    if (e.key === '`') { e.stopPropagation(); return; }
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        termHistoryIdx = Math.min(termHistoryIdx + 1, termHistory.length - 1);
        termInput.value = termHistory[termHistoryIdx] || '';
        return;
    }
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        termHistoryIdx = Math.max(termHistoryIdx - 1, -1);
        termInput.value = termHistoryIdx === -1 ? '' : termHistory[termHistoryIdx];
        return;
    }
    if (e.key !== 'Enter') return;
    const raw = termInput.value.trim();
    if (!raw) return;
    const cmd = raw.toLowerCase().split(' ')[0];
    termPrint(`<span class="term-accent">$</span> ${raw}`, 'term-prompt-echo');
    termHistory.unshift(raw);
    termHistoryIdx = -1;
    termInput.value = '';
    if (termCommands[cmd]) {
        termCommands[cmd]();
    } else {
        termPrint(`command not found: <span class="term-error">${cmd}</span>. Type <span class="term-accent">help</span> for available commands.`);
    }
});

// Permanent terminal toggle button (bottom right)
const termHint = document.createElement('div');
termHint.className = 'terminal-hint';
termHint.innerHTML = '<span class="term-hint-key">`</span> Terminal';
termHint.addEventListener('click', () => {
    termHint.classList.remove('bouncing');
    termOpen ? closeTerminal() : openTerminal();
});
document.body.appendChild(termHint);

// Bounce the button after 6s if it hasn't been clicked yet
setTimeout(() => {
    if (!termOpen) termHint.classList.add('bouncing');
}, 6000);

// ===== PARTICLE BLACK HOLE (click + hold) =====
let bhHoldTimer = null;
let bhEl = null;
let suppressNextClick = false;
let bhPointsInterval = null;
const BH_RECORD_KEY = 'bh_particle_record';

function spawnBhPoints(x, y, count) {
    const el = document.createElement('div');
    el.textContent = '+' + count;
    const size = Math.min(13 + count * 3, 32);
    el.style.cssText = `
        position:fixed;left:${x}px;top:${y - 55}px;
        transform:translate(-50%,-50%);
        color:#c084fc;font-family:'Fira Code',monospace;
        font-size:${size}px;font-weight:700;
        text-shadow:0 0 8px #a855f7,0 0 18px #7c3aed;
        pointer-events:none;z-index:9995;
        animation:bh-points-float 0.9s ease-out forwards;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 900);
}

function spawnBhTotal(x, y, total) {
    const prev = parseInt(localStorage.getItem(BH_RECORD_KEY) || '0');
    const isNew = total > prev;
    if (total > 0) localStorage.setItem(BH_RECORD_KEY, Math.max(total, prev));

    const el = document.createElement('div');
    el.textContent = total + ' ABSORBED';
    el.style.cssText = `
        position:fixed;left:${x}px;top:${y - 18}px;
        transform:translate(-50%,-50%);
        color:#e879f9;font-family:'Fira Code',monospace;
        font-size:20px;font-weight:700;letter-spacing:0.12em;
        text-shadow:0 0 12px #a855f7,0 0 30px #7c3aed,0 0 50px #4c1d95;
        pointer-events:none;z-index:9995;
        animation:bh-total-pop 1.6s ease-out forwards;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1600);

    const rec = document.createElement('div');
    if (isNew && total > 0) {
        rec.textContent = '★ NEW RECORD!';
        rec.style.color = '#fbbf24';
        rec.style.textShadow = '0 0 10px #f59e0b, 0 0 24px #d97706';
    } else if (prev > 0) {
        rec.textContent = 'BEST: ' + Math.max(total, prev);
        rec.style.color = '#94a3b8';
        rec.style.textShadow = '0 0 8px #475569';
    }
    if (rec.textContent) {
        rec.style.cssText += `
            position:fixed;left:${x}px;top:${y + 18}px;
            transform:translate(-50%,-50%);
            font-family:'Fira Code',monospace;
            font-size:13px;font-weight:600;letter-spacing:0.1em;
            pointer-events:none;z-index:9995;
            animation:bh-total-pop 1.6s ease-out forwards;
            animation-fill-mode:backwards;animation-delay:0.15s;
        `;
        document.body.appendChild(rec);
        setTimeout(() => rec.remove(), 1800);
    }
}

document.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    if (e.target.closest('a, button, input, textarea, .terminal-overlay, .navbar, .contact-form, .project-link')) return;
    bhHoldTimer = setTimeout(() => {
        isHolding = true;
        // Reset any previously absorbed particles before creating new black hole
        if (typeof particles !== 'undefined') {
            particles.forEach(p => { p.absorbed = false; });
        }
        bhComboTotal = 0;
        blackHole = { x: e.clientX, y: e.clientY, radius: BH_BASE_RADIUS, absorbedCount: 0, pendingPoints: 0 };
        bhEl = document.createElement('div');
        bhEl.className = 'black-hole-vortex';
        bhEl.style.left = e.clientX + 'px';
        bhEl.style.top = e.clientY + 'px';
        document.body.appendChild(bhEl);
        bhPointsInterval = setInterval(() => {
            if (!blackHole) { clearInterval(bhPointsInterval); return; }
            if (blackHole.pendingPoints > 0) {
                spawnBhPoints(blackHole.x, blackHole.y, blackHole.pendingPoints);

                blackHole.pendingPoints = 0;
            }
        }, 250);
    }, 350);
});

document.addEventListener('mousemove', (e) => {
    if (!isHolding || !blackHole) return;
    blackHole.x = e.clientX;
    blackHole.y = e.clientY;
    if (bhEl) { bhEl.style.left = e.clientX + 'px'; bhEl.style.top = e.clientY + 'px'; }
});

document.addEventListener('mouseup', () => {
    clearTimeout(bhHoldTimer);
    if (isHolding && blackHole) {
        suppressNextClick = true;
        if (typeof particles !== 'undefined') {
            particles.forEach(p => {
                if (p.absorbed) {
                    // Scatter absorbed particles outward in random directions
                    const angle = Math.random() * Math.PI * 2;
                    const dist = 80 + Math.random() * 200;
                    p.absorbed = false;
                    p.x = blackHole.x;
                    p.y = blackHole.y;
                    p.baseX = Math.max(0, Math.min(canvas.width, blackHole.x + Math.cos(angle) * dist));
                    p.baseY = Math.max(0, Math.min(canvas.height, blackHole.y + Math.sin(angle) * dist));
                } else {
                    const dx = p.x - blackHole.x;
                    const dy = p.y - blackHole.y;
                    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                    const force = Math.min(800 / dist, 25);
                    p.baseX += (dx / dist) * force;
                    p.baseY += (dy / dist) * force;
                }
            });
        }
        for (let i = 0; i < 3; i++) {
            const ring = document.createElement('div');
            ring.className = 'bh-shockwave';
            ring.style.left = blackHole.x + 'px';
            ring.style.top = blackHole.y + 'px';
            ring.style.animationDelay = `${i * 0.12}s`;
            document.body.appendChild(ring);
            setTimeout(() => ring.remove(), 1000);
        }
        clearInterval(bhPointsInterval);
        if (blackHole && blackHole.absorbedCount > 0) {
            spawnBhTotal(blackHole.x, blackHole.y, blackHole.absorbedCount);
        }
        document.body.style.filter = 'brightness(2)';
        setTimeout(() => document.body.style.filter = '', 120);
        if (bhEl) { bhEl.remove(); bhEl = null; }
        setTimeout(() => { suppressNextClick = false; }, 100);
    }
    isHolding = false;
    blackHole = null;
});

// ===== BACKGROUND MUSIC =====
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
let musicStarted = false;

function startMusic() {
    if (!musicStarted) {
        bgMusic.volume = 0.4;
        bgMusic.play().catch(() => {});
        musicStarted = true;
    }
}

// Start on first user interaction (browser autoplay policy)
document.addEventListener('click', startMusic, { once: true });
document.addEventListener('keydown', startMusic, { once: true });

musicToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    startMusic();
    bgMusic.muted = !bgMusic.muted;
    musicToggle.classList.toggle('muted', bgMusic.muted);
    musicToggle.textContent = bgMusic.muted ? '🔇' : '🔊';
    musicToggle.title = bgMusic.muted ? 'Unmute music' : 'Mute music';
});

// ===== THE ETERNAL F =====
// Hold F for 3 seconds anywhere on the page to pay respects.
// Particles stop, slowly drift into a giant glowing F, music fades, page dims.
// Then everything snaps back.
let eternalFActive = false;
let eternalFHoldTimer = null;
let eternalFKeyDown = false;
let eternalFCleanup = null;

function getEternalFTargets() {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = window.innerWidth;
    tempCanvas.height = window.innerHeight;

    const fontSize = Math.min(window.innerWidth * 0.55, window.innerHeight * 0.7);
    tempCtx.font = `bold ${fontSize}px Arial, sans-serif`;
    tempCtx.fillStyle = 'white';
    tempCtx.textBaseline = 'middle';
    tempCtx.textAlign = 'center';
    tempCtx.fillText('F', window.innerWidth / 2, window.innerHeight / 2);

    const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    const targets = [];
    const step = 10;

    for (let y = 0; y < tempCanvas.height; y += step) {
        for (let x = 0; x < tempCanvas.width; x += step) {
            const idx = (y * tempCanvas.width + x) * 4;
            if (imageData.data[idx + 3] > 128) {
                // Slight random jitter so the F looks organic, not grid-stamped
                targets.push({
                    x: x + Math.random() * step * 0.8,
                    y: y + Math.random() * step * 0.8
                });
            }
        }
    }
    return targets;
}

function activateEternalF() {
    if (eternalFActive) return;
    eternalFActive = true;

    // Dim the whole page
    const overlay = document.createElement('div');
    overlay.id = 'eternal-f-overlay';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0);
        z-index: 9994; pointer-events: none;
        transition: background 1.8s ease;
    `;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => { overlay.style.background = 'rgba(0,0,0,0.78)'; });

    // Lift the particle canvas above the overlay so the F is visible
    canvas.style.zIndex = '9995';

    // "Paying respects" label — fades in after particles have mostly formed
    const label = document.createElement('div');
    label.id = 'eternal-f-label';
    label.style.cssText = `
        position: fixed; bottom: 11%; left: 50%;
        transform: translateX(-50%);
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem; letter-spacing: 0.45em;
        color: rgba(100,116,139,0);
        text-transform: uppercase;
        z-index: 9999; pointer-events: none;
        transition: color 1s ease 2.2s;
        white-space: nowrap;
    `;
    label.textContent = '— paying respects —';
    document.body.appendChild(label);
    requestAnimationFrame(() => { label.style.color = 'rgba(100,116,139,0.75)'; });

    // Fade out music
    const savedVolume = bgMusic.volume;
    const musicFadeOut = setInterval(() => {
        bgMusic.volume = Math.max(0, bgMusic.volume - 0.022);
        if (bgMusic.volume <= 0) clearInterval(musicFadeOut);
    }, 60);

    // Build F targets from canvas glyph sampling
    const targets = getEternalFTargets().sort(() => Math.random() - 0.5);
    const savedColors = particles.map(p => p.color);

    particles.forEach((p, i) => {
        p.fTarget = targets[i % targets.length];
        // Each particle drifts at a slightly different speed for organic feel
        p.fLerpSpeed = 0.007 + Math.random() * 0.013;
        // Shift colour to bright teal so the F glows against the dark overlay
        p.color = `rgba(94, 234, 212, ${0.65 + Math.random() * 0.35})`;
    });

    // Auto-restore after 5 s
    const restoreTimer = setTimeout(() => {
        deactivateEternalF(savedVolume, savedColors, musicFadeOut);
    }, 5000);

    eternalFCleanup = () => {
        clearTimeout(restoreTimer);
        deactivateEternalF(savedVolume, savedColors, musicFadeOut);
    };
}

function deactivateEternalF(savedVolume, savedColors, musicFadeOutInterval) {
    eternalFActive = false;
    eternalFCleanup = null;

    // Drop canvas back behind page content
    canvas.style.zIndex = '-1';

    // Release particles — they drift back to base positions naturally
    particles.forEach((p, i) => {
        p.fTarget = null;
        if (savedColors[i]) p.color = savedColors[i];
    });

    // Fade music back in
    clearInterval(musicFadeOutInterval);
    const musicFadeIn = setInterval(() => {
        bgMusic.volume = Math.min(savedVolume, bgMusic.volume + 0.022);
        if (bgMusic.volume >= savedVolume) clearInterval(musicFadeIn);
    }, 60);

    // Undim page
    const overlay = document.getElementById('eternal-f-overlay');
    if (overlay) {
        overlay.style.background = 'rgba(0,0,0,0)';
        setTimeout(() => overlay.remove(), 1800);
    }

    // Fade out label
    const label = document.getElementById('eternal-f-label');
    if (label) {
        label.style.transition = 'color 0.7s ease';
        label.style.color = 'rgba(100,116,139,0)';
        setTimeout(() => label.remove(), 800);
    }
}

// Hold F for 3 seconds anywhere (not in input fields)
document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if ((e.key === 'f' || e.key === 'F') && !eternalFKeyDown && !eternalFActive) {
        eternalFKeyDown = true;
        eternalFHoldTimer = setTimeout(activateEternalF, 3000);
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'f' || e.key === 'F') {
        eternalFKeyDown = false;
        clearTimeout(eternalFHoldTimer);
    }
});

// ===== RAGE CLICK DETECTOR =====
// 5+ clicks within ~60px and 2s → "hey, you good?" + calming particle shower
const RAGE_RADIUS = 60;
const RAGE_COUNT  = 10;
const RAGE_WINDOW = 2000;

let rageClicks = [];
let rageCooldown = false;

document.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (rageCooldown) return;

    const now = Date.now();
    const x = e.clientX, y = e.clientY;

    // Keep only recent clicks near this point
    rageClicks = rageClicks.filter(c =>
        now - c.t < RAGE_WINDOW &&
        Math.hypot(c.x - x, c.y - y) < RAGE_RADIUS
    );
    rageClicks.push({ x, y, t: now });

    if (rageClicks.length >= RAGE_COUNT) {
        rageClicks = [];
        rageCooldown = true;
        triggerRageResponse(x, y);
        setTimeout(() => { rageCooldown = false; }, 4000);
    }
});

function triggerRageResponse(x, y) {
    // ── "hey, you good?" toast ──────────────────────────────
    const toast = document.createElement('div');
    toast.textContent = 'hey, you good? 💙';
    toast.style.cssText = `
        position: fixed;
        left: ${Math.min(Math.max(x - 80, 12), window.innerWidth - 180)}px;
        top:  ${y > 120 ? y - 56 : y + 24}px;
        background: rgba(15, 25, 35, 0.92);
        color: #94d2e6;
        font-family: 'Fira Code', monospace;
        font-size: 0.82rem;
        padding: 8px 16px;
        border-radius: 20px;
        border: 1px solid rgba(148, 210, 230, 0.25);
        box-shadow: 0 4px 24px rgba(6, 182, 212, 0.18);
        z-index: 99995;
        pointer-events: none;
        opacity: 0;
        transform: translateY(6px) scale(0.92);
        transition: opacity 0.25s ease, transform 0.25s ease;
        white-space: nowrap;
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0) scale(1)';
    });
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-6px) scale(0.92)';
        setTimeout(() => toast.remove(), 300);
    }, 2800);

    // ── Calming particle shower ─────────────────────────────
    const SHOWER_COLORS = ['#67e8f9', '#a5f3fc', '#7dd3fc', '#c4b5fd', '#a7f3d0', '#fde68a'];
    const SHAPES = ['❄', '✦', '·', '✿', '○', '✶'];
    const showerArea = 110; // px radius around click

    for (let i = 0; i < 38; i++) {
        setTimeout(() => {
            const p = document.createElement('div');
            const color  = SHOWER_COLORS[Math.floor(Math.random() * SHOWER_COLORS.length)];
            const shape  = SHAPES[Math.floor(Math.random() * SHAPES.length)];
            const size   = 8 + Math.random() * 14;
            const startX = x + (Math.random() - 0.5) * showerArea;
            const startY = y - 10 + Math.random() * 20;
            const drift  = (Math.random() - 0.5) * 80;
            const fall   = 180 + Math.random() * 160;
            const dur    = 1600 + Math.random() * 900;

            p.textContent = shape;
            p.style.cssText = `
                position: fixed;
                left: ${startX}px;
                top: ${startY}px;
                font-size: ${size}px;
                color: ${color};
                pointer-events: none;
                z-index: 99994;
                opacity: 0;
                text-shadow: 0 0 8px ${color}88;
                user-select: none;
            `;
            document.body.appendChild(p);

            p.animate([
                { opacity: 0,   transform: `translate(0, 0) rotate(0deg) scale(0.6)` },
                { opacity: 0.9, transform: `translate(${drift * 0.4}px, ${fall * 0.35}px) rotate(${Math.random()*120}deg) scale(1)`, offset: 0.2 },
                { opacity: 0,   transform: `translate(${drift}px, ${fall}px) rotate(${Math.random()*360}deg) scale(0.5)` },
            ], { duration: dur, easing: 'cubic-bezier(0.2, 0.8, 0.4, 1)' });

            setTimeout(() => p.remove(), dur + 50);
        }, i * 55);
    }
}

// ===== MOUSE DRAWING CANVAS =====
// Hold Shift + move mouse to paint glowing neon ink. Strokes fade slowly.
// Background particles are attracted to wherever you've drawn.

var activeDrawPoints = []; // var so Particle.update() can safely read it before this line executes

const DRAW_NEONS = ['#14f0d0', '#c084fc', '#f472b6', '#fb923c', '#facc15', '#4ade80', '#38bdf8'];
let drawColorIdx = 0;
let lastDrawX = null, lastDrawY = null;

const inkCanvas = document.createElement('canvas');
inkCanvas.style.cssText = 'position:fixed;inset:0;z-index:9970;pointer-events:none;';
inkCanvas.width  = window.innerWidth;
inkCanvas.height = window.innerHeight;
document.body.appendChild(inkCanvas);
const inkCtx = inkCanvas.getContext('2d');

window.addEventListener('resize', () => {
    inkCanvas.width  = window.innerWidth;
    inkCanvas.height = window.innerHeight;
});

// Cursor badge shown while drawing
const inkHint = document.createElement('div');
inkHint.style.cssText = `
    position: fixed; pointer-events: none; z-index: 99993;
    font-family: 'Fira Code', monospace; font-size: 0.64rem;
    color: #fff; background: rgba(0,0,0,0.55);
    padding: 2px 9px; border-radius: 12px;
    display: none; white-space: nowrap;
    transform: translate(14px, -22px);
    border: 1px solid rgba(255,255,255,0.15);
`;
document.body.appendChild(inkHint);

// Fade loop — destination-out gradually erases ink while keeping canvas transparent
(function inkFadeLoop() {
    inkCtx.globalCompositeOperation = 'destination-out';
    inkCtx.fillStyle = 'rgba(0,0,0,0.003)';
    inkCtx.fillRect(0, 0, inkCanvas.width, inkCanvas.height);
    inkCtx.globalCompositeOperation = 'source-over';

    // Retire draw points older than 12 s so particle attraction winds down
    const cutoff = Date.now() - 12000;
    while (activeDrawPoints.length > 0 && activeDrawPoints[0].t < cutoff) activeDrawPoints.shift();

    requestAnimationFrame(inkFadeLoop);
})();

document.addEventListener('mousemove', (e) => {
    inkHint.style.left = e.clientX + 'px';
    inkHint.style.top  = e.clientY + 'px';

    if (!e.shiftKey) {
        if (lastDrawX !== null) {
            // Stroke ended — next stroke gets a fresh color
            drawColorIdx = (drawColorIdx + 1) % DRAW_NEONS.length;
            lastDrawX = null;
            lastDrawY = null;
        }
        inkHint.style.display = 'none';
        return;
    }

    const col = DRAW_NEONS[drawColorIdx];
    inkHint.style.display = 'block';
    inkHint.style.color = col;
    inkHint.style.borderColor = col + '55';
    inkHint.textContent = '✏ drawing';

    const x = e.clientX, y = e.clientY;

    if (lastDrawX !== null) {
        // Outer glow pass
        inkCtx.beginPath();
        inkCtx.moveTo(lastDrawX, lastDrawY);
        inkCtx.lineTo(x, y);
        inkCtx.strokeStyle = col;
        inkCtx.lineWidth = 8;
        inkCtx.lineCap = 'round';
        inkCtx.lineJoin = 'round';
        inkCtx.shadowColor = col;
        inkCtx.shadowBlur = 24;
        inkCtx.globalAlpha = 0.4;
        inkCtx.stroke();

        // Bright core pass
        inkCtx.lineWidth = 2;
        inkCtx.strokeStyle = '#ffffff';
        inkCtx.shadowBlur = 8;
        inkCtx.globalAlpha = 0.88;
        inkCtx.stroke();

        inkCtx.shadowBlur = 0;
        inkCtx.globalAlpha = 1;

        // Record midpoint for particle attraction
        activeDrawPoints.push({ x: (lastDrawX + x) / 2, y: (lastDrawY + y) / 2, t: Date.now() });
        if (activeDrawPoints.length > 500) activeDrawPoints.shift();
    }

    lastDrawX = x;
    lastDrawY = y;
});

// ===== PARTICLE CONSTELLATION MODE =====
// 30 s of inactivity → particles cluster into real constellation shapes.
// Animated twinkling stars with glow layers + diffraction spikes on bright stars.
(function initConstellationMode() {
    const CONSTELLATIONS = [
        {
            name: 'Orion', subtitle: 'the hunter',
            stars: [
                { x: 0.36, y: 0.25, mag: 1 }, // Betelgeuse
                { x: 0.64, y: 0.22, mag: 2 }, // Bellatrix
                { x: 0.42, y: 0.46, mag: 2 }, // Alnitak
                { x: 0.50, y: 0.44, mag: 2 }, // Alnilam
                { x: 0.58, y: 0.42, mag: 2 }, // Mintaka
                { x: 0.37, y: 0.70, mag: 3 }, // Saiph
                { x: 0.65, y: 0.68, mag: 1 }, // Rigel
                { x: 0.46, y: 0.14, mag: 4 }, // Pi³ Ori
                { x: 0.54, y: 0.12, mag: 4 }, // Pi⁴ Ori
            ],
            lines: [[0,1],[0,2],[1,4],[2,3],[3,4],[2,5],[4,6],[0,7],[1,8],[7,8]]
        },
        {
            name: 'Big Dipper', subtitle: 'part of ursa major',
            stars: [
                { x: 0.28, y: 0.35, mag: 2 }, // Dubhe
                { x: 0.28, y: 0.48, mag: 2 }, // Merak
                { x: 0.40, y: 0.50, mag: 3 }, // Phecda
                { x: 0.40, y: 0.37, mag: 3 }, // Megrez
                { x: 0.52, y: 0.30, mag: 2 }, // Alioth
                { x: 0.62, y: 0.26, mag: 2 }, // Mizar
                { x: 0.72, y: 0.23, mag: 2 }, // Alkaid
            ],
            lines: [[0,1],[1,2],[2,3],[3,0],[3,4],[4,5],[5,6]]
        },
        {
            name: 'Cassiopeia', subtitle: 'the queen',
            stars: [
                { x: 0.28, y: 0.48, mag: 3 }, // Caph
                { x: 0.38, y: 0.34, mag: 2 }, // Schedar
                { x: 0.50, y: 0.44, mag: 2 }, // Gamma Cas
                { x: 0.62, y: 0.32, mag: 3 }, // Ruchbah
                { x: 0.72, y: 0.44, mag: 3 }, // Segin
            ],
            lines: [[0,1],[1,2],[2,3],[3,4]]
        },
        {
            name: 'Lyra', subtitle: 'the lyre',
            stars: [
                { x: 0.50, y: 0.22, mag: 1 }, // Vega
                { x: 0.38, y: 0.46, mag: 3 }, // Beta Lyrae
                { x: 0.62, y: 0.46, mag: 3 }, // Gamma Lyrae
                { x: 0.42, y: 0.60, mag: 4 }, // Delta Lyrae
                { x: 0.58, y: 0.60, mag: 4 }, // Zeta Lyrae
            ],
            lines: [[0,1],[0,2],[1,3],[2,4],[3,4]]
        },
    ];

    let constellationActive = false;
    let constellIdx = Math.floor(Math.random() * CONSTELLATIONS.length);
    let constellationTimer = null;
    let cycleTimer = null;
    let twinkleAnimId = null;
    let lastActivityReset = 0;
    let savedParticleColors = [];

    // Subtle dark overlay — makes it feel like looking at a night sky
    const dimEl = document.createElement('div');
    dimEl.style.cssText = `
        position: fixed; inset: 0; pointer-events: none; z-index: 9973;
        background: rgba(0, 5, 20, 0); transition: background 4s ease;
    `;
    document.body.appendChild(dimEl);

    // Canvas for animated star glows, lines, and label
    const cCanvas = document.createElement('canvas');
    cCanvas.style.cssText = `
        position: fixed; inset: 0; pointer-events: none; z-index: 9975;
        opacity: 0; transition: opacity 2.5s ease;
    `;
    cCanvas.width  = window.innerWidth;
    cCanvas.height = window.innerHeight;
    document.body.appendChild(cCanvas);
    const cCtx = cCanvas.getContext('2d');

    window.addEventListener('resize', () => {
        cCanvas.width  = window.innerWidth;
        cCanvas.height = window.innerHeight;
    });

    function toPixels(c) {
        return c.stars.map(s => ({ x: s.x * window.innerWidth, y: s.y * window.innerHeight }));
    }

    // Draw one twinkling star — three radial gradient layers + diffraction spikes
    function drawStar(x, y, mag, twinkle) {
        const base = [14, 10, 7, 5, 3.5][mag - 1] * (0.82 + 0.18 * twinkle);

        // Wide atmospheric halo
        const h = cCtx.createRadialGradient(x, y, 0, x, y, base * 4.5);
        h.addColorStop(0,   `rgba(180, 220, 255, ${0.16 * twinkle})`);
        h.addColorStop(0.5, `rgba(148, 200, 245, ${0.07 * twinkle})`);
        h.addColorStop(1,   'rgba(100, 160, 225, 0)');
        cCtx.beginPath(); cCtx.arc(x, y, base * 4.5, 0, Math.PI * 2);
        cCtx.fillStyle = h; cCtx.fill();

        // Mid glow
        const m = cCtx.createRadialGradient(x, y, 0, x, y, base * 2);
        m.addColorStop(0,   `rgba(210, 235, 255, ${0.58 * twinkle})`);
        m.addColorStop(0.6, `rgba(170, 215, 255, ${0.22 * twinkle})`);
        m.addColorStop(1,   'rgba(148, 200, 245, 0)');
        cCtx.beginPath(); cCtx.arc(x, y, base * 2, 0, Math.PI * 2);
        cCtx.fillStyle = m; cCtx.fill();

        // Bright white core
        const c = cCtx.createRadialGradient(x, y, 0, x, y, base);
        c.addColorStop(0,   `rgba(255, 255, 255, ${0.95 * twinkle})`);
        c.addColorStop(0.5, `rgba(220, 240, 255, ${0.68 * twinkle})`);
        c.addColorStop(1,   'rgba(180, 215, 255, 0)');
        cCtx.beginPath(); cCtx.arc(x, y, base, 0, Math.PI * 2);
        cCtx.fillStyle = c; cCtx.fill();

        // Diffraction spikes on bright stars (mag 1–2)
        if (mag <= 2) {
            const spike = base * (3.5 + 1.5 * twinkle);
            cCtx.save();
            cCtx.strokeStyle = `rgba(200, 230, 255, ${0.28 * twinkle})`;
            cCtx.lineWidth = 0.7;
            [[1, 0], [0, 1]].forEach(([dx, dy]) => {
                cCtx.beginPath();
                cCtx.moveTo(x - dx * spike, y - dy * spike);
                cCtx.lineTo(x + dx * spike, y + dy * spike);
                cCtx.stroke();
            });
            cCtx.restore();
        }
    }

    // Full animated frame — lines, then stars on top, then label
    function renderFrame(t, constellation) {
        cCtx.clearRect(0, 0, cCanvas.width, cCanvas.height);
        const pts = toPixels(constellation);

        // Connecting lines with soft glow
        cCtx.save();
        cCtx.strokeStyle = 'rgba(148, 195, 235, 0.16)';
        cCtx.lineWidth   = 0.9;
        cCtx.shadowColor = 'rgba(148, 200, 235, 0.22)';
        cCtx.shadowBlur  = 5;
        constellation.lines.forEach(([a, b]) => {
            cCtx.beginPath();
            cCtx.moveTo(pts[a].x, pts[a].y);
            cCtx.lineTo(pts[b].x, pts[b].y);
            cCtx.stroke();
        });
        cCtx.restore();

        // Twinkling stars — each has a unique phase offset
        pts.forEach(({ x, y }, i) => {
            const mag     = constellation.stars[i].mag || 3;
            const twinkle = 0.72 + 0.28 * Math.sin(t * 0.0013 + i * 1.73);
            drawStar(x, y, mag, twinkle);
        });

        // Constellation name + subtitle below the lowest star
        const cx   = pts.reduce((s, p) => s + p.x, 0) / pts.length;
        const botY = Math.max(...pts.map(p => p.y)) + 44;
        cCtx.save();
        cCtx.textAlign = 'center';
        cCtx.shadowColor = 'rgba(148, 200, 235, 0.5)';
        cCtx.shadowBlur  = 8;
        cCtx.font      = "12px 'Fira Code', monospace";
        cCtx.fillStyle = 'rgba(180, 220, 245, 0.55)';
        cCtx.fillText(constellation.name.toUpperCase(), cx, Math.min(botY, cCanvas.height - 22));
        cCtx.shadowBlur = 0;
        cCtx.font      = "10px 'Fira Code', monospace";
        cCtx.fillStyle = 'rgba(148, 200, 225, 0.28)';
        cCtx.fillText(constellation.subtitle || '', cx, Math.min(botY + 18, cCanvas.height - 6));
        cCtx.restore();
    }

    function startAnimation(constellation) {
        cancelAnimationFrame(twinkleAnimId);
        function loop(t) {
            if (!constellationActive) return;
            renderFrame(t, constellation);
            twinkleAnimId = requestAnimationFrame(loop);
        }
        twinkleAnimId = requestAnimationFrame(loop);
    }

    // Distribute particles by star magnitude — brighter stars get more, clustered tighter
    function assignParticles(constellation) {
        const pts     = toPixels(constellation);
        const weights = constellation.stars.map(s => 6 - (s.mag || 3));
        const totalW  = weights.reduce((a, b) => a + b, 0);

        const assignments = [];
        weights.forEach((w, i) => {
            const n = Math.round(particles.length * w / totalW);
            for (let j = 0; j < n; j++) assignments.push(i);
        });
        while (assignments.length < particles.length) assignments.push(Math.floor(Math.random() * pts.length));
        assignments.length = particles.length;
        assignments.sort(() => Math.random() - 0.5);

        savedParticleColors = particles.map(p => p.color);
        particles.forEach((p, i) => {
            const { x, y }  = pts[assignments[i]];
            const mag        = constellation.stars[assignments[i]].mag || 3;
            const jitter     = [3, 6, 10, 14, 18][mag - 1] ?? 10;
            p.fTarget        = { x: x + (Math.random() - 0.5) * jitter, y: y + (Math.random() - 0.5) * jitter };
            p.fLerpSpeed     = 0.004 + Math.random() * 0.008;
            const r = Math.random();
            p.color = r > 0.7  ? 'rgba(220, 238, 255, 0.92)' :
                      r > 0.35 ? 'rgba(200, 224, 255, 0.86)' :
                                 'rgba(180, 212, 248, 0.80)';
        });
    }

    function activate() {
        if (constellationActive) return;
        if (typeof eternalFActive !== 'undefined' && eternalFActive) return;
        constellationActive = true;
        const c = CONSTELLATIONS[constellIdx];
        assignParticles(c);
        dimEl.style.transition = 'background 4s ease';
        dimEl.style.background = 'rgba(0, 5, 20, 0.38)';
        setTimeout(() => {
            if (!constellationActive) return;
            startAnimation(c);
            cCanvas.style.opacity = '1';
        }, 4000);
        cycleTimer = setTimeout(cycleTo, 40000);
    }

    function cycleTo() {
        if (!constellationActive) return;
        constellIdx = (constellIdx + 1) % CONSTELLATIONS.length;
        cCanvas.style.opacity = '0';
        cancelAnimationFrame(twinkleAnimId);
        setTimeout(() => {
            if (!constellationActive) return;
            const c = CONSTELLATIONS[constellIdx];
            assignParticles(c);
            setTimeout(() => {
                if (!constellationActive) return;
                startAnimation(c);
                cCanvas.style.opacity = '1';
                cycleTimer = setTimeout(cycleTo, 40000);
            }, 3500);
        }, 2500);
    }

    function deactivate() {
        if (!constellationActive) return;
        constellationActive = false;
        clearTimeout(cycleTimer);
        cancelAnimationFrame(twinkleAnimId);
        cCanvas.style.opacity = '0';
        dimEl.style.transition = 'none';
        dimEl.style.background = 'rgba(0, 5, 20, 0)';
        if (typeof eternalFActive === 'undefined' || !eternalFActive) {
            particles.forEach((p, i) => {
                p.fTarget = null;
                if (savedParticleColors[i]) p.color = savedParticleColors[i];
            });
        }
    }

    function onActivity() {
        if (constellationActive) deactivate();
        const now = Date.now();
        if (now - lastActivityReset < 800) return;
        lastActivityReset = now;
        clearTimeout(constellationTimer);
        constellationTimer = setTimeout(activate, 30000);
    }

    ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'].forEach(ev =>
        document.addEventListener(ev, onActivity, { passive: true })
    );

    constellationTimer = setTimeout(activate, 30000);
})();
