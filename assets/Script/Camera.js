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

    // properties: {
    //     target: {
    //         default: null,       
    //         type: cc.Node, 
    //     },
    //     map: {
    //         default: null,        
    //         type: cc.Node, 

    //     },
    // },

    // // LIFE-CYCLE CALLBACKS:

    // onLoad () {
    //     this.screenMidPoint = cc.v2(cc.winSize.width/2,cc.winSize.height/2);
    //     this.maxX = this.map.width - cc.winSize.width;
    //     this.maxY = this.map.height - cc.winSize.height;
    // },

    // CalculationMovingVector () {
    //     var tarPoint = this.target.convertToWorldSpace(cc.Vec2.ZERO);
    //     var screenMidPointWorld = this.screenMidPoint;
    //     var mapPosition = this.map.convertToWorldSpace(cc.Vec2.ZERO);
        
    //     var moveVector = screenMidPointWorld.sub(tarPoint);

    //     return mapPosition.add(moveVector);
    // },

    // update (dt) {

    //     var mapPosition = this.CalculationMovingVector();

    //     var x = cc.clampf(mapPosition.x,-this.maxX,0);
    //     var y = cc.clampf(mapPosition.y,-this.maxY,0);

    //     //转换成其父节点坐标系的坐标
    //     this.map.position = this.map.parent.convertToNodeSpaceAR(cc.v2(x,y));
    // },

       properties: {
        target: {
            default: null,
            type: cc.Node
        },

        map: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        let winSize = cc.winSize;
        this.screenMiddle = cc.v2(winSize.width/2, winSize.height/2);

        this.boundingBox = cc.rect(0,0, this.map.width,this.map.height);

        this.minx = -(this.boundingBox.xMax - winSize.width);
        this.maxx = this.boundingBox.xMin;
        this.miny = -(this.boundingBox.yMax - winSize.height);
        this.maxy = this.boundingBox.yMin;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        let pos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
        let targetPos = this.target.convertToWorldSpaceAR(cc.Vec2.ZERO);
        let dif = pos.sub(targetPos);

        let dest = dif.add(this.screenMiddle);

        dest.x = cc.clampf(dest.x, this.minx, this.maxx);
        dest.y = cc.clampf(dest.y, this.miny, this.maxy);

        this.node.position = this.node.parent.convertToNodeSpaceAR(dest);
    },
});
