var WelcomeScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        this.addChild(new cc.LayerGradient(new cc.Color(203, 204, 0), new cc.Color(152, 153, 0)));
    }
});