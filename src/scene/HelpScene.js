(function(){
    HelpScene = cc.Scene.extend({
        llama: null,
        ropeThrow: null,
        slider: null,

        ctor: function() {
            this._super();

            this.addChild(BackgroundFactory.newYellowBackground());

            this.llama = new Llama(this);
            this.llama.enter();
            this.llama.jump();

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
                                        this.ropeThrow.disable();
                                        this.slider.next();
                                    }, this)
                                ));
                            }, this)
                        )
                        finger.runAction(fingerAction);
                    }.bind(this)
                },{
                    text: i18n.getText('You can swipe to a different direction as well. But, don\'t swipe too much, or the rope will be out of the screen.'),
                    button: i18n.getText('Watch Demo'),
                    callback: function() {
                        var finger = new cc.Sprite(res.Finger);
                        finger.setScale(0.5);
                        finger.setPosition(600, 200);
                        this.addChild(finger);
                        this.slider.hide();

                        var fingerAction = cc.sequence(
                            cc.delayTime(1),
                            cc.moveTo(0.3, 800, 930),
                            cc.callFunc(function(){
                                this.ropeThrow.enable();
                                this.ropeThrow.moveRope(new cc.Point(640, 930));

                                this.runAction(cc.sequence(
                                    cc.delayTime(3),
                                    cc.callFunc(function(){
                                        this.ropeThrow.disable();
                                        this.slider.next();
                                    }, this)
                                ));
                            }, this)
                        )
                        finger.runAction(fingerAction);
                    }.bind(this)
                }
            ];
            this.slider = new Slider(this, slides, sliderOptions);
        }
    });
})();