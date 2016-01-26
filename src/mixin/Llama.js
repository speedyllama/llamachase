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
            duration = duration ? duration : 0.5;
            x = x !== undefined ? x : 540;
            y = y !== undefined ? y : 1600;

            this.llama.x = -x;
            this.llama.y = y;

            var move = cc.moveTo(duration, x, y);
            this.llama.runAction(move);
        },

        jump: function() {
            this.jumpAction = cc.repeatForever(cc.sequence(
                cc.rotateTo(0.3, -15, 0),
                cc.rotateTo(0.3, 15, 0)
            ));
            this.llama.runAction(this.jumpAction);
        },

        stopJump: function() {
            if (typeof this.jumpAction == 'function') {
                this.llama.stopAction(this.jumpAction);
            }
        }
    });
})();