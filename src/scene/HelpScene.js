(function(){
    HelpScene = cc.Scene.extend({
        ropeThrow: null,

        ctor: function() {
            this._super();

            this.addChild(BackgroundFactory.newYellowBackground());
            this.ropeThrow = new RopeThrow(this);
            this.ropeThrow.moveRope(new cc.Point(300, 1000));
        }
    });
})();