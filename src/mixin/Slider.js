(function(){
    Slider = cc.Class.extend({
        layer: null,
        // {text: string, button: string, callback: function}
        slides: null,
        options: null,
        position: null,
        width: null,
        font: null,
        fontSize: null,
        buttonFont: null,
        buttonFontSize: null,
        buttonPadding: null,
        currentSliderLayer: null,
        page: -1,

        ctor: function(layer, slides, options) {
            this.layer = layer;
            this.slides = slides;
            this.options = options || {};

            var winSize = cc.director.getWinSize();
            this.position = options.position || new cc.Point(winSize.width / 2, winSize.height / 2);
            this.width = options.width || winSize.width / 8 * 7;
            this.font = options.font || 'Arial';
            this.fontSize = options.fontSize || 72;
            this.buttonFont = options.buttonFont || 'Arial';
            this.buttonFontSize = options.buttonFontSize || 72;
            this.buttonPadding = options.buttonPadding || 72;

            if (this.layer) {
                this.next();
            }
        },

        next: function() {
            if (!this.layer) {
                return;
            }

            this.page++;

            if (this.currentSliderLayer) {
                this.layer.removeChild(this.currentSliderLayer, true);
            }

            if (this.page > this.slides.length - 1) {
                return;
            }

            var slide = this.slides[this.page];
            var buttonText = slide.buttonText || i18n.getText('Next');
            var callback = slide.callback || function(){this.next()}.bind(this);

            var textSprite = new cc.LabelTTF(slide.text, this.font, this.fontSize, cc.TEXT_ALIGNMENT_CENTER);
            textSprite.setPosition(this.position.x, this.position.y);

            cc.MenuItemFont.setFontName(i18n.getText(this.buttonFont));
            cc.MenuItemFont.setFontSize(this.buttonFontSize);
            var buttonSprite = new cc.MenuItemFont(i18n.getText(buttonText), callback);
            var menu = new cc.Menu(buttonSprite);
            //buttonSprite.setPosition(this.position.x, this.position.y + textSprite.height + this.buttonPadding);
            menu.setPosition(this.position.x, 1500);

            this.currentSliderLayer = new cc.Layer();
            this.currentSliderLayer.addChild(textSprite);
            this.currentSliderLayer.addChild(menu);

            this.layer.addChild(this.currentSliderLayer);
        }
    });
})();