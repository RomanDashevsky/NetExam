import template from './index.hbs';

export default Mn.View.extend({

    template,

    events: {
        'click #nav-exams': 'onExams',
        'click #nav-addExams': 'onAddExam',
        'click #nav-incompleteExams': 'onIncompleteExams',
        'click #nav-student': 'onExamStudents',
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
    }

});
