(function(){
    var I18N_PATH = 'res/i18n.txt';
    var I18n = cc.Class.extend({
        ctor: function() {
            var text = cc.loader.getRes(I18N_PATH);
            console.log('####' + text);
        }
    });

    ladybug.util.I18n = I18n;
})();