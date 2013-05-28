var groundPosition = 350;
var prefix = 5;
var objectSize = 50;

function createMovingObject(spec) {
    var MovingObject = {};
    var position = 70;
    var acceleration = 2;
    var velocity = 0;
    var restitution = spec.restitution;
    var friction = 0.99;

    MovingObject.move = function(){
        velocity += acceleration;
        velocity *= friction;
        position += velocity;

        if (position > groundPosition) { 
            position = groundPosition;
            velocity = -velocity * restitution;
        }
        //console.log("position: " + position + ", velocity: " + velocity);
        MovingObject.q.css("top", position + prefix + "px");

    };

    MovingObject.q = $(document.createElement('div'));
    MovingObject.q
        .css("background-color", "#ff8800")
        .css("position", "absolute")
        .css("top", prefix + "px")
        .css("left", spec.left + "px")
        .css("width", objectSize + "px")
        .css("height", objectSize + "px")
        .css("-webkit-border-radius", spec.border_radius  + "px")
        .css("border-radius", spec.border_radius  + "px");
    ;
    return MovingObject;
}

function createGround() {
    var element = $(document.createElement('div'));
    element
        .css("background-color", "#88e02e")
        .css("position", "absolute")
        .css("width", "250px")
        .css("height", "10px")
        .css("top", groundPosition + prefix + objectSize + "px");
    return element;
}

var ball = createMovingObject({"border_radius":50, "restitution":0.9, "left": 20});
var box  = createMovingObject({"border_radius":0,  "restitution":0.8, "left": 100});
var ground = createGround();

$("body").append(ball.q);
$("body").append(box.q);
$("body").append(ground);

setInterval(function(){
    ball.move();
    box.move();
}, 50);
