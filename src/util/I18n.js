(function(){
    var I18N_PATH = 'res/i18n.txt';
    var I18n = cc.Class.extend({
        map: null,

        ctor: function() {
            var text = cc.loader.getRes(I18N_PATH);
            var lines = text.split('\n');
            var languageKeys;
            var map = {};
            for (var lineNum = 0; lineNum < lines.length; lineNum++) {
                var line = lines[lineNum];
                var keys = line.split('\t');
                if (lineNum == 0) {
                    languageKeys = keys;
                    for (var languageIndex = 1; languageIndex < languageKeys.length; languageIndex++) {
                        map[languageKeys[languageIndex]] = {};
                    }
                } else {
                    for (var languageIndex = 1; languageIndex < languageKeys.length; languageIndex++) {
                        map[languageKeys[languageIndex]][keys[0]] = keys[languageIndex];
                    }
                }
            }
            this.map = map;
        }
    });

    ladybug.util.I18n = I18n;
})();