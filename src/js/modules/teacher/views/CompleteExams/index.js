import template from './index.hbs';

const teacherDataChannel = Radio.channel('teacherData');

export default Mn.View.extend({

    template,

    events: {
        'click .showExam': 'showExam',
        'click #showQuestions': 'showQuestions',
        'click #showStudents': 'showStudents'
    },

    initialize: function (options) {
        this.exams = teacherDataChannel.request('teacherData:get:exams');
        this.isStudentsURL = options.isStudentsURL;
        this.listenTo(this.exams, 'all', this.onRender, this);
        teacherDataChannel.trigger('teacherData:exams:fetch');
    },

    onRender: function () {

        const collection = teacherDataChannel.request('teacherData:get:completeExams');
        const showQuestionBtn = this.isStudentsURL;

        this.$el.html(this.template({
            collection: collection,
            showQuestionBtn: showQuestionBtn
        }));

        return this;

    },

    showExam: function (event) {

        event.stopPropagation();

        const id = $(event.currentTarget).find('.idAttr').html();

        if (this.isStudentsURL) {
            this.redirectStudent(id);
        } else {
            this.redirectQuestions(id);
        }

    },

    showQuestions: function (event) {
        event.preventDefault();
        event.stopPropagation();
        const id = event.currentTarget.attributes['data-id'].value;
        this.redirectQuestions(id);
    },

    showStudents: function (event) {
        event.preventDefault();
        event.stopPropagation();
        const id = event.currentTarget.attributes['data-id'].value;
        this.redirectStudent(id);
    },

    redirectStudent: function (id) {
        Backbone.history.navigate('teacher/students/' + id + '/students', {trigger: true});
    },

    redirectQuestions: function (id) {
        Backbone.history.navigate('teacher/exams/' + id + '/questions', {trigger: true});
    }

});
