import template from './index.hbs';

const sessionChannel = Radio.channel('session');

export default Mn.View.extend({

    template,

    events: {
        'click #menu-exams': 'onExams',
        'click #menu-student': 'onExamStudents',
        'click #menu-addExams': 'onAddExam',
        'click #menu-IncompleteExams': 'onIncompleteExams',
        'click #menu-user': 'onUser',
        'click #menu-log-out': 'onLogOut'
    },

    onRender: function () {
        const userName = this.gerUserName();
        this.$el.html(this.template({UserName: userName}));
        return this;
    },

    onExams: function () {
        Backbone.history.navigate('teacher/exams', {trigger: true});
    },

    onExamStudents: function () {
        Backbone.history.navigate('teacher/students', {trigger: true});
    },

    onAddExam: function () {
        Backbone.history.navigate('teacher/add-exam', {trigger: true});
    },

    onIncompleteExams: function () {
        Backbone.history.navigate('teacher/incomplete-exams', {trigger: true});
    },

    onUser: function () {
        Backbone.history.navigate('teacher/', {trigger: true});
    },

    onLogOut: function () {
        sessionChannel.request('session:delete');
        Backbone.history.navigate('', {trigger: true});
    },

    gerUserName: function () {
        return sessionChannel.request('session:get:fullUserName');
    }
    
});
