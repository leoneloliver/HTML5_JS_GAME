var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;
var paddle1Y = 250;
var paddle2Y = 250;
const paddleHeight = 100;
const paddleThickness = 10;
const winning_score = 5;
var player1Score = 0;
var player2Score = 0;
var showingWinScreen = false;

function resizeCanvas() {
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;

}
    


function calculateMousePos(evt){
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return{
    x:mouseX,
    y:mouseY
  };
  
}

function handleMouseClick(evt){
  if(showingWinScreen){
    player1Score = 0;
    player2Score = 0;
    showingWinScreen = false;
  }
}

window.onload = function(){
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  framesPerSecond = 30;
  setInterval(function(){
    moveEverything();
    drawEverthing();
  },1000/framesPerSecond);

  canvas.addEventListener('mousedown', handleMouseClick);
  
  canvas.addEventListener('mousemove', function(evt){
    var mousePos = calculateMousePos(evt);
    paddle1Y = mousePos.y - (paddleHeight/2);
  });
  // canvas.addEventListener('mousemove', function(evt){
  //   var mousePos = calculateMousePos(evt);
  //   paddle2Y = mousePos.y - (paddleHeight/2);
  // });
  //resizeCanvas();
  
}
function ballReset(){
  if(player1Score >= winning_score || player2Score >= winning_score){
    
    showingWinScreen = true;

  }
  ballX = canvas.width/2;
  ballY = canvas.height/2;
  ballSpeedX = - ballSpeedX;
}
function computerMovement(){
	var paddle2YCenter = paddle2Y + (paddleHeight/2);
	if(paddle2YCenter < ballY-35){
		paddle2Y += 6;
	}else if(paddle2YCenter > ballY+35){
		paddle2Y -= 6;
	}

}
function moveEverything(){
  if(showingWinScreen){
    return;
  }
  computerMovement();
  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;
  if(ballX < 0){
    if(ballY > paddle1Y && ballY < paddle1Y+paddleHeight){
      ballSpeedX = -ballSpeedX;
      var deltaY = ballY - (paddle1Y+ paddleHeight/2);
      ballSpeedY = deltaY * 0.3;
    }else{
      
     // player2Score++;
     // ballReset();
     
    }
   }
  if(ballX > canvas.width){
     if(ballY > paddle2Y && ballY < paddle2Y+paddleHeight){
      ballSpeedX = -ballSpeedX;
      var deltaY = ballY - (paddle2Y+ paddleHeight/2);
      ballSpeedY = deltaY * 0.3;

    }else{
     player1Score++;
     ballReset();
     
    }
   }
  if(ballY < 0){
     ballSpeedY = - ballSpeedY;
   }
  if(ballY > canvas.height){
     ballSpeedY = - ballSpeedY;
   }
  
}

function drawNet(){
  for (var i = 0; i < canvas.height; i+=40) {
    colorRect(canvas.width/2-1,i,2,20,'white');
  }
}

function drawEverthing(){

  colorRect(0,0,canvas.width,canvas.height,'black');
  if(showingWinScreen){
    canvasContext.fillStyle = 'white';
    if(player1Score >= winning_score){
      canvasContext.fillText("YOU WIN!",370,200);
    }else if(player2Score >= winning_score){
      canvasContext.fillText("YOU LOSE!",370,200);
    }
    canvasContext.fillText("Click to continue",350,500);
    return;
  }

  drawNet();

  colorRect(0,paddle1Y,paddleThickness,paddleHeight,'white');
  colorRect(canvas.width-paddleThickness,paddle2Y,paddleThickness,paddleHeight,'white');
  colorCircle(ballX,ballY,10,'white');  

  canvasContext.fillText(player1Score,100,30);
  canvasContext.fillText(player2Score,canvas.width-100,30);
  canvasContext.fillText("Developed by Leonel",350,590);
}
function colorCircle(centerX, centerY, radius, drawColor){
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
  canvasContext.fill();
}
function colorRect(leftX,topY,width,height,drawColor){
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX,topY,width,height);
}
