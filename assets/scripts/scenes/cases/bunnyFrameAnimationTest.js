const baseRenderScene = require("baseRenderScene");
let config = require("config");

let bunnyType = 0;
let totalCount = 0;
let count = 0;
let amount = 0;

cc.Class({
    extends: baseRenderScene,

    properties: {
        prefabBunny: cc.Prefab,
        number: cc.Label,
        button: cc.Button,
    },

    // use this for initialization
    onLoad: function () {
        this._super(this.name.match(/<(\S*)>/)[1]);

        this.number.node.zIndex = config.HIGHEST_ZINDEX;
        this.button.node.zIndex = config.HIGHEST_ZINDEX;

        this.reset();
    },

    reset: function () {
        this.bunnys = [];

        bunnyType = 0;
        totalCount = config.SCENE_ARGS.count;
        count = 0;
        amount = 50;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        let bunny, i;
        if (this.bunnys.length < totalCount) {
            for (i = 0; i < amount; i++) {
                bunny = cc.instantiate(this.prefabBunny);
                bunny.getComponent("prefabAnimationBunny").init(bunnyType, 1);
                this.node.addChild(bunny);
                this.bunnys.push(bunny);
                count++;
            }
            this.number.string = count;
            bunnyType++;
            bunnyType %= 5;
        }
    },

    addItem: function (){
        totalCount += 1000;
    },
});