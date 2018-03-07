cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        this.scheduleOnce(()=>{
            window.location.replace(window.location.origin);
        }, 1.0);
    },
});
