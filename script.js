// ==========================================
// FLORENCE SKIES GOLD - ENTERPRISE OPERATIONS & PORTAL ENGINE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Live UTC Clock Initialization
    function updateClock() {
        const now = new Date();
        const utcString = now.toUTCString().slice(17, 25) + " UTC";
        const clockEl = document.getElementById('live-utc-clock');
        if (clockEl) {
            clockEl.innerText = utcString;
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 2. Real-Time Canvas Construction Background Animation Engine
    const canvas = document.getElementById('site-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        let craneAngle1 = 0;
        let craneAngle2 = 0;
        let cableLen1 = 70;
        let cableLen2 = 100;
        let cableDir1 = 1;
        let cableDir2 = -1;
        
        const particles = [];
        const particleCount = window.innerWidth < 768 ? 25 : 45;
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: canvas.height - Math.random() * 300,
                radius: Math.random() * 1.6 + 0.4,
                speedY: (Math.random() * 0.7 + 0.2) * -1,
                speedX: (Math.random() - 0.5) * 0.4,
                alpha: Math.random() * 0.6 + 0.1
            });
        }

        function drawSite() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Sky Background Gradient
            const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
            bgGrad.addColorStop(0, '#030712');
            bgGrad.addColorStop(0.5, '#080d1a');
            bgGrad.addColorStop(1, '#0f172a');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Engineering Blueprint Grid Lines
            ctx.strokeStyle = 'rgba(245, 158, 11, 0.03)';
            ctx.lineWidth = 1;
            const gridSize = 50;
            for (let x = 0; x < canvas.width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            const groundY = canvas.height - 60;

            // Ground Earth Line
            ctx.fillStyle = '#020617';
            ctx.fillRect(0, groundY, canvas.width, 60);
            ctx.fillStyle = '#f59e0b';
            ctx.fillRect(0, groundY, canvas.width, 3);

            // Building Silhouette
            const bWidth = Math.min(400, canvas.width * 0.8);
            const bHeight = 280;
            const bX = (canvas.width - bWidth) / 2;
            const bY = groundY - bHeight;

            ctx.fillStyle = 'rgba(10, 17, 30, 0.92)';
            ctx.fillRect(bX, bY, bWidth, bHeight);
            ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(bX, bY, bWidth, bHeight);

            // Floors & Windows
            const floors = 6;
            const cols = 5;
            const fHeight = bHeight / floors;
            const cWidth = bWidth / cols;

            for (let f = 0; f < floors; f++) {
                for (let c = 0; c < cols; c++) {
                    const wx = bX + c * cWidth + 10;
                    const wy = bY + f * fHeight + 8;
                    const ww = cWidth - 20;
                    const wh = fHeight - 14;

                    ctx.fillStyle = (f === floors - 1 && (c === 1 || c === 3)) ? 'rgba(245, 158, 11, 0.45)' : 'rgba(3, 7, 18, 0.95)';
                    ctx.fillRect(wx, wy, ww, wh);
                    ctx.strokeStyle = 'rgba(51, 65, 85, 0.6)';
                    ctx.strokeRect(wx, wy, ww, wh);

                    if ((f + c) % 3 === 0) {
                        ctx.fillStyle = 'rgba(245, 158, 11, 0.22)';
                        ctx.fillRect(wx + 3, wy + 3, ww - 6, wh - 6);
                    }
                }
            }

            // Left Crane
            ctx.save();
            const crane1X = Math.max(40, bX - 60);
            const crane1Y = groundY;
            ctx.fillStyle = '#1e293b';
            ctx.fillRect(crane1X - 5, crane1Y - 300, 10, 300);
            
            craneAngle1 += 0.003;
            const armLen1 = 120;
            const tipX1 = crane1X + Math.cos(craneAngle1) * armLen1;
            const tipY1 = (crane1Y - 300) + Math.sin(craneAngle1) * 18;

            ctx.strokeStyle = '#d97706';
            ctx.lineWidth = 3.5;
            ctx.beginPath();
            ctx.moveTo(crane1X, crane1Y - 300);
            ctx.lineTo(tipX1, tipY1);
            ctx.stroke();

            cableLen1 += cableDir1 * 0.35;
            if (cableLen1 > 110 || cableLen1 < 50) cableDir1 *= -1;
            
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(tipX1 - 25, tipY1);
            ctx.lineTo(tipX1 - 25, tipY1 + cableLen1);
            ctx.stroke();
            ctx.restore();

            // Right Crane
            ctx.save();
            const crane2X = Math.min(canvas.width - 40, bX + bWidth + 60);
            const crane2Y = groundY;
            ctx.fillStyle = '#1e293b';
            ctx.fillRect(crane2X - 5, crane2Y - 320, 10, 320);
            
            craneAngle2 -= 0.0025;
            const armLen2 = 130;
            const tipX2 = crane2X + Math.cos(craneAngle2) * armLen2;
            const tipY2 = (crane2Y - 320) + Math.sin(craneAngle2) * 18;

            ctx.strokeStyle = '#d97706';
            ctx.lineWidth = 3.5;
            ctx.beginPath();
            ctx.moveTo(crane2X, crane2Y - 320);
            ctx.lineTo(tipX2, tipY2);
            ctx.stroke();

            cableLen2 += cableDir2 * 0.4;
            if (cableLen2 > 120 || cableLen2 < 60) cableDir2 *= -1;
            
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(tipX2 + 30, tipY2);
            ctx.lineTo(tipX2 + 30, tipY2 + cableLen2);
            ctx.stroke();
            ctx.restore();

            // Dust & Sparks Particles
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(245, 158, 11, ${p.alpha})`;
                ctx.fill();

                p.y += p.speedY;
                p.x += p.speedX;

                if (p.y < groundY - 280) {
                    p.y = groundY - 10;
                    p.x = Math.random() * canvas.width;
                }
            });

            requestAnimationFrame(drawSite);
        }

        drawSite();
    }
});

// 3. Tab Switching Engine with Laser Beam Animation
function switchTab(tabId) {
    const overlay = document.getElementById('page-transition-overlay');
    if (overlay) overlay.classList.add('animate');

    setTimeout(() => {
        const tabs = document.querySelectorAll('.tab-content');
        tabs.forEach(tab => tab.classList.add('hidden'));

        const targetTab = document.getElementById('tab-' + tabId);
        if (targetTab) targetTab.classList.remove('hidden');

        const heroSection = document.getElementById('hero-section');
        if (heroSection) {
            if (tabId === 'overview') {
                heroSection.classList.remove('hidden');
            } else {
                heroSection.classList.add('hidden');
            }
        }

        const navButtons = ['overview', 'services', 'telemetry', 'logistics', 'compliance', 'demo', 'vision', 'privacy', 'terms'];
        navButtons.forEach(btn => {
            const el = document.getElementById('nav-' + btn);
            if (el) {
                el.classList.remove('border-amber-500', 'text-amber-400');
                el.classList.add('border-transparent', 'text-slate-400');
            }
        });

        const activeBtn = document.getElementById('nav-' + tabId);
        if (activeBtn) {
            activeBtn.classList.remove('border-transparent', 'text-slate-400');
            activeBtn.classList.add('border-amber-500', 'text-amber-400');
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 250);

    setTimeout(() => {
        if (overlay) overlay.classList.remove('animate');
    }, 500);
}

// 4. Modal Dialog Toggle Handler
function toggleModal(show) {
    const modal = document.getElementById('audit-modal');
    if (modal) {
        if (show) {
            modal.classList.remove('hidden');
        } else {
            modal.classList.add('hidden');
        }
    }
}
