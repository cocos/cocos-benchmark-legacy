let maxX = 0;
let minX = 0;
let maxY = 0;
let minY = 0;

cc.Class({
    extends: cc.Component,

    properties: {
        tex: {
            type: cc.Texture2D,
            default: null,
        },
    },

    // use this for initialization
    onLoad: function () {
        this.node.runAction(
            cc.spawn(
                cc.sequence(
                    cc.scaleTo(1, 1.5, 1.5),
                    cc.scaleTo(1, 0.5, 0.5),
                ),
                cc.sequence(
                    cc.rotateBy(1, 360, 360),
                    cc.rotateBy(1, -360, -360)
                ),
                cc.sequence(
                    cc.moveTo(1, 240, 320),
                    cc.moveTo(1, -240, -320)
                )   
            ).repeatForever()
        );
    },

    init: function (bunnyType) {
        maxX = cc.winSize.width / 2;
        maxY = cc.winSize.height / 2;
        minX = -maxX;
        minY = -maxY;

        let bunnySpriteFrame = null;
        switch (bunnyType) {
            case 0:
                bunnySpriteFrame = new cc.SpriteFrame(this.tex, cc.rect(2, 47, 26, 37));
                break;
            case 1:
                bunnySpriteFrame = new cc.SpriteFrame(this.tex, cc.rect(2, 86, 26, 37));
                break;
            case 2:
                bunnySpriteFrame = new cc.SpriteFrame(this.tex, cc.rect(2, 125, 26, 37));
                break;
            case 3:
                bunnySpriteFrame = new cc.SpriteFrame(this.tex, cc.rect(2, 164, 26, 37));
                break;
            case 4:
                bunnySpriteFrame = new cc.SpriteFrame(this.tex, cc.rect(2, 2, 26, 37));
                break;
            default:
                break;
        }

        this.node.getComponent(cc.Sprite).spriteFrame = bunnySpriteFrame;
        this.node.x = -240;
        this.node.y = -320;
        this.node.anchorY = 1;
        //bunny.alpha = 0.3 + Math.random() * 0.7;
        this.node.scale = 0.5;
        this.node.rotation = 0;
    },
});
