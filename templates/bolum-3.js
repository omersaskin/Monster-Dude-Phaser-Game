var SceneF = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function() {
        Phaser.Scene.call(this, { "key": "SceneF" });
    },

    init: function() {},

preload: function  ()
{
    //tiles
    this.load.image('Tile_01', 'img/Tile_01.png');
    this.load.image('Tile_02', 'img/Tile_02.png');
    this.load.image('Tile_03', 'img/Tile_03.png');
    this.load.image('Tile_05', 'img/Tile_05.png');
    this.load.image('Tile_07', 'img/Tile_07.png');
    this.load.image('Tile_08', 'img/Tile_08.png');
    this.load.image('Tile_09', 'img/Tile_09.png');
    this.load.image('Tile_11', 'img/Tile_11.png');
    this.load.image('Tile_12', 'img/Tile_12.png');
    this.load.image('Tile_21', 'img/Tile_21.png');
    this.load.image('Tile_23', 'img/Tile_23.png');

    //monster anitmation
    this.load.spritesheet('monster_right_run', 'img/monster_right_run.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('monster_left_run', 'img/monster_left_run.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('monster_jump', 'img/monster_jump.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('monster_idle', 'img/monster_idle.png', { frameWidth: 32, frameHeight: 32 });

    //controller
    this.load.image('control_right', 'img/control_right.png');
    this.load.image('control_left', 'img/control_left.png');
    this.load.image('control_jump', 'img/control_jump.png');
    this.load.image('control_pause', 'img/control_pause.png');

    //screen
    this.load.image('background', 'img/background.png');
    this.load.image('stone_4', 'img/stone_4.png');
    this.load.image('star', 'img/star.png');
    this.load.image('ground', 'img/ground.png');
    this.load.image('bomb', 'img/bomb.png');
    this.load.image('screen_play', 'img/screen_play.png');
    this.load.image('screen_retry', 'img/screen_retry.png');
    this.load.image('close_2', 'img/close_2.png');
    this.load.image('pointer_7', 'img/pointer_7.png');
    this.load.image('pointer_1', 'img/pointer_1.png');
    this.load.spritesheet('chest', 'img/chest.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('key', 'img/key.png', { frameWidth: 12, frameHeight: 8 });
},

 create: function ()
{
    score_3=0;

    function hitBomb (player, bomb)
    {
        if(saveThirdData === undefined) {
            saveThirdData = {
                unlockLevel: 3,
                score_3:score_3
            };
        } else {
            saveThirdData = {
                unlockLevel: 3,
                score_3:score_3
            };
            
            localStorage.setItem("saveThirdData", JSON.stringify(saveThirdData));
        }

        pause = this.physics.pause();

        player.setTint(0xff0000);
        player.anims.play('idle');

        gameOver = true;
        restart= true;
        score_3 = 0;

        screen_retry.setVisible(true);
    }
        
    function collectStar (player, star)
    {
        star.disableBody(true, true);

        score_3 += 10;
        scoreText.setText('Skor: ' + score_3);

        if (stars.countActive(true) === 0)
        {
            stars.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
        }

        if(score_3 > 350) {
            if(saveThirdData === undefined) {
                saveThirdData = {
                    unlockLevel: 3,
                    score_3:score_3
                };
            } else {
                saveThirdData = {
                    unlockLevel: 3,
                    score_3:score_3
                };
                
                localStorage.setItem("saveThirdData", JSON.stringify(saveThirdData));
            }

            if(!localStorage.getItem("saveThirdData")){
                localStorage.setItem("saveThirdData", JSON.stringify(saveThirdData));
            }else{
                saveThirdData = JSON.parse(localStorage.getItem("saveThirdData"));
            }
        }
    }

    //*************************************************************************************************************ADD OBJECT SCREEN
    background = this.add.image(400, 240, 'background');

    ground_1 = this.physics.add.image(150, 200, 'ground');
    ground_1.setImmovable(true);
    ground_1.body.allowGravity = false;

    ground_2 = this.physics.add.image(650, 200, 'ground');
    ground_2.setImmovable(true);
    ground_2.body.allowGravity = false;

    ground_3 = this.physics.add.image(400, 340, 'ground');
    ground_3.setImmovable(true);
    ground_3.body.allowGravity = false;

    player = this.physics.add.sprite(100, 415, 'monster_right_run');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    chest = this.add.sprite(600, 170, 'chest');
    key = this.add.sprite(600, 150, 'key').setScale(2);
    key.setVisible(false);

    //add Finish point
    pointer_1 = this.add.image(760, 420, 'pointer_1').setScale(2);
    pointer_1.setVisible(false);
    pointer_7 = this.add.image(760, 420, 'pointer_7').setScale(2);

    //******************************************************************************************************************ADD PLATFORMS
    platforms = this.physics.add.staticGroup();

    var one_block = this.add.tileSprite(400, 460, 32 * 23, 32 * 1, 'Tile_02');
    this.physics.add.existing(one_block, true);
    this.physics.add.collider(player, one_block);
    
    stone_4 = platforms.create(550, 430, 'stone_4');
    var Tile_01 = platforms.create(16, 460, 'Tile_01').refreshBody();
    var Tile_03 = platforms.create(784, 460, 'Tile_03').refreshBody();

    //******************************************************************************************************************COLLIDERS
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('monster_left_run', { start: 5, end: 0 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('monster_right_run', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('monster_jump', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('monster_idle', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'chest',
        frames: this.anims.generateFrameNumbers('chest', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'key',
        frames: this.anims.generateFrameNumbers('key', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    bombs = this.physics.add.group();
    scoreText = this.add.text(16, 16, 'Skor: 0', { fontSize: '24px', fill: '#fff', fontWeight: 'bold' });

    //**********************************************************************************************COLLIDER
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, stone_4);

    this.physics.add.collider(player, one_block);
    this.physics.add.collider(stars, one_block);
    this.physics.add.collider(bombs, one_block);

    this.physics.add.collider(Tile_01, stars);
    this.physics.add.collider(Tile_01, bombs);
    this.physics.add.collider(Tile_01, player);

    this.physics.add.collider(Tile_01, stars);
    this.physics.add.collider(Tile_03, player);

    this.physics.add.collider(ground_1, stars);
    this.physics.add.collider(ground_1, bombs);
    this.physics.add.collider(ground_1, player);
    this.physics.add.collider(ground_2, stars);
    this.physics.add.collider(ground_2, bombs);
    this.physics.add.collider(ground_2, player);
    this.physics.add.collider(ground_3, stars);
    this.physics.add.collider(ground_3, bombs);
    this.physics.add.collider(ground_3, player);

    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.collider(player, bombs, hitBomb, null, this);

    var control_jump= this.add.image(700, 350, 'control_jump');

    //add controller
    close_2 = this.add.image(400, 240, 'close_2');
    close_2.setVisible(false);
    screen_retry = this.add.image(400, 240, 'screen_retry');
    screen_retry.setVisible(false);
    screen_play = this.add.image(400, 120, 'screen_play');
    screen_play.setVisible(false);
    control_pause = this.add.image(740, 40, 'control_pause');
},

 update: function ()
{   
    //Gameover
    if (gameOver)
    {
        this.input.once('pointerdown', function (event) {
            if (restart === true) {
                this.time.addEvent({
                    delay: 3000,
                    loop: false,
                    callback: () => {
                        this.scene.start("SceneF");
                    }
                })
                restart=false;
            }            
        }, this);
    }

    //controller move
    var control_left= this.add.image(50, 350, "control_left");
    var control_right= this.add.image(150, 350, "control_right");
    
    //controller touch
    this.input.addPointer(1);

    var pointer1 = this.input.pointer1;
    var pointer2 = this.input.pointer2;

    if (pointer1.isDown) {
        var touchX = pointer1.x;
        var touchY = pointer1.y;
    }

    if (pointer2.isDown) {
        var touch2X = pointer2.x;
        var touch2Y = pointer2.y;
    }

    //controller right - left - turn
    if (touchX<75 && touchX>25 && touchY<405 && touchY>335)
    {
        control_left.setVisible(true);

        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if (touchX>125 && touchX<175 && touchY<405 && touchY>335)
    {
        control_right.setVisible(true);

        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    else
    {
        player.anims.play('idle', true);
        
        player.setVelocityX(0);
    }

    if(player.body.position.y>150) {
        ground_1.active = false;
        ground_2.active = false;
    } else {
        ground_1.active = true;
        ground_2.active = true;
    }

    //chest open pointer
    if(score_3>350) {
        if (player.body.position.x>575 && player.body.position.x<625 && player.body.position.y>50 && player.body.position.y<250 && saveThirdData.score_3!=undefined)
        {
            chest.anims.play('chest', true);
            key.setVisible(true);
            key.anims.play('key', true);

            this.time.addEvent({
                delay: 1000,
                loop: false,
                callback: () => {
                    key.setVisible(false);
                }
            })
            
            var complate = true;
        }
    }

    if(complate === true) {
        pointer_1.setVisible(true);
        pointer_7.setVisible(false);
    }

    //game end pointer
    if(complate === true) {
        this.physics.pause();

        this.time.addEvent({
            delay: 3000,
            loop: false,
            callback: () => {
                this.scene.start("SceneG");
            }
        })
    }

    //controller pause
    if(720<touchX && touchX<760 && touchY<60 && touchY>20 && player.body.touching.down) {
        close_2.setVisible(true);
        screen_play.setVisible(true);

         this.physics.pause();
    }

    //controller resume
    if (320<touchX && touchX<480 && touchY<320 && touchY>180)
    {
        if(saveThirdData === undefined) {
            saveThirdData = {
                unlockLevel: 3,
                score_3:score_3
            };
        } else {
            saveThirdData = {
                unlockLevel: 3,
                score_3:score_3
            };
            
            localStorage.setItem("saveThirdData", JSON.stringify(saveThirdData));
        }

        this.time.addEvent({
            delay: 3000,
            loop: false,
            callback: () => {
                this.scene.start("SceneB");
            }
        })
    } else if (320<touchX && touchX<480 && touchY<280 && touchY>100) {
        this.physics.resume();
        close_2.setVisible(false);
        screen_play.setVisible(false);
    }

    //controller jump
    if (665<touchX && touchX<735 && touchY<405 && touchY>335 && player.body.touching.down)
    {
        player.anims.play('jump', true);

        player.setVelocityY(-350);
    }

    if (665<touch2X && touch2X<735 && touch2Y<405 && touch2Y>335 && player.body.touching.down)
    {
        player.anims.play('jump', true);

        player.setVelocityY(-350);
    }
}
});