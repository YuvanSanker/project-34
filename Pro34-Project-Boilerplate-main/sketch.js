
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;


let engine;
let world;
let runner;
let obstacles = [];
let score = 0;

function setup() {

  createCanvas(800, 400);


  engine = Engine.create();
  world = engine.world;

  ground = Bodies.rectangle(0, height + 5  , width * 4, 1, { isStatic: true });
  World.add(world, ground);

  
  runner = Bodies.rectangle(100, height - 50, 50, 50);
  World.add(world, runner);

  
  setInterval(createObstacle, 2000);

}

function draw() {
  
  background(0);        
  
  Engine.update(engine);

  
  fill(255);
  rectMode(CENTER);
  rect(runner.position.x, runner.position.y, 50, 50);

  
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].display();
    obstacles[i].update();

   
    if (obstacles[i].hits(runner)) {
      gameOver();
      break;
    }

 
    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
      score++;
    }
  }

  
  fill(255);
  textSize(24);
  text(`Score: ${score}`, 10, 30);
}

function createObstacle() {
  const obstacle = new Obstacle(width, height - 25, 20, random(100, 200));
  obstacles.push(obstacle);
}

function keyPressed() {
  if (keyCode === UP_ARROW && runner.position.y > height - 75) {
    Body.applyForce(runner, runner.position, { x: 0, y: -0.1 });
  }
}

function gameOver() {
  noLoop();
  console.log(`Game Over! Final Score: ${score}`);
}


class Obstacle {
  constructor(x, y, w, h) {
    this.body = Bodies.rectangle(x, y, w, h);
    this.width = w;
    this.height = h;
    World.add(world, this.body);
  }

  display() {
    const pos = this.body.position;
    const angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    fill(255, 0, 0);
    rectMode(CENTER);
    rect(0, 0, this.width, this.height);
    pop();
  }

  update() {
    Body.translate(this.body, { x: -5, y: 0 });
  }

  hits(runner) {
    return Matter.SAT.collides(runner, this.body).collided;
  }

  offscreen() {
    return this.body.position.x < -this.width / 2;
  }
}


new p5();
