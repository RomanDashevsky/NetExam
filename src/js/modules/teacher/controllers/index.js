import {
    NavigationMenu,
    EditExam,
    IndexPageView,
    IncompleteExams,
    CompleteExams,
    ShowExam,
    ShowStudents,
    AddExam,
    AddQuestion,
    EditQuestion,
    EditExamState,
    IndexNavigation
} from '../views';
import SessionType from '../../_common/models/sessionType';

const sessionTypeEnum = new SessionType();
const layoutChannel = Radio.channel('layout');
const sessionChannel = Radio.channel('session');
const teacherDataChannel = Radio.channel('teacherData');

export default Mn.Object.extend({

    indexTeacher: function () {
        this.showView(new IndexPageView({indexNavigation: new IndexNavigation()}));
    },

    getExams: function () {
        this.showView(new CompleteExams({isStudentsURL: false}));
    },

    getExamsQuestions: function () {

        const exam = teacherDataChannel.request('teacherData:get:examById',
            teacherDataChannel.request('teacherData:get:examId'));

        if (this.isExamComplete(exam)) {
            this.showView(new ShowExam({exam: exam}));
        }

    },

    getExamStudents: function () {
        this.showView(new CompleteExams({isStudentsURL: true}));
    },

    getStudents: function () {
        const idExam = teacherDataChannel.request('teacherData:get:examId');
        this.showView(new ShowStudents({idExam: idExam}));
    },

    addExam: function () {
        this.showView(new AddExam());
    },

    getIncompleteExams: function () {
        this.showView(new IncompleteExams());
    },

    editExam: function () {

        const exam = teacherDataChannel.request('teacherData:get:examById',
            teacherDataChannel.request('teacherData:get:examId'));

        if (this.isExamIncomplete(exam)) {
            this.showView(new EditExam({exam: exam}));
        }

    },

    addQuestion: function () {

        const idExam = teacherDataChannel.request('teacherData:get:examId');
        const exam = teacherDataChannel.request('teacherData:get:examById', idExam);

        if (this.isExamIncomplete(exam)) {
            const questions = teacherDataChannel.request('teacherData:get:questions', idExam, true);
            this.showView(new AddQuestion({questions: questions}));
        }

    },

    editQuestion: function () {

        const idExam = teacherDataChannel.request('teacherData:get:examId');
        const exam = teacherDataChannel.request('teacherData:get:examById', idExam);

        if (this.isExamIncomplete(exam)) {

            const Questions = teacherDataChannel.request('teacherData:get:questions', idExam, false);
            const idQuestion = teacherDataChannel.request('teacherData:get:questionId');
            const question = Questions.find((question) => question.get('number') == idQuestion);

            if (!question) {
                Backbone.history.navigate('page-not-found', {trigger: true});
                return false;
            }

            this.showView(new EditQuestion({questions: Questions, question: question}));
        }

    },

    editExamStatus: function () {

        const idExam = teacherDataChannel.request('teacherData:get:examId');
        const exam = teacherDataChannel.request('teacherData:get:examById', idExam);

        if (this.isExamIncomplete(exam)) {
            const questions = teacherDataChannel.request('teacherData:get:questions', idExam, false);
            this.showView(new EditExamState({model: exam, questions: questions}));
        }

    },

    isExamIncomplete: function (exam) {

        if (!exam) {
            Backbone.history.navigate('page-not-found', {trigger: true});
            return false;
        }

        if (exam.get('ready')) {
            Backbone.history.navigate('page-not-found', {trigger: true});
            return false;
        }

        return true;

    },

    isExamComplete: function (exam) {

        if (!exam) {
            Backbone.history.navigate('page-not-found', {trigger: true});
            return false;
        }

        if (!exam.get('ready')) {
            Backbone.history.navigate('page-not-found', {trigger: true});
            return false;
        }

        return true;

    },

    showView: function (view) {
        if (this.userIsTeacher()) {
            layoutChannel.trigger('menu:show', new NavigationMenu());
            layoutChannel.trigger('content:show', view);
        }
    },

    userIsTeacher: function () {
        
        const sessionType = sessionChannel.request('session:get:type');

        if (sessionType === sessionTypeEnum.teacher) {
            return true;
        }

        Backbone.history.navigate('access-denied', {trigger: true});

        return false;

    }

});