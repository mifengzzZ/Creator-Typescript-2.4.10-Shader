// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class RoleControl extends cc.Component {

    @property(cc.Node)
    leftNode: cc.Node = null;
    @property(cc.Node)
    rightNode: cc.Node = null;

    @property(cc.Node)
    rtCameraNode: cc.Node = null;

    @property(cc.Node)
    roleNode: cc.Node = null;

    private _dirction: number = 0;

    start () {
        this.leftNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.leftNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.rightNode.on(cc.Node.EventType.TOUCH_START, this.onRTouchStart, this);
        this.rightNode.on(cc.Node.EventType.TOUCH_END, this.onRTouchEnd, this);

        console.log(this.roleNode.x);
    }

    onTouchStart() {
        console.log("onTouchStart");
        this._dirction = -1;
        this.roleNode.scaleX = 1;
        this.roleNode.getComponent(sp.Skeleton).animation = "run";
    }

    onTouchEnd() {
        console.log("onTouchEnd");
        this._dirction = 0;
        this.roleNode.getComponent(sp.Skeleton).animation = "idle";
    }

    onRTouchStart() {
        console.log("onRTouchStart");
        this._dirction = 1;
        this.roleNode.scaleX = -1;
        this.roleNode.getComponent(sp.Skeleton).animation = "run";
        
    }

    onRTouchEnd() {
        console.log("onRTouchEnd");
        this._dirction = 0;
        this.roleNode.getComponent(sp.Skeleton).animation = "idle";
    }

    protected update(dt: number): void {

        if (this._dirction === 1) {
            this.rtCameraNode.x += 8;
        } else if (this._dirction === -1) {
            this.rtCameraNode.x -= 8;
        }

        this.roleNode.x = this.rtCameraNode.x;

    }
}
