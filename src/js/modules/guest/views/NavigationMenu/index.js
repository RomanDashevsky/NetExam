import template from './index.hbs';

export default Mn.View.extend({
    
    template,

    events: {
        'click #menu-user': 'onUser',
        'click #menu-sign-up': 'onSignUp',
        'click #menu-log-ig': 'onLogIn'
    },

    onUser() {
        Backbone.history.navigate('',{trigger:true});
    },

    onSignUp() {
        Backbone.history.navigate('signup',{trigger:true});
    },

    onLogIn() {
        Backbone.history.navigate('login',{trigger:true});
    }

});