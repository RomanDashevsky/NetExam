import template from './index.hbs';

const configChannel = Radio.channel('config');
const teacherDataChannel = Radio.channel('teacherData');

export default Mn.View.extend({

    template,

    events: {
        'click #examReady': 'onExamReady'
    },

    initialize: function (options) {
        this.model = options.model;
        this.questions = options.questions;
    },

    onRender: function () {

        const minQuestionsCountPerExam = configChannel.request('config:get:minQuestionsCountPerExam');
        const minTime = configChannel.request('config:get:minTime');

        this.$el.html(this.template({
            questions: this.questions.slice(),
            minTime: minTime,
            minQuestionsCountPerExam: minQuestionsCountPerExam
        }));

        return this;

    },

    onExamReady: function (event) {

        event.preventDefault();

        if (document.getElementById('#errorStatus') != null) {
            return;
        }

        this.model.set('questionsCountPerExam', $('#questionsCountPerExamInput')[0].value);
        this.model.set('timeInMinutes', $('#timeInMinutesInput')[0].value);

        const isSave = teacherDataChannel.request('teacherData:set:examState', this.model);

        if(isSave){
            Backbone.history.navigate('teacher/incomplete-exams', {trigger: true});
        }
        
    }

});
