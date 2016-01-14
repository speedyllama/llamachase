(function(){
    HelpScene = cc.Scene.extend({
        ropeThrow: null,

        ctor: function() {
            this._super();

            this.ropeThrow = new RopeThrow(this);
        }
    });
})();