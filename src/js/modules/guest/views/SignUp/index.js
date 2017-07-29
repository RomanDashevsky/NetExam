import template from './index.hbs';

export default Mn.View.extend({

    template,

    ui: {
        student: '#studentSignUp',
        teacher: '#teacherSignUp'
    },

    events: {
        'click @ui.student': 'studentSignUp',
        'click @ui.teacher': 'teacherSignUp'
    },

    studentSignUp() {
        Backbone.history.navigate('signup/student',{trigger:true});
    },

    teacherSignUp() {
        Backbone.history.navigate('signup/teacher',{trigger:true});
    }

});