let config = require("config");

cc.Class({
    extends: cc.Component,

    properties: {
        scrollViewContent: cc.Node,
        menuItem: cc.Node,
        editBoxSN: cc.EditBox,
    },

    // use this for initialization
    onLoad: function () {
        config.CURRENT_CASE = -1;
        this.menuItem.parent = null;
        for (let i = 0; i < config.TEST_CASE.length; i++) {
            let testCaseInfo = config.TEST_CASE[i];
            testCaseInfo.index = i;
            let menuItem = cc.instantiate(this.menuItem);
            let name = menuItem.getChildByName("name");
            let toggle = menuItem.getChildByName("toggle");
            name.getComponent(cc.Label).string = `${i + 1}. ${testCaseInfo.name}`;
            name.color = testCaseInfo.scene === "" ? cc.Color.RED : cc.Color.BLACK;
            toggle.getComponent(cc.Toggle).isChecked = testCaseInfo.auto;
            menuItem.getComponent(cc.Button).clickEvents[0].customEventData = testCaseInfo.index;
            menuItem.parent = this.scrollViewContent;
        }
    },

    onClickTestCase: function (_, _2, data) {
        let testCaseIndex = parseInt(data);
        let testCaseInfo = config.TEST_CASE[testCaseIndex];
        if (!testCaseInfo) {
            cc.warn("Error test case.");
            return;
        }
        config.CURRENT_CASE = testCaseIndex;
        config.setSceneArgs(testCaseInfo);
        cc.director.loadScene(testCaseInfo.scene);
    },

    onClickAutoTest: function () {
        let sn = this._getSN();
        if (!sn) {
            alert("Please input SN...");
            return;
        }
        config.IS_AUTO_TESTING = true;
        config.AUTO_CASE_CURSOR = 0;
        config.AUTO_TEST_CASE = [];
        config.AUTO_TEST_RESULT = {
            os: cc.sys.os,
            browser: cc.sys.browserType,
            sn: sn,
            data: []
        };
        for (let i = 0; i < config.TEST_CASE.length; i++) {
            let testCaseInfo = config.TEST_CASE[i];
            if (testCaseInfo.auto) {
                config.AUTO_TEST_CASE.push(testCaseInfo);
            }
        }
        if (config.AUTO_TEST_CASE.length) {
            let testCaseInfo = config.AUTO_TEST_CASE[config.AUTO_CASE_CURSOR];
            config.CURRENT_CASE = testCaseInfo.index;
            config.setSceneArgs(testCaseInfo);
            cc.director.loadScene(testCaseInfo.scene);
        }
    },

    _getSN: function () {
        let ebSN = parseInt(this.editBoxSN.string);
        if (isNaN(ebSN)) {
            return null;
        }
        let _prefixInteger = function(num, length) {
            return ("000000000" + num).substr(-length);
        };
        let time = new Date();
        let sn = "";
        sn += time.getFullYear() + "" + _prefixInteger((time.getMonth() + 1), 2) + "" + _prefixInteger(time.getDate(), 2);
        sn += _prefixInteger(ebSN, 4);
        return sn;
    }
    
});
