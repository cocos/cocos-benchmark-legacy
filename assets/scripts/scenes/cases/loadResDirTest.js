const baseLoaderScene = require("baseLoaderScene");
let config = require("config");

cc.Class({
    extends: baseLoaderScene,

    properties: {
        log: cc.Label,
    },

    onLoad: function () {
        this._super(this.name.match(/<(\S*)>/)[1]);
        this.count = 0;
        this.log.string = "";
    },

    loadRes: function (finish_cb) {
        const dir = "loadResDirTest";
        let _releaseAsset = function (asset) {
            let deps = cc.loader.getDependsRecursively(asset);
            cc.loader.release(deps);
        }
        let _loadResDir = (count) => {
            let beforeLoadTime = performance.now();
            cc.loader.loadResDir(dir, cc.Texture2D, null, (err, assets) => {
                if (!err) {
                    let afterLoadTime = performance.now();
                    let gap_time = afterLoadTime - beforeLoadTime;
                    this.durationTimeArr.push(gap_time);
                    this.log.string += `loadResDir ${++this.count}: ${Math.round(gap_time)}ms\n`;
                    count --;
                    for (var i = 0, l = assets.length; i < l; i++) {
                        _releaseAsset(assets[i]);
                    }
                    if (count > 0) {
                        _loadResDir(count);
                    }else {
                        finish_cb && finish_cb();
                    }
                }
            });
        };
        window.wxDownloader && (wxDownloader.cacheAsset = false);
        _loadResDir(config.SCENE_ARGS.count);
    }
});
