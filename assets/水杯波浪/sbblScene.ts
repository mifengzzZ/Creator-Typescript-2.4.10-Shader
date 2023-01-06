// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

export enum Direction {
    Left = 1,
    Right
};

@ccclass
export default class sbblScene extends cc.Component {

    @property private _effect: cc.EffectAsset = null;
    @property({ type: cc.EffectAsset, tooltip: CC_DEV && 'Effect 资源', readonly: true })
    public get effect() { return this._effect; }
    public set effect(value: cc.EffectAsset) { this._effect = value; this.init(); }

    @property private _amplitude: number = 0.05;
    @property({ tooltip: CC_DEV && '振幅（节点高度比例）' })
    public get amplitude() { return this._amplitude; }
    public set amplitude(value: number) { this._amplitude = value; this.updateProperties(); }

    @property private _angularVelocity: number = 10;
    @property({ tooltip: CC_DEV && '角速度' })
    public get angularVelocity() { return this._angularVelocity; }
    public set angularVelocity(value: number) { this._angularVelocity = value; this.updateProperties(); }

    @property private _frequency: number = 10;
    @property({ tooltip: CC_DEV && '频率' })
    public get frequency() { return this._frequency; }
    public set frequency(value: number) { this._frequency = value; this.updateProperties(); }

    @property private _height: number = 0.5;
    @property({ tooltip: CC_DEV && '顶端高度（节点高度比例）' })
    public get height() { return this._height; }
    public set height(value: number) { this._height = value; this.updateProperties(); }

    @property private _direction: Direction = Direction.Left;
    @property({ type: cc.Enum(Direction), tooltip: CC_DEV && '波浪方向' })
    public get direction() { return this._direction; }
    public set direction(value: Direction) { this._direction = value; this.updateProperties(); }


    private sprite: cc.Sprite = null;

    private material: cc.Material = null;
    
    onLoad () {
        this.init();
    }

    start () {
        this.init();
    }
    
    public init() {
        this.sprite = this.node.getComponent(cc.Sprite);
        // 关闭合批
        if (this.sprite.spriteFrame) this.sprite.spriteFrame.getTexture().packable = false;
        this.material = cc.Material.create(this._effect);
        this.sprite.setMaterial(0, this.material);
        this.updateProperties();
    }

    public updateProperties() {
        if (!this.effect) return cc.warn('[SineWave]', '请指定 Effect 资源！');
        this.material.setProperty('amplitude', this._amplitude);
        this.material.setProperty('angularVelocity', this._angularVelocity);
        this.material.setProperty('frequency', this._frequency);
        this.material.setProperty('offset', ((1.0 - this._height) + this._amplitude));
        this.material.setProperty('toLeft', (this._direction === Direction.Left));
    }

}
