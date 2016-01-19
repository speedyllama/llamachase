(function(){
    HelpScene = cc.Scene.extend({
        ropeThrow: null,

        ctor: function() {
            this._super();

            this.addChild(BackgroundFactory.newYellowBackground());
            this.ropeThrow = new RopeThrow(this);
        }
    });
})();