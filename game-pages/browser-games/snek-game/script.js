let blockSize = 30;
let totalRow = 17;
let totalColumn = 17;
let gameBoard;
let context;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let speedX = 0;
let speedY = 0;

let snakeBody = [];

let appleX;
let appleY;

let gameOver = false;

let score = 0;
let gameStarted = false;

window.onload = function ()
{
    gameBoard = document.getElementById("gameBoard");
    gameBoard.height = totalRow * blockSize;
    gameBoard.width = totalColumn * blockSize;
    context = gameBoard.getContext("2d");

    placeApples();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1500/10);
}

function update()
{
    if(gameOver)
    {
        return;
    }

    context.fillStyle = "#8bac0f";
    context.fillRect(0, 0, gameBoard.width, gameBoard.height);

    context.fillStyle = "black";
    context.fillRect(appleX, appleY, blockSize, blockSize);

    if (snakeX == appleX && snakeY == appleY)
    {
        snakeBody.push([appleX, appleY]);
        placeApples();

        score += 10;
        document.getElementById("score").innerText = score;
    }

    for (let i = snakeBody.length - 1; i > 0; i--)
    {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length)
    {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "black";
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    
    for(let i = 0; i < snakeBody.length; i++)
    {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    
    }
     if(snakeX < 0 || snakeX >= totalColumn * blockSize || snakeY < 0 || snakeY >= totalRow * blockSize)
    {
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++)
    {
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1])
        {
            gameOver = true;
            alert("Game Over");
        }
    }
}

function changeDirection(e)
{
    if (["KeyW", "KeyS", "KeyA", "KeyD"].includes(e.code) && !gameStarted)
    {
        gameStarted = true;
        document.getElementById("instructional-text").style.display = "none";
        document.getElementById("game-logo").style.display = "none";
    }
    
    if(e.code == "KeyW" && speedY != 1)
    {
        speedX = 0;
        speedY = -1;
    }
    else if (e.code == "KeyS" && speedY != -1)
    {
        speedX = 0;
        speedY = 1;
    }
    else if (e.code == "KeyA" && speedX != 1)
    {
        speedX = -1;
        speedY = 0;
    }
    else if (e.code == "KeyD" && speedX != -1)
    {
        speedX = 1;
        speedY = 0;
    }
}

function placeApples()
{
    appleX = Math.floor(Math.random() * totalColumn) * blockSize;
    appleY = Math.floor(Math.random() * totalRow) * blockSize;
}