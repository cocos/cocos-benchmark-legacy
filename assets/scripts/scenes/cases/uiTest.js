const baseRenderScene = require("baseRenderScene");
let config = require("config");

cc.Class({
    extends: baseRenderScene,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
        this._super(this.name.match(/<(\S*)>/)[1]);
    },
});