let maxX = 0;
let minX = 0;
let maxY = 0;
let minY = 0;

cc.Class({
    extends: cc.Component,

    properties: {
        bunnySpriteFrames:[cc.SpriteFrame],
        frameType: 0,
    },

    // use this for initialization
    onLoad: function () {
        this.schedule(this.changeSprite, 1, cc.macro.REPEAT_FOREVER, 1)
    },

    init: function (bunnyType, aniType) {
        this.aniType = aniType;

        maxX = cc.winSize.width / 2;
        maxY = cc.winSize.height / 2;
        minX = -maxX;
        minY = -maxY;

        let bunnySpriteFrame = this.bunnySpriteFrames[bunnyType];
        this.node.getComponent(cc.Sprite).spriteFrame = bunnySpriteFrame;
        
        this.node.x = Math.random() * (maxX - minX) + minX;
        this.node.y = Math.random() * (maxY - minY) + minY;
        this.node.anchorY = 1;
        //bunny.alpha = 0.3 + Math.random() * 0.7;
        // this.node.scale = 0.5 + Math.random() * 0.5;
        // this.node.rotation = 360 * (Math.random() * 0.2 - 0.1);
    },

    changeSprite() {
        this.frameType++;
        let type = this.frameType % 5;
        let bunnySpriteFrame = this.bunnySpriteFrames[type];
        this.node.getComponent(cc.Sprite).spriteFrame = bunnySpriteFrame;
    }
});
