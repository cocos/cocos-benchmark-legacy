let gravity = 0;
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

    },

    init: function (bunnyType) {
        gravity = 0.5;
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
        this.speedX = Math.random() * 10;
        this.speedY = (Math.random() * 10) - 5;
        this.node.x = minX + 10;
        this.node.y = maxY * 0.7;
        this.node.anchorY = 1;
        //bunny.alpha = 0.3 + Math.random() * 0.7;
        // this.node.scale = 0.5 + Math.random() * 0.5;
        // this.node.rotation = 360 * (Math.random() * 0.2 - 0.1);
    },

    update: function (dt) {
        let x = this.node.x + this.speedX;
        let y = this.node.y - this.speedY;
        this.speedY += gravity;

        if (x > maxX) {
            this.speedX *= -1;
            x = maxX;
        }
        else if (x < minX) {
            this.speedX *= -1;
            x = minX;
        }

        if (y < minY) {
            this.speedY *= -0.85;
            y = minY;
            if (Math.random() > 0.5) {
                this.speedY -= Math.random() * 6;
            }
        }
        else if (y > maxY) {
            this.speedY = 0;
            y = maxY;
        }
        this.node.setPosition(x, y);
    }
});
