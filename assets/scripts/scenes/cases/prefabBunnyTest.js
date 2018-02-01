const baseRenderScene = require("baseRenderScene");
let config = require("config");

let bunnyType = 0;
let isAdding = false;
let count = 0;
let amount = 0;

cc.Class({
    extends: baseRenderScene,

    properties: {
        prefabBunny: cc.Prefab,
        number: cc.Label
    },

    // use this for initialization
    onLoad: function () {
        this._super(this.name.match(/<(\S*)>/)[1]);

        this.number.node.zIndex = config.HIGHEST_ZINDEX;

        this.reset();

        this.node.on('touchstart', () => {
            isAdding = true;
        });
        this.node.on('touchend', () => {
            bunnyType++;
            bunnyType %= 5;
            isAdding = false;
        });
        this.node.on('touchcancel', () => {
            bunnyType++;
            bunnyType %= 5;
            isAdding = false;
        });
    },

    reset: function () {
        this.bunnys = [];

        bunnyType = 0;
        isAdding = false;
        count = 0;
        amount = 100;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        let bunny, i;
        if (isAdding) {
            for (i = 0; i < amount; i++) {
                bunny = cc.instantiate(this.prefabBunny);
                bunny.getComponent("prefabBunny").init(bunnyType);
                this.node.addChild(bunny);
                this.bunnys.push(bunny);
                count++;
            }
            this.number.string = count;
        }
    },
});