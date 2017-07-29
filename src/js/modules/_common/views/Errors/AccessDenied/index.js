import template from './index.hbs';

export default Mn.View.extend({

    template,

    regions:{
        navView:'.indexNav'
    },

    initialize: function(options) {
        this.navView = options.navView;
    },

    onRender: function() {
        this.showChildView('navView', this.navView);
    }

});