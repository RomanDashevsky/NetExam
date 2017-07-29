import Controller from '../controllers';

const controller = new Controller();

export default Mn.AppRouter.extend({

    controller,

    appRoutes: {
        'student/' : 'indexStudent',
        'student/exams' : 'onExams',
        'student/exams/:id/questions' : 'onExamQuestions',
        'student/exams/:id/solutions' : 'onExamSolutions',
        'student/solutions' : 'onSolutions',
        'student/solutions/:id' : 'onSolutionsId',
    }

});
