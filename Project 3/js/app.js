/**
 * Enemy Class 
 */
class Enemy {
    // Parameter: x : x-axis , y: y-axis ,and speed 
    constructor(x, y, speed) {
            this.x = x;
            this.y = y;
            this.speed = speed;
            this.sprite = 'images/enemy-bug.png';
        }
        // Update the enemy's position
        // Parameter: dt, a time delta between ticks
    update(dt) {
            this.x += this.speed * dt;

            // check if enemy get out the screen.
            if (this.x > 500) {
                this.x = -50;
                this.speed = 100 + Math.floor(Math.random() * 300);
            }

            //check if the player touch the enemy
            if (player.x < this.x + 80 &&
                player.x + 80 > this.x &&
                player.y < this.y + 60 &&
                60 + player.y > this.y) {
                // the player restart 
                resetPlayer();
            }

        }
        // Draw the enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

/**
 * Player Class 
 */
class Player {
    // Parameter: x : x-axis , y: y-axis 
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.player = 'images/char-cat-girl.png';
    }
    update() {

        }
        // Draw the player on the screen
    render() {
            ctx.drawImage(Resources.get(this.player), this.x, this.y);
        }
        // the method to hadle all keyPress 
        // Parameter: keyPress 
    handleInput(keyPress) {
        if (keyPress == 'left' && this.x > 0) {
            this.x -= 102;
        }
        if (keyPress == 'right' && this.x < 405) {
            this.x += 102;
        }
        if (keyPress == 'up' && this.y > 0) {
            this.y -= 80;
        }
        if (keyPress == 'down' && this.y < 400) {
            this.y += 80;
        }

        // if the player won 
        if (this.y < 0) {
            resetPlayer();
            youWon();
        }

    }
}

//function run when the player won
function youWon() {
    alert("You are Won")

}



// function for reposition the player
function resetPlayer() {
    player.x = 202;
    player.y = 380;
}
// Initialise the Player 
let player = new Player(202, 380);
// Initialise the Enemies 
const allEnemies = [];
var enemies = [60, 140, 220];
let enemy, speed;
enemies.forEach(function(y) {
        /**
         * the enemies startin out side the map
         * with x-axis = -100;
         * y-axis = [60, 140, 220] 
         * speed random 
         */
        speed = 100 + Math.floor(Math.random() * 300);
        enemy = new Enemy(-100, y, speed);
        allEnemies.push(enemy);
    })
    // This listens for key presses and sends the keys to your
    // Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
s