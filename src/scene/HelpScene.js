(function(){
    HelpScene = cc.Scene.extend({
        ropeThrow: null,
        slider: null,

        ctor: function() {
            this._super();

            this.addChild(BackgroundFactory.newYellowBackground());

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

            this.ropeThrow = new RopeThrow(this);
            this.ropeThrow.disable();

            var sliderOptions = {};
            var slides = [
                {
                    text: i18n.getText('Swipe on your screen to try to catch the llama. The longer you swipe, the farther the rope goes.'),
                    button: i18n.getText('Watch Demo'),
                    callback: function(){
                        var finger = new cc.Sprite(res.Finger);
                        finger.setScale(0.5);
                        finger.setPosition(600, 200);
                        this.addChild(finger);
                        this.slider.hide();

                        var fingerAction = cc.sequence(
                            cc.delayTime(1),
                            cc.moveTo(0.3, 600, 930),
                            cc.callFunc(function(){
                                this.ropeThrow.enable();
                                this.ropeThrow.moveRope(new cc.Point(540, 930));

                                this.runAction(cc.sequence(
                                    cc.delayTime(3),
                                    cc.callFunc(function(){
                                        this.removeChild(finger);
                                        this.slider.next();
                                    }, this)
                                ));
                            }, this)
                        )
                        finger.runAction(fingerAction);
                    }.bind(this)
                },{
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultrices mattis viverra. Morbi commodo neque nec facilisis euismod. '
                }
            ];
            this.slider = new Slider(this, slides, sliderOptions);
        }
    });
})();