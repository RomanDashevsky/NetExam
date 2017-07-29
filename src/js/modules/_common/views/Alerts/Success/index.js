import template from './index.hbs';

export default Mn.View.extend({

    template,

    initialize: function(options) {
        this.message = options.message;
    },

    render: function () {
        this.$el.html(this.template({Message: this.message}));
        return this;
    }

});