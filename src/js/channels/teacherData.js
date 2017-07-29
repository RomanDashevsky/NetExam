import {
    ExamsCollection,
    QuestionsCollection
} from '../modules/teacher/collection';
import Students from '../modules/teacher/models/Students';

const layoutChannel = Radio.channel('layout');

export default Mn.Object.extend({

    channelName: 'teacherData',

    radioRequests: {
        'teacherData:get:examId': 'getExamId',
        'teacherData:get:questionId': 'getQuestionId',
        'teacherData:get:exams': 'getExams',
        'teacherData:get:completeExams': 'getCompleteExams',
        'teacherData:get:incompleteExams': 'getIncompleteExams',
        'teacherData:get:examById': 'getExamById',
        'teacherData:get:questions': 'getQuestions',
        'teacherData:get:students': 'getStudents',
        'teacherData:question:delete': 'onQuestionDelete',
        'teacherData:question:add': 'onQuestionAdd',
        'teacherData:question:edit': 'onQuestionEdit',
        'teacherData:set:examState': 'onExamState'
    },

    radioEvents: {
        'teacherData:fetch': 'onFetch',
        'teacherData:exams:fetch': 'onExamFetch',
        'teacherData:students:fetch': 'onStudentsFetch',
        'teacherData:questions:fetch': 'onQuestionsFetch',
        'teacherData:questions:save': 'onQuestionsSave',
        'teacherData:reset': 'onReset'
    },

    initialize() {
        this.examsCollection = new ExamsCollection();
        this.questionsMap = new Map();
        this.students = null;
    },

    getExamId: function() {
        const pathParse = window.location.pathname.split('/');
        return pathParse[3];
    },

    getQuestionId: function() {
        const pathParse = window.location.pathname.split('/');
        return pathParse[5];
    },

    addQuestionsInMap: function(idExam) {
        this.questionsMap.set(idExam, new QuestionsCollection({
            idExam: idExam
        }));
    },

    getStudents: function (idExam) {
        this.students = new Students({idExam: idExam})
        return this.students;
    },

    onStudentsFetch: function (async = true) {
        this.onFetch(this.students, async, 'teacherDataStudentsLoader', this.completeStudents);
    },

    getQuestions: function(idExam, async = true) {

        let questions = this.questionsMap.get(idExam);

        if (!questions) {
            this.addQuestionsInMap(idExam);
            questions = this.questionsMap.get(idExam);
        }

        this.onFetch(questions, async, 'teacherDataQuestionsLoader', this.completeQuestions);

        return questions;

    },

    getExams: function() {
        return this.examsCollection;
    },

    getCompleteExams: function() {
        return this.examsCollection.filter((exam) => exam.get('ready'));
    },

    getIncompleteExams: function() {
        return this.examsCollection.filter((exam) => !exam.get('ready'));
    },

    getExamById: function(idExam) {

        let Exam = this.examsCollection.find((exam) => exam.get('id') == idExam);

        if (!Exam) {
            this.onExamFetchSync();
            Exam = this.examsCollection.find((exam) => exam.get('id') == idExam);
        }

        return Exam;

    },

    onExamFetch: function() {
        this.onFetch(this.examsCollection, true, 'teacherDataExamLoader', this.completeExams);
    },

    onExamFetchSync: function() {
        this.onFetch(this.examsCollection, false, 'teacherDataExamLoader', this.completeExams);
    },

    onQuestionsFetch: function(questions) {
        this.onFetch(questions, true, 'teacherDataQuestionsLoader', this.completeQuestions);
    },

    onQuestionsFetchSync: function(questions) {
        this.onFetch(questions, false, 'teacherDataQuestionsLoader', this.completeQuestions);
    },

    onQuestionsSave: function(questions, copyQuestions) {

        const self = this;
        let isSave = false;

        const onDoneSaveQuestions = function(model) {
            questions.reset(model.questions);
            layoutChannel.trigger('success:show', 'Вопросы сохранены');
            isSave = true;
        };

        const onFailSaveQuestions = function(model) {
            questions.reset(copyQuestions);
            self.onFail(model);
            isSave = false;
        };

        this.beforeSend('teacherDataQuestionsLoader');
        questions.sync('create', questions, {
            async: false,
            success: onDoneSaveQuestions,
            error: onFailSaveQuestions,
            complete: this.completeQuestions
        });

        return isSave;

    },

    onQuestionAdd: function(questions, model) {

        const copyQuestions = questions.slice();

        this.setNumberInModel(questions, model);
        questions.add(model);

        return this.onQuestionsSave(questions, copyQuestions);

    },

    setNumberInModel: function(questions, model) {
        if (!model.get('number')) {
            const nextNumber = this.getNextNumberOfModel(questions);
            model.set('number', nextNumber);
        }
    },

    getNextNumberOfModel: function(questions) {

        if (questions.length === 0) {
            return 0;
        }

        let maxNumber = questions.max((model) =>model.get('number')).get('number');

        return ++maxNumber;

    },

    onQuestionEdit: function(questions, model) {

        const copyQuestions = questions.slice();
        questions.add(model);

        return this.onQuestionsSave(questions, copyQuestions);

    },

    onQuestionDelete: function(questions, id) {

        const copyQuestions = questions.slice();
        questions.remove(id);

        return this.onQuestionsSave(questions, copyQuestions);

    },

    onExamState: function(exam) {

        const self = this;
        const url = '/api/exams/' + exam.attributes.id + '/state';
        let isSave = false;

        const onDoneSaveExamState = function(model) {
            exam.set('ready', model.ready);
            layoutChannel.trigger('success:show', 'Статус экзамена изменён');
            isSave = true;
        };

        const onFailSaveExamState = function(model) {
            self.onFail(model);
            isSave = false;
        };

        this.beforeSend('ExamState');
        exam.sync('update', exam, {
            url: url,
            async: false,
            success: onDoneSaveExamState,
            error: onFailSaveExamState,
            complete: this.completeExamState
        });

        return isSave;

    },

    onFetch: function(collection, async = true, loader = 'teacherData', complete = this.completeData) {
        this.beforeSend(loader);
        collection.fetch({
                async: async,
                complete: complete
            })
            .done()
            .fail(this.onFail);
    },

    onReset: function() {
        this.examsCollection.reset();
        this.questionsMap = new Map();
    },

    beforeSend: function(loader) {
        layoutChannel.trigger('loader:show', loader);
    },

    completeData: function() {
        layoutChannel.trigger('loader:hide', 'teacherData');
    },

    completeExams: function() {
        layoutChannel.trigger('loader:hide', 'teacherDataExamLoader');
    },

    completeExamState: function() {
        layoutChannel.trigger('loader:hide', 'ExamState');
    },

    completeQuestions: function() {
        layoutChannel.trigger('loader:hide', 'teacherDataQuestionsLoader');
    },

    completeStudents: function () {
        layoutChannel.trigger('loader:hide', 'teacherDataStudentsLoader');
    },

    onFail: function(model) {

        const response = model.responseJSON;

        if (_.isObject(response) && _.has(response, 'errors')) {
            layoutChannel.trigger('error:parse', response.errors);
        } else {
            layoutChannel.trigger('error:show', 'Error : ' + model.status + ' - ' + model.statusText);
        }

    }

});
