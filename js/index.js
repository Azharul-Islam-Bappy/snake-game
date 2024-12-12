// Select the ground div to render the game
const ground = document.querySelector(".ground");

// Set the size of each grid cell
const gridSize = 18;

// Initial snake and food positions
let snake = [
    {x: 8, y: 9} // Starting position of the snake's head
];
let food = {x: 5, y: 0};
let direction = {x: 0, y: 0}; // Snake's initial movement direction

// Initialize game state
let gameOver = false;
let score = 0;

// Function to render the grid and update positions
function render() {
    ground.innerHTML = ''; // Clear previous grid
    
    // Render the snake
    snake.forEach(segment => {
        const segmentDiv = document.createElement("div");
        segmentDiv.style.gridColumnStart = segment.x + 1;
        segmentDiv.style.gridRowStart = segment.y + 1;
        segmentDiv.classList.add("snake");
        ground.appendChild(segmentDiv);
    });

    // Render the food
    const foodDiv = document.createElement("div");
    foodDiv.style.gridColumnStart = food.x + 1;
    foodDiv.style.gridRowStart = food.y + 1;
    foodDiv.classList.add("food");
    ground.appendChild(foodDiv);
}

// Function to move the snake
function move() {
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};

    // Check for wall collisions
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize || isSnakeCollision(head)) {
        gameOver = true;
        alert("Game Over! Score: " + score);
        return;
    }

    snake.unshift(head); // Add new head to the front

    // Check if snake ate food
    if (head.x === food.x && head.y === food.y) {
        score += 10; // Increase score
        generateFood(); // Generate new food position
    } else {
        snake.pop(); // Remove the last segment of the snake (tail)
    }

    render(); // Re-render the game
}

// Check if the snake collides with itself
function isSnakeCollision(head) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

// Generate random food position
function generateFood() {
    food.x = Math.floor(Math.random() * gridSize);
    food.y = Math.floor(Math.random() * gridSize);

    // Ensure food doesn't spawn on the snake
    while (isSnakeCollision(food)) {
        food.x = Math.floor(Math.random() * gridSize);
        food.y = Math.floor(Math.random() * gridSize);
    }
}

// Listen for arrow key input to change direction
document.addEventListener("keydown", (e) => {
    if (gameOver) return; // Don't allow input after game over

    if (e.key === "ArrowUp" && direction.y !== 1) {
        direction = {x: 0, y: -1};
    } else if (e.key === "ArrowDown" && direction.y !== -1) {
        direction = {x: 0, y: 1};
    } else if (e.key === "ArrowLeft" && direction.x !== 1) {
        direction = {x: -1, y: 0};
    } else if (e.key === "ArrowRight" && direction.x !== -1) {
        direction = {x: 1, y: 0};
    }
});

// Function to start the game loop
function gameLoop() {
    if (gameOver) return;
    move(); // Move the snake
    setTimeout(gameLoop, 100); // Keep moving the snake every 100ms
}

// Start the game
generateFood(); // Generate initial food
gameLoop(); // Start the game loop


