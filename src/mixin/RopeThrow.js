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
        targetPos: null,
        rope: null,
        ropeMoving: false,
        ropeLength: null,

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

            var winSize = cc.director.getWinSize();
            var beginY = this.beginPos.y;
            var beginYThreshold = winSize.height * ROPE_BEGIN_POS_THRESHOLD;
            if (beginY > beginYThreshold) {
                return false;
            }

            this.endPos = touch.getLocation();

            if (this.endPos.y < this.beginPos.y) {
                return false;
            }

            var lineLength = Math.sqrt(Math.pow(this.beginPos.x - this.endPos.x, 2) +
                Math.pow(this.beginPos.y - this.endPos.y, 2));
            var linePercentage = lineLength / (winSize.height * ROPE_MAX_PERCENTAGE);
            linePercentage = Math.min(1, linePercentage);
            this.ropeLength = linePercentage * winSize.height;
            var ropePercentage = this.ropeLength / lineLength;
            this.targetPos = new cc.Point(
                (this.endPos.x - this.beginPos.x) * ropePercentage + this.anchorPos.x,
                (this.endPos.y - this.beginPos.y) * ropePercentage + this.anchorPos.y
            );

            this.moveRope();
            return true;
        },

        moveRope: function(targetPos) {
            if (targetPos!== undefined) {
                // Mock a touch
                this.onTouchBegan({
                    getLocation: function(){return this.anchorPos}.bind(this)
                });
                this.onTouchEnded({
                    getLocation: function(){return targetPos}
                });
                return;
            }

            this.ropeMoving = true;
            var action = cc.sequence(
                cc.moveTo(this.ropeLength / ROPE_SPEED, this.targetPos).easing(cc.easeBackIn()),
                cc.callFunc(function(){
                    if (typeof this.catchCallback == 'function') {
                        this.isCaught = this.catchCallback.call(this);
                        if (this.isCaught) {
                            this.rope.stopAllActions();
                            this.ropeMoving = false;
                        }
                    }
                }.bind(this)),
                cc.delayTime(ROPE_WAIT),
                cc.moveTo(this.ropeLength / ROPE_RETRIEVE_SPEED, this.anchorPos),
                cc.callFunc(function(){
                    this.ropeMoving = false;
                }.bind(this))
            );
            this.rope.runAction(action);
        }
    });
})();
