import {
    NavigationMenu,
    IndexPageView,
    ExamsView,
    ExamView,
    SolutionView,
    SolutionsView,
    IndexNavigation
} from '../views';
import SessionType from '../../_common/models/sessionType';

const sessionTypeEnum = new SessionType();
const layoutChannel = Radio.channel('layout');
const sessionChannel = Radio.channel('session');
const studentDataChannel = Radio.channel('studentData');

export default Mn.Object.extend({

    indexStudent: function () {
        this.showView(new IndexPageView({indexNavigation: new IndexNavigation()}));
    },

    onExams: function () {
        this.showView(new ExamsView());
    },

    onExamQuestions: function () {

        const idExam = studentDataChannel.request('studentData:get:examId');
        const exam = studentDataChannel.request('studentData:get:examById', idExam);
        const questions = studentDataChannel.request('studentData:get:questions', idExam, false);

        if (questions.length === 1) {
            Backbone.history.navigate('access-denied', {trigger: true});
            return false;
        }

        let currentExamData = studentDataChannel.request('studentData:get:currentExamData', idExam);

        if (!currentExamData) {
            currentExamData = studentDataChannel.request('studentData:get:rewriteCurrentExamData', idExam);
        }

        if (currentExamData.user !== sessionChannel.request('session:get:fullUserName')) {
            studentDataChannel.trigger('studentData:remove:currentExamData', idExam);
            currentExamData = studentDataChannel.request('studentData:get:rewriteCurrentExamData', idExam);
        }

        const solutions = studentDataChannel.request('studentData:create:solutions', idExam);

        this.showView(new ExamView({
            exam: exam,
            questions: questions,
            currentExamData: currentExamData,
            solutions: solutions
        }));

    },

    onExamSolutions: function () {

        const idExam = studentDataChannel.request('studentData:get:examId');
        const solutions = studentDataChannel.request('studentData:get:solutions', idExam);

        if (!solutions) {
            Backbone.history.navigate('access-denied', {trigger: true});
            return false;
        }

        this.showView(new SolutionView({solutions: solutions}));

    },

    onSolutions: function () {
        this.showView(new SolutionsView());
    },

    onSolutionsId: function () {

        const idExam = studentDataChannel.request('studentData:get:examId');
        studentDataChannel.trigger('studentData:examsSolutions:fetch', false);
        const examsSolutions = studentDataChannel.request('studentData:get:examsSolutions');
        const solutions = examsSolutions.get(idExam);

        if (!solutions) {
            Backbone.history.navigate('page-not-found', {trigger: true});
            return false;
        }

        this.showView(new SolutionView({solutions: solutions}));

    },

    showView: function (view) {
        if (this.userIsStudent()) {
            layoutChannel.trigger('menu:show', new NavigationMenu());
            layoutChannel.trigger('content:show', view);
        }
    },

    userIsStudent: function () {

        const sessionType = sessionChannel.request('session:get:type');

        if (sessionType === sessionTypeEnum.student) {
            return true;
        }

        Backbone.history.navigate('access-denied', {trigger: true});

        return false;

    }

});
