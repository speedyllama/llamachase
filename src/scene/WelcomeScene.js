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

            //cc.MenuItemFont.setFontName(i18n.getText('Marck Script'));
            cc.MenuItemFont.setFontName(res.MarckScript);
            cc.MenuItemFont.setFontSize(164);
            var help = new cc.MenuItemFont(i18n.getText('Help'), function(){cc.director.runScene(new cc.TransitionFade(1, new HelpScene()))});
            var play = new cc.MenuItemFont(i18n.getText('Play'), function(){cc.director.runScene(new PlayScene())});
            var about = new cc.MenuItemFont(i18n.getText('About'), function(){cc.director.runScene(new AboutScene())});
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
            this.addChild(BackgroundFactory.newYellowBackground());
            this.addChild(new LlamaLayer());
            this.addChild(new MenuLayer());
        }
    });
})();