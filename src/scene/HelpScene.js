(function(){
    HelpScene = cc.Scene.extend({
        ropeThrow: null,

        ctor: function() {
            this._super();

            this.addChild(BackgroundFactory.newYellowBackground());
            this.ropeThrow = new RopeThrow(this);
            this.ropeThrow.moveRope(new cc.Point(300, 1000));

            var llama = new cc.Sprite(res.SpeedyLlama);
            llama.setScale(0.5, 0.5);
            llama.x = -512;
            llama.y = 1600;

            var move = cc.moveTo(0.5, 540, 1600);
            var jump = cc.repeatForever(cc.sequence(
                cc.rotateTo(0.3, -15, 0),
                cc.rotateTo(0.3, 15, 0)
            ));

            this.addChild(llama);
            llama.runAction(move);
            llama.runAction(jump);
        }
    });
})();