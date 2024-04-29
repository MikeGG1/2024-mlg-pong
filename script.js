    // Get the canvas and its 2D rendering context
        const canvas = document.getElementById('pongCanvas');
        const ctx = canvas.getContext('2d');

        // Set initial ball position and speed
        let ballX = canvas.width / 2; // Horizontal position of the ball
        let ballY = canvas.height / 2; // Vertical position of the ball
        let ballSpeedX = 1; // Horizontal speed of the ball
        let ballSpeedY = 1; // Vertical speed of the ball
        const ballSize = 10; // Diameter of the ball

        // Set initial scores for players
        let player1Score = 0; // Score of player 1
        let player2Score = 0; // Score of player 2

        // Set paddle properties
        const paddleWidth = 10;
        const paddleHeight = 110;
        const paddleSpeed = 20; // Increase paddle speed to make it easier to move

        // Set initial positions for paddles
        let player1Y = canvas.height / 2 - paddleHeight / 2;
        let player2Y = canvas.height / 2 - paddleHeight / 2;

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
            ballX += ballSpeedX; // Update horizontal position
            ballY += ballSpeedY; // Update vertical position

            // Reverse ball direction if it hits top or bottom edge
            if (ballY + ballSize > canvas.height || ballY - ballSize < 0) {
                ballSpeedY = -ballSpeedY; // Reverse vertical speed
            }

            // Check if the ball collides with the paddles
            if (
                (ballX - ballSize < paddleWidth && ballY > player1Y && ballY < player1Y + paddleHeight) ||
                (ballX + ballSize > canvas.width - paddleWidth && ballY > player2Y && ballY < player2Y + paddleHeight)
            ) {
                ballSpeedX = -ballSpeedX; // Reverse horizontal speed
            }

            // Check if the ball goes past the left or right edge
            if (ballX + ballSize > canvas.width) {
                // Player 1 scores
                player1Score++;
                resetBall();
            } else if (ballX - ballSize < 0) {
                // Player 2 scores
                player2Score++;
                resetBall();
            }
        }

        // Function to draw paddles
        function drawPaddles() {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, player1Y, paddleWidth, paddleHeight);
            ctx.fillRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight);
        }

        // Function to move paddles
        function movePaddles(evt) {
            if (evt.key === 'ArrowDown' && player2Y < canvas.height - paddleHeight) {
                player2Y += paddleSpeed;
            } else if (evt.key === 'ArrowUp' && player2Y > 0) {
                player2Y -= paddleSpeed;
            } else if (evt.key === 's' && player1Y < canvas.height - paddleHeight) {
                player1Y += paddleSpeed;
            } else if (evt.key === 'w' && player1Y > 0) {
                player1Y -= paddleSpeed;
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

            // Draw scores
            drawScores();

            // Request next animation frame
            requestAnimationFrame(draw);
        }

        // Add event listener for keydown event
        document.addEventListener('keydown', movePaddles);

        // Start animation loop
        draw();