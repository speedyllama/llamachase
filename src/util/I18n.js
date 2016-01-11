(function(){
    var I18N_PATH = 'res/i18n.txt';
    var I18n = cc.Class.extend({
        map: null,

        ctor: function() {
            var text = cc.loader.getRes(I18N_PATH);
            var lines = text.split('\n');
            for (var lineNum = 0; lineNum < lines.length; lineNum++) {
                var line = lines[lineNum];
                console.log(lineNum + ' : ' + line);
            }
        }
    });

    ladybug.util.I18n = I18n;
})();