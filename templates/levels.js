var SceneE = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function() {
        Phaser.Scene.call(this, { "key": "SceneE" });
    },

    init: function() {},

        preload: function  ()
    {
        this.load.image('level_1', 'img/level_1.png');
        this.load.image('level_2', 'img/level_2.png');
        this.load.image('level_3', 'img/level_3.png');
        this.load.image('level_4', 'img/level_4.png');
        this.load.image('close_1', 'img/close_1.png');
        this.load.image('settings_ok', 'img/ok.png');
        this.load.image('level_select', 'img/level_select.png');
        this.load.image('bg_settings', 'img/bg_settings.png');
        this.load.image('lock', 'img/lock.png');
        this.load.image('level_select', 'img/level_select.png');
        this.load.image('table', 'img/table.png');
    },

    create: function () {
        //add screen object
        this.add.image(400, 240, 'bg_settings');
        this.add.image(400, 260, 'table');
        close_1 = this.add.image(700, 400, 'close_1');

        //json save data
        saveData = JSON.parse(localStorage.getItem("saveData"));
        saveSecondData = JSON.parse(localStorage.getItem("saveSecondData"));
        saveThirdData = JSON.parse(localStorage.getItem("saveThirdData"));
        saveFourData = JSON.parse(localStorage.getItem("saveFourData"));
        
        this.add.image(400, 60, 'level_select');
        var r1= this.add.image(200, 160, 'level_1');
        var r2= this.add.image(320, 160, 'level_2');
        var r3= this.add.image(440, 160, 'level_3');
        var r4= this.add.image(560, 160, 'level_4');
        lock_1=this.add.image(200, 200, 'lock');
        lock_2=this.add.image(320, 200, 'lock');
        lock_3=this.add.image(440, 200, 'lock');
        lock_4=this.add.image(560, 200, 'lock');

        if(saveData != undefined) {
            lock_1.setVisible(false);
            if(saveData.unlockLevel===1) {
                this.add.text(180, 200, saveData.score_1, { fontSize: '24px', fill: '#fff', fontWeight: 'bold' });
            }
        }

        if(saveSecondData != undefined) {
            lock_2.setVisible(false);
            if(saveSecondData.unlockLevel===2) {
                this.add.text(300, 200, saveSecondData.score_2, { fontSize: '24px', fill: '#fff', fontWeight: 'bold' });
            }
        }

        if(saveThirdData != undefined) {
            lock_3.setVisible(false);
            if(saveThirdData.unlockLevel===3) {
                this.add.text(420, 200, saveThirdData.score_3, { fontSize: '24px', fill: '#fff', fontWeight: 'bold' });
            }
        }

        if(saveFourData != undefined) {
            lock_4.setVisible(false);
            if(saveFourData.unlockLevel===4) {
                this.add.text(540, 200, saveFourData.score_4, { fontSize: '24px', fill: '#fff', fontWeight: 'bold' });
            }
        }
    },

    update: function () {
        //Controllers
        this.input.addPointer(1);
        var pointer1 = this.input.pointer1;

        if (pointer1.isDown) {
            var touchX = pointer1.x;
            var touchY = pointer1.y;
        }

        if (touchX>110 && touchX<190 && touchY>120 && touchY<200 && saveData != undefined)
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

        if (touchX>210 && touchX<290 && touchY>120 && touchY<200 && saveSecondData != undefined)
        {
            this.time.addEvent({
                delay: 1000,
                loop: false,
                callback: () => {
                    this.scene.start("SceneC");
                    localStorage.removeItem("saveSecondData");
                }
            })
        }

        if (touchX>285 && touchX<365 && touchY>120 && touchY<200 && saveThirdData != undefined)
        {
            this.time.addEvent({
                delay: 1000,
                loop: false,
                callback: () => {
                    this.scene.start("SceneF");
                    localStorage.removeItem("saveThirdData");
                }
            })
        }

        if (touchX>385 && touchX<465 && touchY>120 && touchY<200 && saveFourData != undefined)
        {
            this.time.addEvent({
                delay: 1000,
                loop: false,
                callback: () => {
                    this.scene.start("SceneG");
                    localStorage.removeItem("saveFourData");
                }
            })
        }

        if (touchX>660 && touchX<740 && touchY>360 && touchY<440)
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

