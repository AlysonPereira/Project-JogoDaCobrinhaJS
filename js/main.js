
const canvas = document.getElementById("snake") //Exporta a tag html pelo Id
const context = canvas.getContext('2d')
const box = 32
let snake = []
snake[0] = {
  x: 8 * box ,
  y: 8 * box
}
let direction = "right"
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box, //math.floor pegará um número aleatório do math.random
  y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG () {  //função responsável por criar o background do jogo
  context.fillStyle = "lightgreen"
  context.fillRect(0,0,16 * box, 16 * box) //tamanho do background
}

function criarCobrinha () { //Função responsável por criar a cobra do jogo
  for(i = 0; i < snake.length ; i++ ){
    context.fillStyle = "green"
    context.fillRect(snake[i].x, snake[i].y, box, box)
  }
}

function drawFood() { //Função resposável por criar as comidas
  context.fillStyle = "red"
  context.fillRect(food.x, food.y, box, box)
}

document.addEventListener('keydown',update)

function update(event) {
  if (event.keyCode == 37 && direction != "right") direction = "left";
  if (event.keyCode == 38 && direction != "down") direction = "up";
  if (event.keyCode == 39 && direction != "left") direction = "right";
  if (event.keyCode == 40 && direction != "up") direction = "down";
}


function iniciarJogo() {  //Função responsável por inicar o jogo 
  
  if(snake[0].x > 16 * box && direction == "right") snake[0].x = 0
  if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box
  if(snake[0].y > 16 * box && direction == "down") snake[0].y = 0
  if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box
  
  for(i = 1; i < snake.length; i++) {
    if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(jogo)
      alert('Game Over :(')
    }
  }

  criarBG()
  criarCobrinha()
  drawFood()

  let snakeX = snake[0].x
  let snakeY = snake[0].y

  if(direction == "right") snakeX += box;
  if(direction == "left") snakeX -= box;
  if(direction == "up") snakeY -= box;
  if(direction == "down") snakeY += box; 

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop()
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box
    food.y = Math.floor(Math.random() * 15 + 1) * box
  }

  let newHead = {
    x : snakeX ,
    y : snakeY
  }

  snake.unshift(newHead)
}

const jogo = setInterval(iniciarJogo, 100)