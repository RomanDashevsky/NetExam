import {
    ExamsCollection,
    ExamsSolutionsCollection,
    ExamsCurrentCollection,
    QuestionsCollection
} from '../modules/student/collection';
import {
    Timer,
    Solutions
} from '../modules/student/models';

const layoutChannel = Radio.channel('layout');
const sessionChannel = Radio.channel('session');

export default Mn.Object.extend({

    channelName: 'studentData',

    radioRequests: {
        'studentData:get:examId': 'getExamId',
        'studentData:get:exams': 'getExams',
        'studentData:get:examsSolutions': 'getExamsSolutions',
        'studentData:get:examsCurrent': 'getExamsCurrent',
        'studentData:get:examById': 'getExamById',
        'studentData:get:currentExamData': 'getCurrentExamData',
        'studentData:get:rewriteCurrentExamData': 'rewriteCurrentExamData',
        'studentData:get:questions': 'getQuestions',
        'studentData:create:solutions': 'createSolutions',
        'studentData:get:solutions': 'getSolutions',
        'studentData:get:timer': 'getTimer'
    },

    radioEvents: {
        'studentData:fetch': 'onFetch',
        'studentData:exams:fetch': 'onExamFetch',
        'studentData:examsSolutions:fetch': 'onExamsSolutionsFetch',
        'studentData:exams:current:fetch': 'onExamCurrentFetch',
        'studentData:set:currentExamData': 'setCurrentExamData',
        'studentData:remove:currentExamData': 'removeCurrentExamData',
        'studentData:save:solutions': 'saveSolutions',
        'studentData:reset': 'onReset'
    },

    initialize() {
        this.examsCollection = new ExamsCollection();
        this.examsCurrentCollection = new ExamsCurrentCollection();
        this.examsSolutionsCollection = new ExamsSolutionsCollection();
        this.timer = new Timer();
        this.solutionsMap = new Map();
    },

    getTimer: function () {
        return this.timer;
    },

    getExamId: function () {
        const pathParse = window.location.pathname.split('/');
        return pathParse[3];
    },

    getExams: function () {
        return this.examsCollection;
    },

    getExamsSolutions: function () {
        return this.examsSolutionsCollection;
    },

    createSolutions: function (idExam) {
        const solutions = new Solutions({idExam: idExam});
        this.solutionsMap.set(idExam, solutions);
        return solutions;
    },

    getSolutions: function (idExam) {
        return this.solutionsMap.get(idExam);
    },

    saveSolutions: function (idExam) {
        this.beforeSend('saveSolutions');
        this.solutionsMap.get(idExam).save({},{
            async: false,
            success: this.onDoneSaveSolutions,
            error: this.onFail,
            complete: this.completeSaveSolutions
        });
    },

    onDoneSaveSolutions: function () {
        layoutChannel.trigger('success:show', 'Ответы отправлены');
    },

    getExamsCurrent: function () {
        return this.examsCurrentCollection;
    },

    getCurrentExamData: function (idExam) {
        const localData = localStorage.getItem('currentExamData' + idExam);
        return localData === null ? null : JSON.parse(localData);
    },

    rewriteCurrentExamData: function (idExam) {
        this.setCurrentExamData(idExam);
        return this.getCurrentExamData(idExam);
    },

    setCurrentExamData: function (idExam) {
        const data = {beginTime: new Date(), user: sessionChannel.request('session:get:fullUserName')};
        localStorage.setItem('currentExamData' + idExam, JSON.stringify(data));
    },

    removeCurrentExamData: function (idExam) {
        localStorage.removeItem('currentExamData' + idExam);
    },

    onExamFetch: function (async = true) {
        this.onFetch(this.examsCollection, async, 'studentDataExamLoader', this.completeExams);
    },

    onExamsSolutionsFetch: function (async = true) {
        this.onFetch(this.examsSolutionsCollection, async, 'studentDataExamSolutionsLoader', this.completeExamsSolutions);
    },

    onExamCurrentFetch: function (async = true) {
        this.onFetch(this.examsCurrentCollection, async, 'studentDataExamCurrentLoader', this.completeExamsCurrent);
    },

    getExamById: function (idExam) {

        let Exam = this.examsCollection.find((exam) => exam.get('id') == idExam);

        if (!Exam) {
            this.onExamCurrentFetch(false);
            Exam = this.examsCurrentCollection.find((exam) => exam.get('id') == idExam);
        }

        if (!Exam) {
            this.onExamFetch(false);
            Exam = this.examsCollection.find((exam) => exam.get('id') == idExam);
        }

        return Exam;

    },

    getQuestions: function (idExam, async = true) {

        const questions = new QuestionsCollection({idExam: idExam});

        this.onFetch(questions, async, 'studentDataQuestionsLoader', this.completeQuestions);

        return questions;

    },

    onFetch: function (collection, async = true, loader = 'studentData', complete = this.completeData) {
        this.beforeSend(loader);
        collection.fetch({
            async: async,
            complete: complete
        })
            .done()
            .fail(this.onFail);
    },

    onReset: function () {
        this.examsCollection.reset();
    },

    beforeSend: function (loader) {
        layoutChannel.trigger('loader:show', loader);
    },

    completeData: function () {
        layoutChannel.trigger('loader:hide', 'studentData');
    },

    completeExams: function () {
        layoutChannel.trigger('loader:hide', 'studentDataExamLoader');
    },

    completeExamsSolutions: function () {
        layoutChannel.trigger('loader:hide', 'studentDataExamSolutionsLoader');
    },

    completeExamsCurrent: function () {
        layoutChannel.trigger('loader:hide', 'studentDataExamCurrentLoader');
    },

    completeQuestions: function () {
        layoutChannel.trigger('loader:hide', 'studentDataQuestionsLoader');
    },

    completeSaveSolutions: function () {
        layoutChannel.trigger('loader:hide', 'saveSolutions');
    },

    onFail: function (model) {

        const response = model.responseJSON;

        if (_.isObject(response) && _.has(response, 'errors')) {
            layoutChannel.trigger('error:parse', response.errors);
        } else {
            layoutChannel.trigger('error:show', 'Error : ' + model.status + ' - ' + model.statusText);
        }

    }

});
