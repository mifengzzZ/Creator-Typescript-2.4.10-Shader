// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class FlashSpine extends cc.Component {

    duration: number = 1.0;
    _median: number = 0;
    _time: number = 0;
    _flash: boolean = false;
    _count: number = 0;

    _material: cc.Material = null!;
    _skeleton: sp.Skeleton = null!;

    start () {
        this._skeleton = this.node.getComponent(sp.Skeleton);
        this._material = this._skeleton.getMaterial(0);
        this._material.setProperty("u_rate", 1.0);
    }

    protected update(dt: number): void {
        if (!this._flash) return;
        console.log("this._time : ", this._time);
        this._material.setProperty("u_rate", this._time);
    }

    clickFlash() {
        this._flash = true;
        this._time = this.duration;
        let that: FlashSpine = this;
        cc.tween(that).to(0.1, {_time: 0}).to(0.1, {_time: 1}).call(() => {
            this._flash = false;
        }).start();

    }

}
