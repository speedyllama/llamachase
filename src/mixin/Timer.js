(function(){
    const FONT = "Arial";
    const FONT_SIZE = 96;
    const POS_X = 256;
    const POS_Y = 256;

    var totalTime = 0;

    Timer = cc.Layer.extend({
        layer: null,
        clock: null,
        lastStartTime: null,

        ctor: function(reset) {
            this._super();

            var initialTime = totalTime;
            if (reset == true) {
                initialTime = 0;
            }
            this.clock = new cc.LabelTTF(initialTime, FONT, FONT_SIZE, undefined, cc.TEXT_ALIGNMENT_CENTER);
            this.clock.setPosition(POS_X, POS_Y);
            this.addChild(this.clock);
        },

        update: function() {
            var time = ((new Date() - this.lastStartTime) / 1000).toFixed(2);
            this.clock.setString(time);
        },

        start: function() {
            this.lastStartTime = new Date();
            this.scheduleUpdate();
        },

        stop: function() {
            this.unscheduleUpdate();
            totalTime += ((new Date() - this.lastStartTime) / 1000);
            this.lastStartTime = null;
        }
    });
})();