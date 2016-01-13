(function(){
    HelpScene = cc.Scene.extend({
        ctor: function() {
            this._super();

            if ('touches' in cc.sys.capabilities) {
                cc.eventManager.addListener({
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    onTouchBegan: this.onTouchBegan.bind(this),
                    onTouchEnded: this.onTouchEnded.bind(this)
                }, this);
            } else if ('mouse' in cc.sys.capabilities) {
                cc.eventManager.addListener({
                    event: cc.EventListener.MOUSE,
                    onMouseDown: this.onTouchBegan.bind(this),
                    onMouseUp: this.onTouchEnded.bind(this)
                }, this);
            }
        },

        beginPos: null,
        endPos: null,

        onTouchBegan: function(touch) {
            this.beginPos = touch.getLocation();
            return true;
        },

        onTouchEnded: function(touch) {
            this.endPos = touch.getLocation();
            var line = new cc.DrawNode();
            line.drawSegment(this.beginPos, this.endPos, 10, new cc.Color(255, 0, 0));
            this.addChild(line);
            return true;
        }
    });
})();