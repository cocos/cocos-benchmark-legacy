const baseLoaderScene = require("baseLoaderScene");
let config = require("config");

cc.Class({
    extends: baseLoaderScene,

    properties: {
        labelLog: cc.Label,
    },

    // use this for initialization
    onLoad: function () {
        this._super(this.name.match(/<(\S*)>/)[1]);
        this.count = 0;
        this.labelLog.string = "";
    },

    loadRes: function (finish_cb) {
        const gamePrefab = "uiTest/prefab/gamePrefab";
        let _releasePrefab = (prefab) => {
            let deps = cc.loader.getDependsRecursively(prefab._uuid);
            cc.loader.release(deps);
        }
        let _loadPrefab = (count) => {
            let beforeLoadTime = performance.now();
            cc.loader.loadRes(gamePrefab, (err, prefab) => {
                if (!err) {
                    let afterLoadTime = performance.now();
                    let gap_time = afterLoadTime - beforeLoadTime;
                    this.durationTimeArr.push(gap_time);
                    this.labelLog.string += `loading ${++this.count}: ${Math.round(gap_time)}ms\n`;
                    count --;
                    _releasePrefab(prefab);
                    if (count > 0) {
                        _loadPrefab(count);
                    }else {
                        finish_cb && finish_cb();
                    }
                }
            });
        };
        _loadPrefab(config.SCENE_ARGS.count);
    }
});