import template from './index.hbs';

const teacherDataChannel = Radio.channel('teacherData');

export default Mn.View.extend({

    template,

    events: {
        'click #editExamStatus': 'editExamStatus',
        'click #addQuestion': 'addQuestion',
        'click .deleteQuestion': 'deleteQuestion',
        'click .question': 'editQuestion'
    },

    initialize: function (options) {
        this.exam = options.exam;
        this.questions = teacherDataChannel.request('teacherData:get:questions', this.exam.attributes.id);
        this.listenTo(this.questions, 'all', this.onRender, this);
    },

    onRender: function () {
        this.$el.html(this.template({exam: this.exam.attributes, questions: this.questions.slice()}));
        return this;
    },

    addQuestion: function () {
        Backbone.history.navigate('teacher/edit/' + this.exam.attributes.id + '/add', {trigger: true});
    },

    deleteQuestion: function (event) {

        event.preventDefault();
        event.stopPropagation();

        const id = event.currentTarget.attributes['data-id'].value;

        const isSave = teacherDataChannel.request('teacherData:question:delete', this.questions, id);

        if(isSave){
            this.onRender();
        }

    },

    editQuestion: function (event) {
        event.stopPropagation();
        const id = $(event.currentTarget).find('.idAttr').html();
        Backbone.history.navigate('teacher/edit/' + this.exam.attributes.id + '/question/' + id, {trigger: true});
    },

    editExamStatus: function () {
        Backbone.history.navigate('teacher/edit/' + this.exam.attributes.id + '/state', {trigger: true});
    }

});
