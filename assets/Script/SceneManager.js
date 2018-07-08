// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var Loading = require('Loading');
cc.Class({
    extends: cc.Component,

    properties: {
        loading: Loading,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.game.addPersistRootNode(this.node);
        this.loading.startLoading();
    },

    loadScence (scenceName) {
        this.loading.startLoading();
        this.currentScence = scenceName;
        cc.director.preloadScene(scenceName,scenceLoaded);
    },

    scenceLoaded () {
        this.loading.stopLoading();
        cc.director.loadScene(this.currentScence);
    }

    // update (dt) {},
});
