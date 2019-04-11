const baseRenderScene = require("baseRenderScene");
let config = require("config");

cc.Class({
    extends: baseRenderScene,

    properties: {
        prefab: cc.Prefab,
        root: cc.Node,
        info: cc.Label
    },

    // use this for initialization
    onLoad: function () {
        this._super(this.name.match(/<(\S*)>/)[1]);

        let totalCount = config.SCENE_ARGS.count;

        for (let i = 0; i < totalCount; i++) {
            let node = cc.instantiate(this.prefab);
            this.randomPosition(node);
            this.root.addChild(node);
        }

        this.info.string = totalCount;
    },
    randomPosition (node) {
        let width = cc.visibleRect.width;
        let height = cc.visibleRect.height;
        node.x = Math.random() * width - width/2;
        node.y = Math.random() * height - height/2;
    },

});