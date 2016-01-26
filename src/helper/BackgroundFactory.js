(function(){
    BackgroundFactory = {
        newYellowBackground: function() {
            return new cc.LayerGradient(new cc.Color(203, 204, 0), new cc.Color(152, 153, 0));
        },
        newGreyAlphaBackground: function() {
            return new cc.LayerColor(new cc.Color(0, 0, 0, 125));
        }
    };
})();