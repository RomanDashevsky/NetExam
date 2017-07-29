import template from './index.hbs';

const sessionChannel = Radio.channel('session');

export default Mn.View.extend({

    template,

    regions:{
        navView:'.indexNav'
    },

    initialize: function(options) {
        this.indexNavigation = options.indexNavigation;
    },

    onRender: function() {
        const userName = this.gerUserName();
        this.$el.html(this.template({Name: userName}));
        this.showChildView('navView', this.indexNavigation);
    },

    gerUserName(){
        return sessionChannel.request('session:get:namePatronymic');
    }

});
