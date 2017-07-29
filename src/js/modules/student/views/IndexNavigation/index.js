import template from './index.hbs';

export default Mn.View.extend({

    template,

    events: {
        'click #nav-exams': 'onExams',
        'click #nav-result': 'onResult'
    },


    onExams: function () {
        Backbone.history.navigate('student/exams', {trigger: true});
    },

    onResult: function () {
        Backbone.history.navigate('student/solutions', {trigger: true});
    }

});
