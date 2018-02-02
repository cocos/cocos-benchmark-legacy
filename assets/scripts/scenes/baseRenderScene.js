let config = require("config");
let utils = require("utils");
let baseScene = require("baseScene");


cc.Class({
    extends: baseScene,

    properties: {

    },

    // use this for initialization
    onLoad: function (subScriptName) {
        this._super(subScriptName);

        this.resetTestConfig();

        if (config.IS_AUTO_TESTING) {
            this.autoStartTest();
        }
        let beforeUpdateTime = 0;
        let afterDrawTime = 0;
        cc.director.on(cc.Director.EVENT_BEFORE_UPDATE, ()=>{
            if (!this.isTesting) {
                return;
            }
            beforeUpdateTime = performance.now();
        });
        cc.director.on(cc.Director.EVENT_AFTER_DRAW, ()=>{
            if (!this.isTesting || beforeUpdateTime === 0) {
                return;
            }
            afterDrawTime = performance.now();
            this.durationTimeArr.push(afterDrawTime - beforeUpdateTime);
        });
    },

    resetTestConfig: function () {
        this.beginTestTime = 5;
        this.testDurationTime = 40;
    },

    autoStartTest: function () {
        this.scheduleOnce(() => {
            this.onClickTest();
        }, this.beginTestTime);
    },

    startTest: function () {
        this.resetTestConfig();
        this.scheduleOnce(()=>{
            this.endTest();
        }, this.testDurationTime);
    },
});
