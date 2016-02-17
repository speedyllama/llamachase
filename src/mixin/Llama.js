(function(){
    Llama = cc.Class.extend({
        layer: null,
        llama: null,
        jumpAction: null,

        ctor: function(layer) {
            this.layer = layer;

            this.llama = new cc.Sprite(res.SpeedyLlama);
            this.llama.setScale(0.5, 0.5);
            this.layer.addChild(this.llama);
        },

        enter: function(duration, x, y) {
            duration = duration !== undefined ? duration : 0.5;
            x = x !== undefined ? x : 540;
            y = y !== undefined ? y : 1600;

            if (duration <= 0) {
                this.llama.x = x;
                this.llama.y = y;
            } else {
                this.llama.x = -x;
                this.llama.y = y;

                var move = cc.moveTo(duration, x, y);
                this.llama.runAction(move);
            }
        },

        jump: function() {
            this.jumpAction = cc.repeatForever(cc.sequence(
                cc.rotateTo(0.3, -15, 0),
                cc.rotateTo(0.3, 15, 0)
            ));
            this.llama.runAction(this.jumpAction);
        },

        stopJump: function() {
            if (this.jumpAction) {
                this.llama.stopAllActions();
                this.jumpAction = null;
            }
        },

        ropeCallback: function(ropePos) {
            // TODO: test. always caught.
            this.stopJump();
            return true;

            var distanceSquare = Math.pow((ropePos.x - this.llama.x), 2) +
                Math.pow((ropePos.y - this.llama.y), 2);
            if (distanceSquare > LLAMA_CAUGHT_THRESHOLD) {
                return false;
            }
            this.stopJump();
            return true;
        }
    });
})();