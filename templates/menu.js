var SceneB = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function() {
        Phaser.Scene.call(this, { "key": "SceneB" });
    },

    init: function() {},

        preload: function  ()
    {
        this.load.image('background', 'img/background.png');
        this.load.image('play', 'img/play.png');
        this.load.image('prize', 'img/prize.png');
        this.load.image('about', 'img/about.png');
        this.load.image('sound', 'img/sound.png');
    },

    create: function () {
        //add screen object
        this.add.image(400, 240, 'background');
        this.add.image(700, 400, 'sound');
        this.add.image(225, 240, 'play');
        this.add.image(400, 240, 'prize');
        this.add.image(575, 240, 'about');
    },

    update: function () {
        //controllers
        this.input.addPointer(1);
        var pointer1 = this.input.pointer1;

        if (pointer1.isDown) {
            var touchX = pointer1.x;
            var touchY = pointer1.y;
        }

        if (touchX>350 && touchX<450 && touchY<280 && touchY>200)
        {
            this.time.addEvent({
                delay: 1000,
                loop: false,
                callback: () => {
                    this.scene.start("SceneE");
                }
            })
        }

        if (touchX>125 && touchX<325 && touchY<280 && touchY>200)
        {
            this.time.addEvent({
                delay: 1000,
                loop: false,
                callback: () => {
                    this.scene.start("SceneA");
                    localStorage.removeItem("saveData");
                }
            })
        }
    }
});
