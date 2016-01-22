(function(){
    Slider = cc.Class.extend({
        layer: null,
        // {text: string, button: string, callback: function}
        slides: null,
        currentSlideLayer: null,
        page: -1,

        ctor: function(layer, slides) {
            this.layer = layer;
            this.slides = slides;

        }
    });
})();