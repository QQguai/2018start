// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 1,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        //register event
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.eKeyUp,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.eKeyDown,this);

        this.walkDir = null;
        this.animate = this.getComponent(cc.Animation);
    },

    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.eKeyUP,this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.eKeyDown,this);
    },

    eKeyUp (event) {
        this.walkDir = null;
        this.animate.stop();
    },

    eKeyDown (event) {
        
        switch (event.keyCode) {
            case cc.KEY.up : 
                if(this.walkDir != event.keyCode) {
                    this.animate.play('walkUp')
                }
                break;
            case cc.KEY.down :
                if(this.walkDir != event.keyCode) {
                    this.animate.play('walkDown')
                } 
                break;
            case cc.KEY.left : 
                if(this.walkDir != event.keyCode) {
                    this.animate.play('walkLeft')
                }
                break;
            case cc.KEY.right : 
                if(this.walkDir != event.keyCode) {
                    this.animate.play('walkRight')
                }
                break;
            default:
                break;
        }

        this.walkDir = event.keyCode;
            
    },

    update (dt) {
        switch (this.walkDir) {
            case cc.KEY.up:
                this.node.y += this.speed;
                break;
            case cc.KEY.down:
                this.node.y -= this.speed;
                break;
            case cc.KEY.left:
                this.node.x -= this.speed;
                break;
            case cc.KEY.right:
                this.node.x += this.speed;
                break;
            default:
                break;
        }
    },
});
