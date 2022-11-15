
const TILE_SIZE = 32;    // Default Tile Size in pixels
const MAP_NUM_ROWS = 11; // Number of Rows
const MAP_NUM_COLS = 15; // Number of Columns 


const WINDOW_WIDTH = MAP_NUM_COLS * TILE_SIZE;   
const WINDOW_HEIGHT = MAP_NUM_ROWS * TILE_SIZE;

const FOV_ANGLE = 60 * (Math.PI / 180);  // 60 degress converted to Radians. 
const WALL_STRIP_WIDTH = 10;
const NUM_RAYS = WINDOW_WIDTH / WALL_STRIP_WIDTH;



class Map {     // The Map. 1 is Walls. 0 is empty space for player movement
    constructor()
    {
        this.grid = [

            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]


        ];
    }


    hasWallAt(x, y)  // A simple check to see there is a wall at a certain location
    {   
        if ( x < 0 || x > WINDOW_WIDTH || y < 0 || y > WINDOW_HEIGHT)
        {
            return true; 
        }


        var mapGridIndexX =   Math.floor(x / TILE_SIZE);
        var mapGridIndexY =   Math.floor(y / TILE_SIZE);

        return this.grid[mapGridIndexY][mapGridIndexX] != 0;



    }

    render() {
        for (var i = 0; i < MAP_NUM_ROWS; i++) // If i is equal to 0 
        {

            for (var j = 0; j < MAP_NUM_COLS; j++) // 
            {
                var tileX = j * TILE_SIZE;  // Tile Size X
                var tileY = i * TILE_SIZE; // TILE SIZE Y
                var tileColor = this.grid[i][j] == 1 ? "#222" : "#fff";
                stroke("#222");
                fill(tileColor);
                rect(tileX, tileY, TILE_SIZE, TILE_SIZE);
            }
        }
    }
}


class Player {    // Player class

    constructor()
    {
        this.x = WINDOW_WIDTH / 2;   // X location of player
        this.y = WINDOW_HEIGHT / 2;  // Y location of player
        this.radius = 3;            // Size of the player
        this.turnDirection = 0;  // - 1 if left, +1 if right
        this.walkDirection = 0;  // -1 if back, +1 if front
        this.rotationAngle = Math.PI / 2;   
        this.moveSpeed = 2.0;       // Speed of the player
        this.rotationSpeed = 2 * (Math.PI / 180);


    }

    update()    // Player Input Update
    {
        console.log("hello world");
        this.rotationAngle += this.turnDirection * this.rotationSpeed; // Update player rotation
        var moveStep = this.walkDirection * this.moveSpeed; 

        var newPlayerX = this.x +  Math.cos(this.rotationAngle) * moveStep;
        var newPlayerY = this.y +  Math.sin(this.rotationAngle) * moveStep;
        // Only set new player position if it is not colliding with the map walls!
        if (!grid.hasWallAt(newPlayerX, newPlayerY)) {

            this.x = newPlayerX;
            this.y = newPlayerY;
        }

    }







    
    render() {   // Draw the direction the player is facing.
        noStroke();
        fill("red");
        circle(this.x, this.y, this.radius);
        stroke("red");
        line(
            this.x,
            this.y,
            this.x + Math.cos(this.rotationAngle) * 20, 
            this.y + Math.sin(this.rotationAngle) * 30,
             
             );
    }
}

class Ray {
    constructor(rayAngle) {
        this.rayAngle = normalizeAngle(rayAngle);
        this.wallHitX = 0;
        this.wallHitY = 0;
        this.distance = 0;

        this.isRayFacingDown = this.rayAngle > 0 && this.rayAngle < Math.PI;
        this.isRayFacingUp = !this.isRayFacingDown;

        this.isRayFacingRight = this.rayAngle < 0.5  * Math.PI || this.rayAngle > 1.5 * Math.PI;
        this.isRayFacingLeft = !this.isRayFacingRight;


        // TO DO LATER


    }

    cast(columnId) {

        var xintercept, yintercept;
        var xstep, ystep;
        /////////////////////////////////////////
        ///////////  HORIZONTAL RAYGRID INTERSECT 
        /////////////////////////////////////////
        // TO DO

       // Find the y-coordinate of the cloest horizontal grid intersections
        yintercept = Math.floor(player.y / TILE_SIZE) * TILE_SIZE;
        yintercept += this.isRayFacingDown ? TILE_SIZE : 0;
        // Find the x-cords of the closest horizontal grid intersects
        xintercept = player.x + (yintercept - player.y) / Math.tan(this.rayAngle);

        // Calculate the increment xstep and ystep
        ystep = TILE_SIZE;
        ystep *= this.isRayFacingUp ? -1 : 1;

        xstep = TILE_SIZE / Math.tan(this.rayAngle);
        xstep *= (this.isRayFacingLeft && xstep > 0) ? -1 : 1;
        xstep *= (this.isRayFacingRight && xstep <0) ? -1 : 1;


    }

    render()  // Render the rays
    {
        stroke("rgba(255, 0, 0, 0.3)"); // Ray Colour
        line(player.x,
             player.y,
             player.x + Math.cos(this.rayAngle) * 30,
             player.y + Math.sin(this.rayAngle) * 30
        );

        // TO DO
    }

}




var grid = new Map();
var player = new Player();
var rays = []; // Array

function keyPressed() {   // p5 key input detection
    if (keyCode == UP_ARROW){
        player.walkDirection = +1;
    } else if (keyCode == DOWN_ARROW){
        player.walkDirection = -1;
    } else if (keyCode == RIGHT_ARROW) {
        player.turnDirection = +1;
    } else if (keyCode == LEFT_ARROW){
        player.turnDirection = -1;
    }

}

function keyReleased() {   // p5 key released detection
    if (keyCode == UP_ARROW){
        player.walkDirection = 0;
    } else if (keyCode == DOWN_ARROW){
        player.walkDirection = 0;
    } else if (keyCode == RIGHT_ARROW) {
        player.turnDirection = 0;
    } else if (keyCode == LEFT_ARROW){
        player.turnDirection = 0;
    }



}
function castAllRays()
{
    var columnId = 0;

    // Start first ray subtracting half of my FOV.
    var rayAngle = player.rotationAngle - (FOV_ANGLE / 2);

    rays = [];

    // loop all columns casting the rays 

   // for (var i = 0; i <  NUM_RAYS; i++)
    for ( var i = 0; i < 1; i++)
    {
        var ray = new Ray(rayAngle);
        ray.cast(columnId);
        rays.push(ray);

        rayAngle += FOV_ANGLE / NUM_RAYS;

        columnId++;
    }


}

function normalizeAngle(angle) {
    angle = angle % (2 * Math.PI);  // Do not go beyond 2pi. 
    if (angle < 0 )
    {
        angle = (2 * Math.PI) + angle;
    }
    return angle;
}



function setup() {   // Create the window
    createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
}

function update()   // The game Loop
{
    player.update();
    castAllRays();
}


function draw() {  //  Render to screen

    update();
    grid.render();
    for (ray of rays) 
    {
        ray.render();
    }
    player.render();

}


