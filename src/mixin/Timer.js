(function(){
    const FONT = "Arial";
    const FONT_SIZE = 96;
    const POS_X = 256;
    const POS_Y = 256;

    var totalTime = 0;

    function calculateTime() {
        var time = (new Date() - this.lastStartTime) / 1000 + totalTime;
        return time;
    }

    function displayTime(time) {
        if (time == undefined) {
            time = calculateTime.call(this);
        }
        return time.toFixed(2);
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
            this.clock = new cc.LabelTTF(displayTime(totalTime), FONT, FONT_SIZE, undefined, cc.TEXT_ALIGNMENT_CENTER);
            this.clock.setPosition(POS_X, POS_Y);
            this.addChild(this.clock);
        },

        update: function() {
            var timeStr = displayTime.call(this);
            this.clock.setString(timeStr);
        },

        start: function() {
            this.lastStartTime = new Date();
            this.scheduleUpdate();
        },

        stop: function() {
            totalTime = calculateTime.call(this);
            this.unscheduleUpdate();
            this.clock.setString(displayTime(totalTime));
            this.lastStartTime = null;
        }
    });
})();