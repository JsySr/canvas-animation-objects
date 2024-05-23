class Circle {
    constructor(x, y, radius, color, text, backcolor, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.backcolor = backcolor;
        this.speed = speed;
        this.dx = (Math.random() > 0.5 ? 1 : -1) * this.speed;
        this.dy = (Math.random() > 0.5 ? 1 : -1) * this.speed;
    }

    // Dibuja el círculo en el canvas
    draw(context) {
        context.beginPath();
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.backcolor;
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = this.color;
        context.stroke();
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "bold 20px cursive";
        context.fillStyle = "white";
        context.fillText(this.text, this.posX, this.posY);
        context.closePath();
    }

    // Actualiza la posición del círculo y maneja los rebotes
    update(context, window_width, window_height) {
        this.draw(context);
        if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.posX += this.dx;
        this.posY += this.dy;
    }
}

// Inicializa el canvas y los círculos
const initializeCanvas = (canvasId, nCircles) => {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    const window_height = 300;
    const window_width = 500;
    canvas.height = window_height;
    canvas.width = window_width;
    canvas.style.backgroundColor = "#b7f7ed";

    const circles = [];
    for (let i = 0; i < nCircles; i++) {
        let randomRadius = Math.floor(Math.random() * 30 + 20);
        let randomX = Math.random() * window_width;
        let randomY = Math.random() * window_height;
        let randomBackcolor = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
        let randomStrokecolor = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
        randomX = randomX < randomRadius ? randomRadius : randomX > window_width - randomRadius ? window_width - randomRadius : randomX;
        randomY = randomY < randomRadius ? randomRadius : randomY > window_height - randomRadius ? window_height - randomRadius : randomY;
        const speed = Math.random() * 3 + 1; // Velocidad aleatoria entre 1 y 4
        const circle = new Circle(randomX, randomY, randomRadius, randomStrokecolor, i + 1, randomBackcolor, speed);
        circles.push(circle);
    }

    // Actualiza el canvas y la tabla de coordenadas
    const updateCanvas = () => {
        requestAnimationFrame(updateCanvas);
        ctx.clearRect(0, 0, window_width, window_height);
        circles.forEach(circle => {
            circle.update(ctx, window_width, window_height);
        });
        updateCoordinatesTable(circles);
    };
    updateCanvas();
};

// Actualiza la tabla de coordenadas
const updateCoordinatesTable = (circles) => {
    const tableBody = document.getElementById("coordinates-table-body");
    tableBody.innerHTML = ''; // Limpia la tabla
    circles.forEach((circle, index) => {
        const row = document.createElement("tr");
        const cellIndex = document.createElement("td");
        cellIndex.textContent = index + 1;
        const cellX = document.createElement("td");
        cellX.textContent = circle.posX.toFixed(2);
        const cellY = document.createElement("td");
        cellY.textContent = circle.posY.toFixed(2);
        row.appendChild(cellIndex);
        row.appendChild(cellX);
        row.appendChild(cellY);
        tableBody.appendChild(row);
    });
};

// Canvas con un solo círculo
initializeCanvas("canvas1", 1);

// Canvas con múltiples círculos
initializeCanvas("canvas2", 10);
