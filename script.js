// Get the canvas and its 2D rendering context
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Set initial ball position and speed
let ballX = canvas.width / 2; // Horizontal position of the ball
let ballY = canvas.height / 2; // Vertical position of the ball
let ballSpeed = 3; // Speed of the ball
let ballAngle = Math.PI / 4; // Initial angle of the ball (45 degrees)
const ballSize = 10; // Diameter of the ball

// Set initial scores for players
let player1Score = 0; // Score of player 1
let player2Score = 0; // Score of player 2

// Set paddle properties
const paddleWidth = 10;
const paddleHeight = 110;

// Set initial positions for paddles
let player1Y = canvas.height / 2 - paddleHeight / 2;
let player2Y = canvas.height / 2 - paddleHeight / 2;

// Variable to control game start
let gameStarted = false;

// Function to draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

// Function to move ball
function moveBall() {
    if (!gameStarted) return; // Don't move the ball if the game hasn't started
    ballX += ballSpeed * Math.cos(ballAngle); // Update horizontal position
    ballY += ballSpeed * Math.sin(ballAngle); // Update vertical position

    // Reverse ball direction if it hits top or bottom edge
    if (ballY + ballSize > canvas.height || ballY - ballSize < 0) {
        ballAngle = -ballAngle; // Reverse vertical angle
    }

    // Check if the ball collides with the paddles
    if (
        (ballX - ballSize < paddleWidth && ballY > player1Y && ballY < player1Y + paddleHeight) ||
        (ballX + ballSize > canvas.width - paddleWidth && ballY > player2Y && ballY < player2Y + paddleHeight)
    ) {
        // Reverse horizontal angle
        ballAngle = Math.PI - ballAngle;
    }

    // Check if the ball goes past the left or right edge
    if (ballX + ballSize > canvas.width) {
        // Player 1 scores
        player1Score++;
        if (player1Score === 10) {
            endGame("Player 1"); // End game if player 1 reaches 10 points
        } else {
            resetBall();
        }
    } else if (ballX - ballSize < 0) {
        // Player 2 scores
        player2Score++;
        if (player2Score === 10) {
            endGame("Player 2"); // End game if player 2 reaches 10 points
        } else {
            resetBall();
        }
    }
}

// Function to draw paddles
function drawPaddles() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, player1Y, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight);
}

// Function to move the AI-controlled paddle
function moveAI() {
    // AI follows the ball
    if (player1Y + paddleHeight / 2 < ballY) {
        player1Y += 1.8; // Adjust the AI paddle speed
    } else {
        player1Y -= 1.8; // Adjust the AI paddle speed
    }
}

// Function to draw scores
function drawScores() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Player 1: ' + player1Score, 20, 30);
    ctx.fillText('Player 2: ' + player2Score, canvas.width - 140, 30);
}

// Function to reset the ball position
function resetBall() {
    ballX = canvas.width / 2; // Reset horizontal position
    ballY = canvas.height / 2; // Reset vertical position
    ballAngle = Math.PI / 4; // Reset angle of the ball
}

// Function to end the game
function endGame(winner) {
    alert(winner + " wins the game!");
    // You can add additional logic here, such as resetting the scores or restarting the game.
}

// Function to draw game elements
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ball
    drawBall();

    // Move ball
    moveBall();

    // Draw paddles
    drawPaddles();

    // Move AI paddle
    moveAI();

    // Draw scores
    drawScores();

    // Request next animation frame if game is not over and started
    if (gameStarted && (player1Score < 10 && player2Score < 10)) {
        requestAnimationFrame(draw);
    } else if (!gameStarted) {
        setTimeout(() => {
            gameStarted = true;
            draw();
        }, 5000); // 5000 milliseconds (5 seconds) delay before starting the game
    } else {
        endGame(player1Score === 10 ? "Player 1" : "Player 2"); // End game if any player reaches 10 points
    }
}

// Event listener to track mouse movements for player 2 paddle
canvas.addEventListener('mousemove', function(event) {
    let mouseY = event.clientY - canvas.getBoundingClientRect().top;
    if (mouseY > 0 && mouseY < canvas.height - paddleHeight) {
        player2Y = mouseY;
    }
});

// Start animation loop
draw();
