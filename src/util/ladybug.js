ladybug = {

    util: {},

    init: function() {
        ladybug.util.i18n = new ladybug.util.I18n(cc.loader.getRes(I18N_PATH), LANG);
        // Export convenient method to global namespace.
        i18n = ladybug.util.i18n;
    }
};
