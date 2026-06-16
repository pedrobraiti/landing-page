/**
 * Floating "Matrix" letters rendered on a full-screen canvas.
 * Letters fade in, fall and rotate away when the cursor passes near them.
 */

const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789&?!<>+%';
const MAX_LETTERS = 300;
const SPAWN_INTERVAL_MS = 75;
const MOUSE_RADIUS = 50;

class Letter {
    constructor(x, y, char) {
        this.x = x;
        this.y = y;
        this.char = char;
        this.fontSize = 20;
        this.isFalling = false;
        this.rotation = 0;
        this.opacity = 0;
        this.fallSpeed = 0;
        this.rotationSpeed = 0;
    }

    startFall() {
        if (this.isFalling) return;
        this.isFalling = true;
        this.fallSpeed = Math.random() * 5 + 3;
        this.rotationSpeed = (Math.random() - 0.5) * 0.2;
        this.rotation = (Math.random() - 0.5) * 40;
    }

    update() {
        if (!this.isFalling) {
            if (this.opacity < 1) this.opacity += 0.02;
            return;
        }
        this.y += this.fallSpeed;
        this.fallSpeed += 0.2;
        this.fontSize += 0.5;
        this.rotation += this.rotationSpeed;
        this.opacity -= 0.02;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.font = `${this.fontSize}px monospace`;
        ctx.fillStyle = `rgba(0, 255, 149, ${this.opacity})`;
        ctx.fillText(this.char, 0, 0);
        ctx.restore();
    }

    checkMouse(mouseX, mouseY) {
        const distance = Math.hypot(this.x - mouseX, this.y - mouseY);
        if (distance < MOUSE_RADIUS && !this.isFalling) {
            this.startFall();
        }
    }
}

export function initMatrixBackground() {
    const canvas = document.getElementById('matrix-background');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = [];
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;
    });

    function spawnLetter() {
        if (letters.length >= MAX_LETTERS) return;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        letters.push(new Letter(x, y, char));
    }

    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = letters.length - 1; i >= 0; i--) {
            const letter = letters[i];
            letter.checkMouse(mouseX, mouseY);
            letter.update();
            letter.draw(ctx);

            if (letter.y > canvas.height + 100 || letter.opacity <= 0) {
                letters.splice(i, 1);
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
    setInterval(spawnLetter, SPAWN_INTERVAL_MS);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}
