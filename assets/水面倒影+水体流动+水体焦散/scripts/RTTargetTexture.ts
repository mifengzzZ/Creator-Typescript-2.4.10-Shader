// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class RTTargetTexture extends cc.Component {

    @property(cc.Node)
    rtCameraNode: cc.Node = null;

    @property(cc.Node)
    landRenderer: cc.Node = null;
    
    private _camera: cc.Camera = null;

    private _renderTexture: cc.RenderTexture = null;

    start() {
        this._camera = this.rtCameraNode.getComponent(cc.Camera);
        this._renderTexture = new cc.RenderTexture();
        this._renderTexture.initWithSize(1280, 720);
        this._camera.targetTexture = this._renderTexture;
        this._camera.render();
        this.node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this._renderTexture);
        this.landRenderer.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this._renderTexture);
    }

    protected onDestroy(): void {
        this._renderTexture.destroy();
        this._renderTexture = null;
    }

}
