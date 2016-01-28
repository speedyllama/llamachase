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

            function newFingerFunction(destX, destY, llamaX, llamaY) {
                return function() {
                    this.llama.jump();
                    if (llamaX !== undefined && llamaY !== undefined) {
                        this.llama.llama.runAction(
                            cc.moveTo(0.2, new cc.Point(llamaX, llamaY))
                        );
                    }

                    var finger = new cc.Sprite(res.Finger);
                    finger.setScale(0.5);
                    finger.setPosition(600, 200);
                    this.addChild(finger);
                    this.slider.hide();

                    var fingerAction = cc.sequence(
                        cc.delayTime(0.6),
                        cc.moveTo(0.3, destX, destY),
                        cc.callFunc(function(){
                            this.ropeThrow.enable();
                            this.ropeThrow.setCatchCallback(this.llama.ropeCallback, this.llama);
                            this.ropeThrow.moveRope(new cc.Point(destX, destY));
                            this.ropeThrow.disable();

                            this.runAction(cc.sequence(
                                cc.delayTime(2),
                                cc.callFunc(function(){
                                    this.ropeThrow.reset();
                                    this.removeChild(finger);
                                    this.slider.next();
                                }, this)
                            ));
                        }, this)
                    )
                    finger.runAction(fingerAction);
                    return true;
                }
            }

            function tryStaticLlama() {
                this.slider.hide();
                this.llama.jump();
                this.ropeThrow.setCatchCallback(function(pos){
                    var isCaught = this.llama.ropeCallback(pos);
                    if (isCaught) {
                        this.slider.next();
                    }
                    return isCaught;
                }, this);
                this.llama.llama.runAction(
                    cc.moveTo(0.2, new cc.Point(200, 1600))
                );
                setTimeout(function(){this.ropeThrow.enable();}.bind(this), 0.5);
            }

            var slides = [
                {
                    text: i18n.getText('Swipe on your screen to try to catch the llama. The longer you swipe, the farther the rope goes.'),
                    button: i18n.getText('Watch Demo'),
                    callback: newFingerFunction(540, 930).bind(this)
                },{
                    text: i18n.getText('You can swipe to a different direction as well. But, don\'t swipe too much, or the rope will be out of the screen.'),
                    button: i18n.getText('Watch Demo'),
                    callback: newFingerFunction(650, 730, 800, 1200).bind(this)
                },{
                    text: i18n.getText('Now try it yourself.'),
                    button: i18n.getText('OK!'),
                    callback: tryStaticLlama.bind(this)
                },{
                    text: i18n.getText('Great! Now try to catch a running llama.'),
                    button: i18n.getText('OK!'),
                    callback: tryStaticLlama.bind(this)
                }
            ];
            this.slider = new Slider(this, slides, sliderOptions);
        }
    });
})();