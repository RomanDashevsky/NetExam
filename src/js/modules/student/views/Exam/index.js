import template from './index.hbs';
import QuestionView from './Question';
import TimerView from './Timer';

const layoutChannel = Radio.channel('layout');
const studentDataChannel = Radio.channel('studentData');

export default Mn.View.extend({

    template,

    regions: {
        question: '#questionWrapper',
        timer: '#timer'
    },

    events: {
        'click #previousQuestion': 'onPreviousQuestion',
        'click #nextQuestion': 'onNextQuestion',
        'click #sendAnswers': 'onSendAnswers'
    },

    initialize: function (options) {
        this.currentIndex = 0;
        this.questions = options.questions;
        this.exam = options.exam;
        this.currentExamData = options.currentExamData;
        this.solutions = options.solutions;
        this.time = this.getTimeForTimer();
        this.timer = studentDataChannel.request('studentData:get:timer');
        this.listenTo(this.timer, 'change:sendAnswers', this.sendAnswers, this);
    },

    getTimeForTimer: function () {

        let time = this.exam.get('timeInMinutes') * 60000;

        if (this.currentExamData) {
            const timeHasLeft = new Date() - new Date(this.currentExamData.beginTime);
            time -= timeHasLeft;
        }

        return Math.floor(time / 1000);

    },

    onRender: function () {

        const exam = this.exam.get('name');
        const questionsCountPerExam = this.exam.get('questionsCountPerExam');
        const time = this.time;

        this.$el.html(this.template({
            exam: exam,
            questionsCountPerExam: questionsCountPerExam,
            time: time
        }));

        this.showQuestionView();
        this.showTimerView();

        return this;

    },

    onPreviousQuestion: function (event) {
        event.preventDefault();
        if (this.currentIndex !== 0) {
            this.saveAnswer();
            --this.currentIndex;
            this.showQuestionView();
            this.setAnswer();
        }
    },

    onNextQuestion: function (event) {
        event.preventDefault();
        const maxIndex = this.questions.length - 1;

        if (this.currentIndex !== maxIndex) {
            this.saveAnswer();
            ++this.currentIndex;
            this.showQuestionView();
            this.setAnswer();
        }

    },

    saveAnswer: function () {

        const radioGroup = $('.answerRadio');
        let answerIndex = null;

        _.each(radioGroup, function (element, index) {
            if (element.checked) {
                answerIndex = index;
            }
        });

        if (answerIndex !== null) {
            this.questions.at(this.currentIndex).set('answer', answerIndex);
        }

    },

    setAnswer: function () {

        const radioGroup = $('.answerRadio');
        let answerIndex = this.questions.at(this.currentIndex).get('answer');

        if (answerIndex !== null) {
            _.each(radioGroup, function (element, index) {
                if (index === answerIndex) {
                    element.checked = true;
                    $('.circle')[answerIndex].classList.add('checkCircle');
                }
            });
        }

    },

    showView: function (region, view) {
        this.showChildView(region, view);
        view.delegateEvents();
    },

    showQuestionView: function () {

        const question = this.questions.at(this.currentIndex);
        const index = this.currentIndex;

        this.showView('question', new QuestionView({
            question: question,
            index: index
        }));

        $.material.init();

    },

    showTimerView: function () {

        const secDiff = this.time;
        const timer = this.timer;

        this.showView('timer', new TimerView({
            secDiff: secDiff,
            timer: timer
        }));

    },

    onSendAnswers: function (event) {
        event.preventDefault();
        this.SendAnswers(true);
    },

    SendAnswers: function (checkEmtyAnswer = false) {

        this.solutions.set('answers', []);
        const answers = this.solutions.get('answers');

        this.saveAnswer();
        this.questions.each((question) => answers.push(question.get('answer')));

        const emptyAnswer = _.find(answers, (answer)=>(answer===null));

        if(checkEmtyAnswer && emptyAnswer === null){
            layoutChannel.trigger('error:show', 'Есть вопросы без ответов, необходимо ответить на все вопросы!');
            return;
        }

        const idExam = '' + this.exam.get('id');

        studentDataChannel.trigger('studentData:save:solutions', idExam);
        Backbone.history.navigate('student/exams/' + idExam + '/solutions', {trigger: true});

    }

});