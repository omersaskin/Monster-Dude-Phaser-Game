var SceneC = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function() {
        Phaser.Scene.call(this, { "key": "SceneC" });
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
    this.load.image('Tile_13', 'img/Tile_13.png');
    this.load.image('Tile_21', 'img/Tile_21.png');
    this.load.image('Tile_23', 'img/Tile_23.png');
    this.load.image('ground', 'img/ground.png');

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
    this.load.image('stone_1', 'img/stone_1.png');
    this.load.image('stone_4', 'img/stone_4.png');
    this.load.image('star', 'img/star.png');
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
    score_2=0;

    function hitBomb (player, bomb)
    {
        if(saveSecondData === undefined) {
            saveSecondData = {
                unlockLevel: 2,
                score_2:score_2
            };
        } else {
            saveSecondData = {
                unlockLevel: 2,
                score_2:score_2
            };
            
            localStorage.setItem("saveSecondData", JSON.stringify(saveSecondData));
        }

        pause = this.physics.pause();

        player.setTint(0xff0000);
        player.anims.play('idle');

        gameOver = true;
        restart= true;
        score_2 = 0;

        screen_retry.setVisible(true);
    }
        
    function collectStar (player, star)
    {
        star.disableBody(true, true);

        score_2 += 10;
        scoreText.setText('Skor: ' + score_2);

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

        if(score_2 > 230) {
            if(saveSecondData === undefined) {
                saveSecondData = {
                    unlockLevel: 2,
                    score_2:score_2
                };
            } else {
                saveSecondData = {
                    unlockLevel: 2,
                    score_2:score_2
                };
                
                localStorage.setItem("saveSecondData", JSON.stringify(saveSecondData));
            }
            
            if(!localStorage.getItem("saveSecondData")){
                localStorage.setItem("saveSecondData", JSON.stringify(saveSecondData));
            }else{
                saveSecondData = JSON.parse(localStorage.getItem("saveSecondData"));
            }
        }
    }

    //*************************************************************************************************************ADD OBJECT SCREEN
    background = this.add.image(400, 240, 'background');
    player = this.physics.add.sprite(100, 415, 'monster_right_run');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    chest = this.add.sprite(600, 90, 'chest');
    key = this.add.sprite(600, 70, 'key').setScale(2);
    key.setVisible(false);

    //add Finish point
    pointer_1 = this.add.image(760, 420, 'pointer_1').setScale(2);
    pointer_1.setVisible(false);
    pointer_7 = this.add.image(760, 420, 'pointer_7').setScale(2);

    //******************************************************************************************************************ADD PLATFORMS
    platforms = this.physics.add.staticGroup();

    platforms.create(540, 200, 'Tile_21');
    platforms.create(16, 460, 'Tile_01').refreshBody();
    platforms.create(784, 460, 'Tile_03').refreshBody();

    var stone_4 = platforms.create(200, 430, 'stone_4');
    var stone_1 = platforms.create(450, 430, 'stone_1');

    movingPlatform = this.physics.add.image(320, 290, 'ground');
    movingPlatform.setImmovable(true);
    movingPlatform.body.allowGravity = false;
    movingPlatform.setVelocityX(50);

    //add sprite
    var one_block = this.add.tileSprite(400, 460, 32 * 23, 32 * 1, 'Tile_02');
    this.physics.add.existing(one_block, true);
    this.physics.add.collider(player, one_block);

    var third_block = this.add.tileSprite(700, 160, 32 * 1, 32 * 2, 'Tile_13');
    this.physics.add.existing(third_block, true);
    this.physics.add.collider(player, third_block);

    var four_block = this.add.tileSprite(620, 160, 32 * 4, 32 * 2, 'Tile_12');
    this.physics.add.existing(four_block, true);
    this.physics.add.collider(player, four_block);

    var five_block = this.add.tileSprite(540, 160, 32 * 1, 32 * 2, 'Tile_11');
    this.physics.add.existing(five_block, true);
    this.physics.add.collider(player, five_block);

    var six_block = this.add.tileSprite(620, 120, 32 * 4, 32 * 1, 'Tile_02');
    this.physics.add.existing(six_block, true);
    this.physics.add.collider(player, six_block);

    var seven_block = this.add.tileSprite(620, 200, 32 * 4, 32 * 1, 'Tile_05');
    this.physics.add.existing(seven_block, true);
    this.physics.add.collider(player, seven_block);

    var egiht_block = this.add.tileSprite(175, 200, 32 * 8, 32 * 1, 'Tile_08');
    this.physics.add.existing(egiht_block, true);
    this.physics.add.collider(player, egiht_block);

    //add tiles
    var Tile_01= platforms.create(540, 120, 'Tile_01');
    var Tile_03= platforms.create(700, 120, 'Tile_03');
    var Tile_23= platforms.create(700, 200, 'Tile_23');

    //******************************************************************************************************************animations
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
        key: 'chest',
        frames: this.anims.generateFrameNumbers('chest', { start: 0, end: 3 }),
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

    //add controller
    close_2 = this.add.image(400, 240, 'close_2');
    close_2.setVisible(false);
    screen_retry = this.add.image(400, 240, 'screen_retry');
    screen_retry.setVisible(false);
    screen_play = this.add.image(400, 120, 'screen_play');
    screen_play.setVisible(false);
    control_pause = this.add.image(740, 40, 'control_pause');
    
    //**********************************************************************************************COLLIDER
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, stone_4);
    this.physics.add.collider(player, stone_1);

    this.physics.add.collider(egiht_block, stars);
    this.physics.add.collider(egiht_block, bombs);

    this.physics.add.collider(stars, movingPlatform);
    this.physics.add.collider(bombs, movingPlatform);
    this.physics.add.collider(player, movingPlatform);

    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(stars, stone_4);
    this.physics.add.collider(stars, Tile_01);
    this.physics.add.collider(stars, Tile_03);
    this.physics.add.collider(stars, one_block);
    this.physics.add.collider(stars, six_block);

    this.physics.add.collider(bombs, stone_4);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(bombs, one_block);
    this.physics.add.collider(bombs, six_block);
    this.physics.add.collider(bombs, seven_block);
    this.physics.add.collider(bombs, Tile_01);
    this.physics.add.collider(bombs, Tile_03);
    this.physics.add.collider(bombs, Tile_23);
    this.physics.add.collider(bombs, five_block);
    this.physics.add.collider(bombs, third_block);
    
    var egiht_block = this.add.tileSprite(175, 200, 32 * 8, 32 * 1, 'Tile_08');
    this.physics.add.existing(egiht_block, true);
    this.physics.add.collider(player, egiht_block);

    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.collider(player, bombs, hitBomb, null, this);

    var control_jump= this.add.image(700, 350, 'control_jump');
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
                        this.scene.start("SceneC");
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
    
    //chest open pointer
    if(score_2>230) {
        if (player.body.position.x>525 && player.body.position.x<550 && player.body.position.y>70 && player.body.position.y<100 && saveSecondData.score_2!=undefined)
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
                this.scene.start("SceneF");
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
        if(saveSecondData === undefined) {
            saveSecondData = {
                unlockLevel: 2,
                score_2:score_2
            };
        } else {
            saveSecondData = {
                unlockLevel: 2,
                score_2:score_2
            };
            
            localStorage.setItem("saveSecondData", JSON.stringify(saveSecondData));
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

    //moving platform
    if (movingPlatform.x >= 500)
    {
        movingPlatform.setVelocityX(-50);
    }
    else if (movingPlatform.x <= 300)
    {
        movingPlatform.setVelocityX(50);
    }
}
});