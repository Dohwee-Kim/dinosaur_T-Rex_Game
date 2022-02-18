var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var dinoImage = new Image();
dinoImage.src = 'dinosaur.png';
var dino = {
    x : 10,   //start coordiate 
    y : 200, 
    width : 30,
    height : 30,
    draw() {
        //ctx.fillStyle = 'green';
        //ctx.fillRect(this.x, this.y, this.width, this.height);  //10,10 cooridate, size 100 x 100
        ctx.drawImage(dinoImage, this.x, this.y, 50, 50);
    }
}
//dino.draw();


var cactusImage = new Image();
cactusImage.src = 'cactus.png';
class Obstacles{
    constructor(){
        this.x = 400;
        this.y = 200;
        this.width = 20;
        this.height = 50;
    }
    draw() {

        //hit box
        //ctx.fillStyle = 'red';
        //ctx.fillRect(this.x, this.y, this.width, this.height);  //10,10 cooridate, size 100 x 100
        ctx.drawImage(cactusImage, this.x, this.y, 40, 50);
    }
}

//cactus1.draw();

var timer = 0;
var obstaclesArray = []; 
var jumpTimer = 0;
var animation;

function runOnFrame(){
    animation = requestAnimationFrame(runOnFrame)   //draw on page , HTML lib, 60 fps 
    timer++;
    ctx.clearRect(0,0 , canvas.width, canvas.height);


    if(timer % 180 === 0) {
        var cactus = new Obstacles();
        obstaclesArray.push(cactus);
    }

    obstaclesArray.forEach((a,i,o)=>{
        a.x--;
        if (a.x < 0) {
            o.splice(i,1)
        }
        //collision check 
        collisionCheck(dino, a)
        a.draw();
    })
    if (jumpSwitch == true) {
        dino.y-=2;
        jumpTimer++;
    } else {
        if (dino.y < 200) {
            dino.y+=2;
        }
    }

    if (jumpTimer > 60) {
        jumpSwitch = false;
        jumpTimer = 0;
    }
    
    
    dino.draw();
    
}

runOnFrame();

function collisionCheck(dino, obs) {

    var x_diff = obs.x - (dino.x + dino.width )
    var y_diff = obs.y - (dino.y + dino.height )
    if (  x_diff < 0 && y_diff<0  ) {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation)
    }
}

var jumpSwitch = false; 
document.addEventListener('keydown', function(e) {
    if (e.code == 'Space') {
        jumpSwitch = true;
    }
})

