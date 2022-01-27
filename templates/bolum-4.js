var SceneG = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function() {
        Phaser.Scene.call(this, { "key": "SceneG" });
    },

    init: function() {},

preload: function  ()
{
    //tiles
    this.load.image('Tile_07', 'img/Tile_07.png');
    this.load.image('orta_zemin', 'img/Tile_08.png');
    this.load.image('Tile_09', 'img/Tile_09.png');
    this.load.image('sag_yan', 'img/Tile_13.png');
    this.load.image('sol_yan', 'img/Tile_11.png');
    this.load.image('sag_alt', 'img/Tile_23.png');
    this.load.image('sag_ust', 'img/Tile_03.png');
    this.load.image('sol_ust', 'img/Tile_01.png');
    this.load.image('ust', 'img/Tile_02.png');
    this.load.image('ic_zemin', 'img/Tile_26.png');

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
    score_4=0;

    function hitBomb (player, bomb)
    {
        if(saveFourData === undefined) {
            saveFourData = {
                unlockLevel: 4,
                score_4:score_4
            };
        } else {
            saveFourData = {
                unlockLevel: 4,
                score_4:score_4
            };
            
            localStorage.setItem("saveFourData", JSON.stringify(saveFourData));
        }

        pause = this.physics.pause();

        player.setTint(0xff0000);
        player.anims.play('idle');

        gameOver = true;
        restart= true;
        score_4 = 0;
        screen_retry.setVisible(true);
    }
        
    function collectStar (player, star)
    {
        star.disableBody(true, true);

        score_4 += 10;
        scoreText.setText('Skor: ' + score_4);

        if (stars.countActive(true) === 11)
        {
            //stars.children.iterate(function (child) {
              //  child.enableBody(true, child.x, 0, true, true);
            //});

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
        }

        if(stars.countActive(true) === 7) {
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
        }

        if(stars.countActive(true) === 3) {
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
        }

        if(score_4 > 110) {
            if(saveFourData === undefined) {
                saveFourData = {
                    unlockLevel: 4,
                    score_4:score_4
                };
            } else {
                saveFourData = {
                    unlockLevel: 4,
                    score_4:score_4
                };
                
                localStorage.setItem("saveFourData", JSON.stringify(saveFourData));
            }
            
            if(!localStorage.getItem("saveFourData")){
                localStorage.setItem("saveFourData", JSON.stringify(saveFourData));
            }else{
                saveFourData = JSON.parse(localStorage.getItem("saveFourData"));
            }
        }
    }

    //*************************************************************************************************************ADD OBJECT SCREEN
    background = this.add.image(400, 240, 'background');
    player = this.physics.add.sprite(100, 415, 'monster_right_run');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    chest = this.add.sprite(500, 430, 'chest');
    key = this.add.sprite(500, 400, 'key').setScale(2);
    key.setVisible(false);

    //add Finish point
    pointer_1 = this.add.image(760, 420, 'pointer_1').setScale(2);
    pointer_1.setVisible(false);
    pointer_7 = this.add.image(760, 420, 'pointer_7').setScale(2);

    //******************************************************************************************************************ADD PLATFORMS
    platforms = this.physics.add.staticGroup();

    platforms.create(784, 460, 'sag_ust').refreshBody();
    platforms.create(16, 460, 'sol_ust').refreshBody();
    
    //add sprite

    //engel 1
    var sol_ust= platforms.create(405, 150, 'sol_ust');
    var sag_ust= platforms.create(685, 150, 'sag_ust');

    var sol_yan = this.add.tileSprite(405, 220, 32 * 1, 32 * 4, 'sol_yan');
    this.physics.add.existing(sol_yan, true);
    this.physics.add.collider(player, sol_yan);

    var sol_yan_2=this.add.tileSprite(300, 380, 32 * 1, 32 * 4, 'sol_yan');
    this.physics.add.existing(sol_yan_2, true);
    this.physics.add.collider(player, sol_yan_2);
    
    var sol_ust_2=this.add.tileSprite(300, 300, 32 * 1, 32 * 1, 'sol_ust');
    this.physics.add.existing(sol_ust_2, true);
    this.physics.add.collider(player, sol_ust_2);

    var sag_yan = this.add.tileSprite(685, 415, 32 * 1, 32 * 9, 'sag_yan');
    this.physics.add.existing(sag_yan, true);
    this.physics.add.collider(player, sag_yan);

    var sag_yan_2 = this.add.tileSprite(685, 260, 32 * 1, 32 * 1, 'sag_ust');
    this.physics.add.existing(sag_yan_2, true);
    this.physics.add.collider(player, sag_yan_2);

    var ust_3 = this.add.tileSprite(550, 150, 32 * 8, 32 * 1, 'ust');
    this.physics.add.existing(ust_3, true);
    this.physics.add.collider(player, ust_3);

    var ust_2=this.add.tileSprite(360, 300, 32 * 3, 32 * 1, 'ust');
    this.physics.add.existing(ust_2, true);
    this.physics.add.collider(player, ust_2);

    var ic_zemin=this.add.tileSprite(405, 300, 32 * 1, 32 * 1, 'ic_zemin');
    this.physics.add.existing(ic_zemin, true);
    this.physics.add.collider(player, ic_zemin);

    //zemin
    var ust = this.add.tileSprite(400, 460, 32 * 23, 32 * 1, 'ust');
    this.physics.add.existing(ust, true);
    this.physics.add.collider(player, ust);

    var orta_zemin = this.physics.add.collider(player, orta_zemin);

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

    this.physics.add.collider(orta_zemin, stars);
    this.physics.add.collider(orta_zemin, bombs);

    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(stars, sol_ust);
    this.physics.add.collider(stars, sag_ust);
    this.physics.add.collider(stars, ust);
    this.physics.add.collider(stars, orta_zemin);
    this.physics.add.collider(stars, ust);
    this.physics.add.collider(stars, ust_2);
    this.physics.add.collider(stars, ust_3);
    this.physics.add.collider(stars, sag_yan_2);
    this.physics.add.collider(stars, sol_yan_2);
    this.physics.add.collider(stars, sol_ust_2);

    this.physics.add.collider(bombs, ic_zemin);
    this.physics.add.collider(bombs, ust_2);
    this.physics.add.collider(bombs, ust_3);
    this.physics.add.collider(bombs, sag_yan_2);
    this.physics.add.collider(bombs, sol_yan_2);
    this.physics.add.collider(bombs, sol_ust_2);
    this.physics.add.collider(bombs, ust);
    this.physics.add.collider(bombs, orta_zemin);
    this.physics.add.collider(bombs, ust);
    this.physics.add.collider(bombs, sol_ust);
    this.physics.add.collider(bombs, sag_ust);
    this.physics.add.collider(bombs, sol_yan);
    this.physics.add.collider(bombs, sag_yan);

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
                        this.scene.start("SceneG");
                    }
                })
                restart=false;
            }            
        }, this);
    }

    //controller move
    var control_left= this.add.image(50, 350, "control_left");
    var control_right= this.add.image(150, 350, "control_right");
    var control_jump= this.add.image(700, 350, 'control_jump');

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
    if(score_4>110) {
        if (player.body.position.x>475 && player.body.position.x<525 && player.body.position.y>400 && player.body.position.y<460 && saveFourData.score_4 != undefined)
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
                this.scene.start("SceneB");
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
        if(saveFourData === undefined) {
            saveFourData = {
                unlockLevel: 4,
                score_4:score_4
            };
        } else {
            saveFourData = {
                unlockLevel: 4,
                score_4:score_4
            };
            
            localStorage.setItem("saveFourData", JSON.stringify(saveFourData));
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