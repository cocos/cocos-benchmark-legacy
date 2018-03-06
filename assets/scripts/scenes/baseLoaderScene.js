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
    },

    resetTestConfig: function () {
        this.beginTestTime = 10;
    },

    autoStartTest: function () {
        this.scheduleOnce(() => {
            this.onClickTest();
        }, this.beginTestTime);
    },

    startTest: function () {
        this.resetTestConfig();
        this.loadRes(()=>{
            this.endTest();
        });
    },

    loadRes: function (finish_cb) {
        cc.warn("You should implement it in sub-class.");
    },
});
