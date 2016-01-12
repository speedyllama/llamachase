(function(){
    var I18N_PATH = 'res/i18n.txt';
    var I18n = cc.Class.extend({
        map: null,

        ctor: function() {
            var text = cc.loader.getRes(I18N_PATH);
            var lines = text.split('\n');
            var langKeys;
            var map = {};
            for (var lineNum = 0; lineNum < lines.length; lineNum++) {
                var line = lines[lineNum];
                var keys = line.split('\t');
                if (lineNum == 0) {
                    langKeys = keys;
                    for (var langIndex = 1; langIndex < langKeys.length; langIndex++) {
                        map[langKeys[langIndex]] = {};
                    }
                } else {
                    for (var langIndex = 1; langIndex < langKeys.length; langIndex++) {
                        map[langKeys[langIndex]][keys[0]] = keys[langIndex];
                    }
                }
            }
            this.map = map;
        },

        getText: function(lang, key) {
            var val;
            try {
                val = this.map[lang][key];
            } catch (e) {
                val = undefined;
            }

            if (val == undefined) {
                return key;
            } else {
                return val;
            }
        }
    });

    ladybug.util.I18n = I18n;
})();