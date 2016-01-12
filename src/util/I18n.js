(function(){
    var I18n = cc.Class.extend({
        map: null,
        defaultLang: null,

        ctor: function(text, defaultLang) {
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

            if (defaultLang !== undefined) {
                this.defaultLang = defaultLang;
            }
        },

        setDefaultLang: function(defaultLang) {
            this.defaultLang = defaultLang;
        },

        getDefaultLang: function() {
            return this.defaultLang;
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
        },

        getText: function(key) {
            return this.getText(this.defaultLang, key);
        }
    });

    ladybug.util.I18n = I18n;
})();