const gamebord = document.getElementById('game-border');
const snakeBody = [{ x: 11, y: 11 }];
let food = { x: 5, y: 5 };
let direction = { x: 1, y: 0 };
let gameOver = false;
let score = 0; 
let gameInterval;

document.getElementById('start-button').addEventListener('click', () => {
    const difficulty = document.getElementById('difficulty').value;
    document.getElementById('start-menu').style.display = 'none';
    
    gameInterval = setInterval(() => {
        if (!gameOver) {
            gameLoop();
        }
    }, difficulty);
});

function draw() {
    gamebord.innerHTML = '';
    
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.classList.add('snake');
        gamebord.appendChild(snakeElement);
    });
    
    const foodElement = document.createElement('div');
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    foodElement.classList.add('food');
    gamebord.appendChild(foodElement);
}

function update() {
    const head = { x: snakeBody[0].x + direction.x, y: snakeBody[0].y + direction.y };
    
    if (head.x === food.x && head.y === food.y) {
        snakeBody.unshift(head);
        placeFood();
        
        
        score++;
        document.getElementById('score').textContent = score;
    } else {
        snakeBody.unshift(head);
        snakeBody.pop();
    }
    
    checkDeath(head);
}

function placeFood() {
    food.x = Math.floor(Math.random() * 20) + 1;
    food.y = Math.floor(Math.random() * 20) + 1;
}

function gameLoop() {
    update();
    draw();
}

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case "ArrowUp":
            if (direction.y !== 0) break;
            direction = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (direction.y !== 0) break;
            direction = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (direction.x !== 0) break;
            direction = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (direction.x !== 0) break;
            direction = { x: 1, y: 0 };
            break;
    }
    draw();
});

function checkDeath(head) {
    if (head.x < 1 || head.x > 21 || head.y < 1 || head.y > 21 || 
        snakeBody.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver = true;
        clearInterval(gameInterval);
        
        let popup = document.getElementById('popup');
        popup.innerHTML = `
            <div class="alert-popup">
                <div class="popup-gameOver">
                    <h1>GAME OVER</h1>
                    <img id="snakeimg" src="images/SnakeItUpLogoTiles-Background.png" alt="Game Over Image">
                    <button id="play">Play Again</button>
                </div>
            </div>
        `;
        
        document.getElementById('play').addEventListener('click', function() {
            location.reload();
        });
    }
}
