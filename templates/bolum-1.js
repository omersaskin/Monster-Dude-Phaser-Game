var SceneA = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function() {
        Phaser.Scene.call(this, { "key": "SceneA" });
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

    //monster anitmation
    this.load.spritesheet('monster_right_run', 'img/monster_right_run.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('monster_left_run', 'img/monster_left_run.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('monster_jump', 'img/monster_jump.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('monster_idle', 'img/monster_idle.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('Centipede_idle', 'img/Centipede_idle.png', { frameWidth: 72, frameHeight: 72 });
    this.load.spritesheet('monster_climb', 'img/monster_climb.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('Centipede_attack2', 'img/Centipede_attack2.png', { frameWidth: 32, frameHeight: 32 });

    //controller
    this.load.image('control_right', 'img/control_right.png');
    this.load.image('control_left', 'img/control_left.png');
    this.load.image('control_jump', 'img/control_jump.png');
    this.load.image('control_pause', 'img/control_pause.png');

    //screen
    this.load.image('background', 'img/background.png');
    this.load.image('stone_4', 'img/stone_4.png');
    this.load.image('star', 'img/star.png');
    this.load.image('bomb', 'img/bomb.png');
    this.load.image('screen_play', 'img/screen_play.png');
    this.load.image('screen_retry', 'img/screen_retry.png');
    this.load.image('close_2', 'img/close_2.png');
    this.load.image('pointer_7', 'img/pointer_7.png');
    this.load.image('pointer_1', 'img/pointer_1.png');
    this.load.image('ladder_2', 'img/ladder_2.png');
    this.load.spritesheet('chest', 'img/chest.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('key', 'img/key.png', { frameWidth: 12, frameHeight: 8 });
},

 create: function ()
{
    score_1=0;

    function hitBomb (player, bomb)
    {
        if(saveData === undefined) {
            saveData = {
                unlockLevel: 1,
                score_1:score_1
            };
        } else {
            saveData = {
                unlockLevel: 1,
                score_1:score_1
            };
            
            localStorage.setItem("saveData", JSON.stringify(saveData));
        }

        pause = this.physics.pause();

        player.setTint(0xff0000);
        player.anims.play('idle');

        gameOver = true;
        restart= true;
        score_1 = 0;
        screen_retry.setVisible(true);
    }
        
    function collectStar (player, star)
    {
        star.disableBody(true, true);

        score_1 += 10;
        scoreText.setText('Skor: ' + score_1);

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

        if(score_1 > 110) {
            if(saveData === undefined) {
                saveData = {
                    unlockLevel: 1,
                    score_1:score_1
                };
            } else {
                saveData = {
                    unlockLevel: 1,
                    score_1:score_1
                };
                
                localStorage.setItem("saveData", JSON.stringify(saveData));
            }
            
            if(!localStorage.getItem("saveData")){
                localStorage.setItem("saveData", JSON.stringify(saveData));
            }else{
                saveData = JSON.parse(localStorage.getItem("saveData"));
            }
        }
    }

    //*************************************************************************************************************ADD OBJECT SCREEN
    background = this.add.image(400, 240, 'background');
    ladder_2 = this.add.tileSprite(160, 280, 32 * 1, 32 * 8, 'ladder_2').setDepth(1);
    player = this.physics.add.sprite(100, 415, 'monster_right_run').setDepth(3);
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
    stone_4 = platforms.create(550, 430, 'stone_4');
    platforms.create(16, 460, 'Tile_01').refreshBody();
    platforms.create(784, 460, 'Tile_03').refreshBody();

    //add sprite
    var one_block = this.add.tileSprite(400, 460, 32 * 23, 32 * 1, 'Tile_02');
    this.physics.add.existing(one_block, true);
    this.physics.add.collider(player, one_block);

    var second_block = this.add.tileSprite(360, 320, 32 * 7, 32 * 1, 'Tile_08');
    this.physics.add.existing(second_block, true);

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
    climbCollider = this.physics.add.collider(player, egiht_block);

    var eight = this.physics.add.collider(player, second_block);

    //add tiles
    var Tile_01= platforms.create(540, 120, 'Tile_01');
    var Tile_03= platforms.create(700, 120, 'Tile_03');
    var Tile_23= platforms.create(700, 200, 'Tile_23');

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
        key: 'monster_climb',
        frames: this.anims.generateFrameNumbers('monster_climb', { start: 0, end: 3 }),
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

    this.physics.add.collider(egiht_block, stars);
    this.physics.add.collider(egiht_block, bombs);

    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(stars, stone_4);
    this.physics.add.collider(stars, Tile_01);
    this.physics.add.collider(stars, Tile_03);
    this.physics.add.collider(stars, one_block);
    this.physics.add.collider(stars, second_block);
    this.physics.add.collider(stars, six_block);

    this.physics.add.collider(bombs, stone_4);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(bombs, one_block);
    this.physics.add.collider(bombs, second_block);
    this.physics.add.collider(bombs, six_block);
    this.physics.add.collider(bombs, seven_block);
    this.physics.add.collider(bombs, Tile_01);
    this.physics.add.collider(bombs, Tile_03);
    this.physics.add.collider(bombs, Tile_23);
    this.physics.add.collider(bombs, five_block);
    this.physics.add.collider(bombs, third_block);

    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.collider(player, bombs, hitBomb, null, this);

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
                        this.scene.start("SceneA");
                    }
                })
                restart=false;
            }            
        }, this);
    }
    
    //controller move
    var control_left= this.add.image(50, 350, "control_left").setDepth(2);
    var control_right= this.add.image(150, 350, "control_right").setDepth(2);
    var control_jump= this.add.image(700, 350, 'control_jump').setDepth(2);

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

    //controller climb
    if(player.body.position.x>128 && player.body.position.x<188 && player.body.position.y<350) {
        if(player.body.position.y>140) {
            var climbing=true;
            player.setVelocityY(-100);
            player.anims.play('monster_climb',true);
        } else {
            player.anims.play('monster_idle', false);
        }
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
        if(climbing!=true) {
            player.anims.play('idle', true);
        }
        
        player.setVelocityX(0);
    }

    if(player.body.position.x>128 && player.body.position.x<188 && player.body.position.y<350) {
        climbCollider.active = false;
    } else {
        climbCollider.active = true;
    }
    
    //chest open pointer
    if(score_1>110) {
        if (player.body.position.x>525 && player.body.position.x<550 && player.body.position.y>70 && player.body.position.y<100 && saveData.score_1 != undefined)
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
                this.scene.start("SceneC");
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
        if(saveData === undefined) {
            saveData = {
                unlockLevel: 1,
                score_1:score_1
            };
        } else {
            saveData = {
                unlockLevel: 1,
                score_1:score_1
            };
            
            localStorage.setItem("saveData", JSON.stringify(saveData));
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
        if(climbing!=true) {
            player.anims.play('jump', true);
        }
        player.setVelocityY(-350);
    }

    if (665<touch2X && touch2X<735 && touch2Y<405 && touch2Y>335 && player.body.touching.down)
    {
        if(climbing!=true) {
            player.anims.play('jump', true);
        }
        player.setVelocityY(-350);
    }
}
});