const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

const hexSize = 30;
const rows = 8;
const cols = 10;

// Position de départ de l'unité
let unit = {
    col: 2,
    row: 3
};

// Dessine un hexagone
function drawHex(x, y) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        let angle = Math.PI / 3 * i;
        let px = x + hexSize * Math.cos(angle);
        let py = y + hexSize * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.strokeStyle = "white";
    ctx.stroke();
}

// Dessine toute la grille
function drawGrid() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {

            let x = col * hexSize * 1.7 + 60;
            let y = row * hexSize * 1.5 + 60;

            if (col % 2 === 1) {
                y += hexSize * 0.75;
            }

            drawHex(x, y);
        }
    }
}

// Dessine l'unité
function drawUnit() {
    let x = unit.col * hexSize * 1.7 + 60;
    let y = unit.row * hexSize * 1.5 + 60;

    if (unit.col % 2 === 1) {
        y += hexSize * 0.75;
    }

    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
}

// Fonction principale
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawUnit();
}

// Gestion du clic
canvas.addEventListener("click", function(event) {

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    let col = Math.floor((mouseX - 60) / (hexSize * 1.7));
    let row;

    if (col % 2 === 1) {
        row = Math.floor((mouseY - 60 - hexSize * 0.75) / (hexSize * 1.5));
    } else {
        row = Math.floor((mouseY - 60) / (hexSize * 1.5));
    }

    // Vérifie que le clic est dans la grille
    if (col >= 0 && col < cols && row >= 0 && row < rows) {
        unit.col = col;
        unit.row = row;
        draw();
    }
});

// Lancer le jeu
draw();
