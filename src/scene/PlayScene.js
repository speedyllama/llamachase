(function(){
    var cityCounter = 0;
    var cities = [
        {
            name: "New York",
            intro: "New York Intro",
            action: cc.repeatForever(
                cc.sequence(
                    cc.moveTo(2, new cc.Point(880, 1600)),
                    cc.scaleBy(0.5, -1, 1),
                    cc.moveTo(2, new cc.Point(200, 1600)),
                    cc.scaleBy(0.5, -1, 1)
                )
            )
        },
        {
            name: "Shanghai",
            intro: "Shanghai Intro",
            action: cc.repeatForever(
                cc.sequence(
                    cc.moveTo(2, new cc.Point(880, 1600)),
                    cc.scaleBy(0.5, -1, 1),
                    cc.moveTo(2, new cc.Point(200, 1600)),
                    cc.scaleBy(0.5, -1, 1)
                )
            )
        }
    ];

    PlayScene = cc.Scene.extend({
        slider: null,
        city: null,
        llama: null,
        ropeThrow: null,

        ctor: function() {
            this._super();
            this.city = cities[cityCounter++];

            this.addChild(BackgroundFactory.newYellowBackground());
            var slides = [
                {
                    text: i18n.getText(this.city.intro),
                    button: i18n.getText('OK'),
                    callback: function(){
                        this.llama = new Llama(this);
                        this.llama.enter(0, 200, 1600);
                        this.llama.jump();

                        this.llama.llama.runAction(this.city.action);

                        this.ropeThrow = new RopeThrow(this);
                        this.ropeThrow.setCatchCallback(function(pos){
                            var isCaught = this.llama.ropeCallback(pos);
                            if (isCaught) {
                                this.runAction(cc.sequence(
                                    cc.delayTime(LLAMA_CAUGHT_DELAY),
                                    cc.callFunc(function(){
                                        this.ropeThrow.reset();
                                        this.nextCity();
                                    }, this)
                                ));
                            }
                            return isCaught;
                        }, this);

                        this.slider.hide();
                    }.bind(this)
                }
            ];
            this.slider = new Slider(this, slides, {});
        },

        nextCity: function() {
            if (cityCounter >= cities.length) {
                // TODO: go to success scene
                cc.director.runScene(new WelcomeScene());
            } else {
                cc.director.runScene(new PlayScene());
            }
        }
    });
})();