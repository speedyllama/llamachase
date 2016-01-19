(function(){
    RopeThrow = cc.Class.extend({
        layer: null,

        // Called when the rope reached the destination.
        // Returns false to continue retrieving the rope,
        // true means if it handled.
        catchCallback: null,

        // Callback return
        isCaught: false,

        anchorPos: null,
        beginPos: null,
        endPos: null,
        rope: null,
        ropeMoving: false,
        ropeSpeed: null,

        ctor: function(layer) {
            this.layer = layer;

            this.anchorPos = new cc.Point(512, 256);
            var rope = new cc.Sprite('res/rope.png');
            this.rope = rope;
            rope.x = this.anchorPos.x;
            rope.y = this.anchorPos.y;
            this.layer.addChild(rope);

            if ('touches' in cc.sys.capabilities) {
                cc.eventManager.addListener({
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    onTouchBegan: this.onTouchBegan.bind(this),
                    onTouchEnded: this.onTouchEnded.bind(this)
                }, layer);
            } else if ('mouse' in cc.sys.capabilities) {
                cc.eventManager.addListener({
                    event: cc.EventListener.MOUSE,
                    onMouseDown: this.onTouchBegan.bind(this),
                    onMouseUp: this.onTouchEnded.bind(this)
                }, layer);
            }
        },

        onTouchBegan: function(touch) {
            if (this.ropeMoving) {
                return false;
            }
            this.beginPos = touch.getLocation();
            return true;
        },

        onTouchEnded: function(touch) {
            if (this.ropeMoving) {
                return false;
            }
            this.endPos = touch.getLocation();
            var line = new cc.DrawNode();
            line.drawSegment(this.beginPos, this.endPos, 10, new cc.Color(0, 255, 0));
            this.moveRope();
            this.layer.addChild(line);
            return true;
        },

        moveRope: function() {
            this.ropeMoving = true;
            var action = cc.sequence(
                cc.moveTo(1, this.endPos),
                cc.callFunc(function(){
                    if (typeof this.catchCallback == 'function') {
                        this.isCaught = this.catchCallback.call(this);
                        if (this.isCaught) {
                            this.rope.stopAllActions();
                            this.ropeMoving = false;
                        }
                    }
                }.bind(this)),
                cc.moveTo(1, this.anchorPos),
                cc.callFunc(function(){
                    this.ropeMoving = false;
                }.bind(this))
            );
            this.rope.runAction(action);
        }
    });
})();
