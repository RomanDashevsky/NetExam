import template from './index.hbs';

const sessionChannel = Radio.channel('session');

export default Mn.View.extend({

    template,

    events: {
        'click #menu-exams': 'onExams',
        'click #menu-result': 'onResult',
        'click #menu-user': 'onUser',
        'click #menu-log-out': 'onLogOut'
    },

    onRender: function () {
        const userName = this.gerUserName();
        this.$el.html(this.template({UserName: userName}));
        return this;
    },

    onExams: function () {
        Backbone.history.navigate('student/exams', {trigger: true});
    },

    onResult: function () {
        Backbone.history.navigate('student/solutions', {trigger: true});
    },

    onUser: function () {
        Backbone.history.navigate('student/', {trigger: true});
    },

    onLogOut: function () {
        sessionChannel.request('session:delete');
        Backbone.history.navigate('', {trigger: true});
    },

    gerUserName: function () {
        return sessionChannel.request('session:get:fullUserName');
    }

});
