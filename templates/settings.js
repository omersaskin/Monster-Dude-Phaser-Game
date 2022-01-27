var SceneD = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "SceneD" });
    },
    init: function() {},

        preload: function  ()
    {
        this.load.image('start', 'img/play.png');
        this.load.image('sound', 'img/sound.png');
        this.load.image('sound_off', 'img/sound_off.png');
        this.load.image('bg_settings', 'img/bg_settings.png');
        this.load.image('title_settings', 'img/title_settings.png');
        this.load.image('faq', 'img/faq.png');
        this.load.image('settings_ok', 'img/ok.png');
        this.load.image('settings_close', 'img/close.png');
    },

    create: function () {
        //add screen object
        settings_ok = this.add.image(700, 400, 'settings_ok');
        settings_close = this.add.image(100, 400, 'settings_close');
        settings_sound = this.add.image(400, 140, 'sound');
        settings_sound_off = this.add.image(400, 240, 'sound_off');
        this.add.image(400, 240, 'bg_settings');
        this.add.image(400, 60, 'title_settings');
    },

    update: function () {
        //controllers
        this.input.addPointer(1);
        var pointer1 = this.input.pointer1;

        if (pointer1.isDown) {
            var touchX = pointer1.x;
            var touchY = pointer1.y;
        }

        if (touchX<450 && touchX>350 && touchY>190 && touchY>290)
        {

        }

        if (touchX>80 && touchX<120 && touchY>380 && touchY<420)
        {
            this.time.addEvent({
                delay: 1000,
                loop: false,
                callback: () => {
                    this.scene.start("SceneB");
                }
            })
        }
    }
});
