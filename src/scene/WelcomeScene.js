(function() {
    var LlamaLayer = cc.Layer.extend({
        ctor: function() {
            this._super();

            var llama = new cc.Sprite(res.SpeedyLlama);
            llama.setScale(0.5, 0.5);
            llama.x = -512;
            llama.y = 1600;

            var action = cc.moveTo(0.5, 540, 1600);

            this.addChild(llama);
            llama.runAction(action);
        }
    });

    var MenuLayer = cc.Layer.extend({
        ctor: function() {
            this._super();

            cc.MenuItemFont.setFontName('Marck Script');
            cc.MenuItemFont.setFontSize(164);
            var help = new cc.MenuItemFont('Help');
            var play = new cc.MenuItemFont('Play');
            var about = new cc.MenuItemFont('About');
            var menu = new cc.Menu(help, play, about);
            menu.alignItemsVertically();
            menu.x = 512;
            menu.y = 700;
            this.addChild(menu);
        }
    });

    WelcomeScene = cc.Scene.extend({
        onEnter: function () {
            this._super();
            this.addChild(new cc.LayerGradient(new cc.Color(203, 204, 0), new cc.Color(152, 153, 0)));
            this.addChild(new LlamaLayer());
            this.addChild(new MenuLayer());
        }
    });
})();