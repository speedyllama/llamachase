(function(){
    var cityCounter = 0;
    // {name, intro, action: function(llama, layer)
    var cities = [
        {
            name: "New York",
            intro: "New York Intro",
            action: ForthAndBackActionFactory.newAction(undefined, undefined, 1, 1)
        },
        {
            name: "Shanghai",
            intro: "Shanghai Intro",
            action: ForthAndBackActionFactory.newAction(undefined, undefined, 0.5, 1)
        }
    ];

    PlayScene = cc.Scene.extend({
        slider: null,
        city: null,
        llama: null,
        ropeThrow: null,
        timer: null,

        ctor: function() {
            this._super();
            this.city = cities[cityCounter++];

            this.addChild(BackgroundFactory.newYellowBackground());

            this.timer = new Timer();
            this.addChild(this.timer);

            var slides = [
                {
                    text: i18n.getText(this.city.intro),
                    button: i18n.getText('OK'),
                    callback: function(){
                        this.llama = new Llama(this);
                        this.llama.enter(0, 200, 1600);
                        this.llama.jump();

                        this.city.action.call(this, this.llama.llama);

                        this.ropeThrow = new RopeThrow(this);
                        this.ropeThrow.setCatchCallback(function(pos){
                            var isCaught = this.llama.ropeCallback(pos);
                            if (isCaught) {
                                this.runAction(cc.sequence(
                                    cc.delayTime(LLAMA_CAUGHT_DELAY),
                                    cc.callFunc(function(){
                                        this.ropeThrow.reset();
                                        this.nextCity();
                                        this.timer.stop();
                                    }, this)
                                ));
                            }
                            return isCaught;
                        }, this);

                        this.timer.start();
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