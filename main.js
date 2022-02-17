var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var dino = {
    x : 10,   //start coordiate 
    y : 200, 
    width : 50,
    height : 50,
    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);  //10,10 cooridate, size 100 x 100
    }
}
//dino.draw();


class Obstacles{
    constructor(){
        this.x = 400;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);  //10,10 cooridate, size 100 x 100
    }
}


//cactus1.draw();

var timer = 0;
var obstaclesArray = []; 


function runOnFrame(){
    requestAnimationFrame(runOnFrame)   //draw on page , HTML lib, 60 fps 
    timer++;
    ctx.clearRect(0,0 , canvas.width, canvas.height);


    if(timer % 120 === 0) {
        var cactus = new Obstacles();
        obstaclesArray.push(cactus);
    }

    obstaclesArray.forEach((a)=>{
        a.x--;
        a.draw();
    })
    dino.draw();
    
}

runOnFrame();

