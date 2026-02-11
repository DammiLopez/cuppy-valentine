const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const heartImg = new Image();
heartImg.src = 'https://cdn-icons-png.flaticon.com/512/833/833472.png'

let hearts = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Heart {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 50;
        this.size = Math.random() * 20 + 10;
        this.speed = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
        this.y -= this.speed;
        if (this.y < -50) this.reset();
    }
    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(heartImg, this.x, this.y, this.size, this.size);
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(h => { h.update(); h.draw(); });
    requestAnimationFrame(animate);
}

heartImg.onload = () => {
    for(let i=0; i<30; i++) hearts.push(new Heart());
    animate();
};

// --- LÓGICA DEL BOTÓN Y MODAL ---
const noBtn = document.getElementById('noBtn');
const noBtnSlot = document.getElementById('noBtnSlot');
const yesBtn = document.getElementById('yesBtn');
const modal = document.getElementById('successModal');

function posicionarBotónInicial() {
    const rect = noBtnSlot.getBoundingClientRect();
    noBtn.style.left = `${rect.left}px`;
    noBtn.style.top = `${rect.top}px`;
    noBtn.style.opacity = "1";
}

window.addEventListener('load', posicionarBotónInicial);
window.addEventListener('resize', posicionarBotónInicial);

function moverBoton() {
    const padding = 80;
    const maxX = window.innerWidth - noBtn.clientWidth - padding;
    const maxY = window.innerHeight - noBtn.clientHeight - padding;

    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

noBtn.addEventListener('mouseenter', moverBoton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moverBoton();
});

// Abrir Modal
yesBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

// Cerrar Modal
function closeModal() {
    modal.style.display = 'none';
}