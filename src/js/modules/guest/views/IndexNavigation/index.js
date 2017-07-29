import template from './index.hbs';

export default Mn.View.extend({
    
    template,

    events: {
        'click #nav-sign-up': 'onSignUp',
        'click #nav-log-ig': 'onLogIn'
    },


    onSignUp() {
        Backbone.history.navigate('signup',{trigger:true});
    },

    onLogIn() {
        Backbone.history.navigate('login',{trigger:true});
    }

});