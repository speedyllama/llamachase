(function(){
    const FONT = "Arial";
    const FONT_SIZE = 96;
    const POS_X = 256;
    const POS_Y = 256;

    var totalTime = 0;

    function displayTime() {
        var time = ((new Date() - this.lastStartTime) / 1000 + Number(totalTime)).toFixed(2);
        return time;
    }

    Timer = cc.Layer.extend({
        layer: null,
        clock: null,
        lastStartTime: null,

        ctor: function(reset) {
            this._super();

            if (reset == true) {
                totalTime = 0;
            }
            this.clock = new cc.LabelTTF(totalTime, FONT, FONT_SIZE, undefined, cc.TEXT_ALIGNMENT_CENTER);
            this.clock.setPosition(POS_X, POS_Y);
            this.addChild(this.clock);
        },

        update: function() {
            var time = displayTime.call(this);
            this.clock.setString(time);
        },

        start: function() {
            this.lastStartTime = new Date();
            this.scheduleUpdate();
        },

        stop: function() {
            this.unscheduleUpdate();
            totalTime += displayTime.call(this);
            this.lastStartTime = null;
        }
    });
})();