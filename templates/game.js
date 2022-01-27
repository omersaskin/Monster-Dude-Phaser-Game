var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [ SceneB, SceneA, SceneC, SceneD, SceneE, SceneF, SceneG ]
};

//game step
var score_1;
var score_2;
var score_3;
var score_4;

var lock_1;
var lock_2;
var lock_3;
var lock_4;

//controller
var climbCollider;
var second_control_left;
var second_control_right;
var second_control_jump;

//screen object
var player;
var background;
var chest;
var coin;
var key;
var bombs;
var platforms;
var cursors;
var scoreText;
var movingPlatform;
var stars;
var ladder_2;
var screen_retry;
var ground_3;
var enemy_1;

//screen buton
var gameOver = false;
var restart = false;
var resume;
var play;
var pause;

//localstroge
var saveData;
var saveSecondData;
var saveThirdData;
var saveFourData;

//game end point
var pointer_1;
var pointer_7;

var game = new Phaser.Game(config);