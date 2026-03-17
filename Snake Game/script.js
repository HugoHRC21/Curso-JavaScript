const canvas = document.getElementById("gameCanva");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("startBtn");

let box = 20; 
let snake;
let direction;
let food;
let score;
let game; 


function init() {
  snake = [{ x: 9 * box, y: 9 * box }];
  direction = null;
  food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box,
  };
  score = 0;
  scoreDisplay.textContent = "Score: " + score;

  if (game) clearInterval(game); 
  game = setInterval(draw, 150);
}


document.addEventListener("keydown", directionHandler);

function directionHandler(event) {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, box, box);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? 'green' : 'lightgreen';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  // Comer comida
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    scoreDisplay.textContent = "Score: " + score;
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box,
    };
  } else {
    snake.pop();
  }

  // Nueva cabeza
  let newHead = { x: snakeX, y: snakeY };

  // Game over (paredes o sí mismo)
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvas.width ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    alert("💀 Game Over! Score: " + score);
    return;
  }

  snake.unshift(newHead);
}

// Detectar colisiones con el cuerpo
function collision(head, array) {
  return array.some(segment => head.x === segment.x && head.y === segment.y);
}

// Botón Start / Restart
startBtn.addEventListener("click", init);
