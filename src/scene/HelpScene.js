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
            this.ropeThrow.moveRope(new cc.Point(300, 1000));

            var sliderOptions = {};
            var slides = [
                {
                    text: 'Text 1',
                    button: 'button 1'
                },{
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultrices mattis viverra. Morbi commodo neque nec facilisis euismod. Pellentesque dictum sagittis lacinia. Aliquam vestibulum maximus mi, eget ornare nisi. Praesent tempus tempor viverra. Proin eget nibh mauris. Praesent a dui vulputate, eleifend dui eget, volutpat dolor. '
                }
            ];
            this.slider = new Slider(this, slides, sliderOptions);
        }
    });
})();