let maxX = 0;
let minX = 0;
let maxY = 0;
let minY = 0;
const spriteNoRender = require('./spriteNoRender');

cc.Class({
    extends: cc.Component,

    properties: {
        bunnySpriteFrames:[cc.SpriteFrame],
    },

    // use this for initialization
    onLoad: function () {
        if (this.aniType === 0) {
            this.node.getComponent(cc.Animation).play("bunnyTransform");    
        }else if (this.aniType === 1) {
            this.node.getComponent(cc.Animation).play("bunnyFrame");
        }
    },

    init: function (bunnyType, aniType) {
        this.aniType = aniType;

        maxX = cc.winSize.width / 2;
        maxY = cc.winSize.height / 2;
        minX = -maxX;
        minY = -maxY;

        let bunnySpriteFrame = this.bunnySpriteFrames[bunnyType];
        // this.node.getComponent(cc.Sprite).spriteFrame = bunnySpriteFrame;
        this.node.getComponent(spriteNoRender).spriteFrame = bunnySpriteFrame;
        
        this.node.x = Math.random() * (maxX - minX) + minX;
        this.node.y = Math.random() * (maxY - minY) + minY;
        this.node.anchorY = 1;
        // bunny.alpha = 0.3 + Math.random() * 0.7;
        // this.node.scale = 0.5 + Math.random() * 0.5;
        // this.node.rotation = 360 * (Math.random() * 0.2 - 0.1);
    },
});
